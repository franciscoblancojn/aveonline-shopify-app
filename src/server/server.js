import "@babel/polyfill";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import csp from "koa-csp";
import next from "next";
import Router from "koa-router";
var cors = require("koa2-cors");

const fetch = require("node-fetch");
const env = require("./env");

const port = parseInt(env.PORT, 10) || 8081;
const dev = env.NODE_ENV !== "production";
const app = next({
    dev,
});

const handle = app.getRequestHandler();

Shopify.Context.initialize({
    API_KEY: env.SHOPIFY_API_KEY,
    API_SECRET_KEY: env.SHOPIFY_API_SECRET,
    SCOPES: env.SCOPES.split(","),
    HOST_NAME: env.HOST.replace(/https:\/\//, ""),
    API_VERSION: ApiVersion.October20,
    IS_EMBEDDED_APP: true,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.keys = [Shopify.Context.API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            // accessMode: "online",
            async afterAuth(ctx) {
                // Access token and shop available in ctx.state.shopify
                const { shop, accessToken, scope } = ctx.state.shopify;
                const host = ctx.query.host;
                ACTIVE_SHOPIFY_SHOPS[shop] = scope;
                // ctx.cookies.set("shopOrigin", shop, {
                //     httpOnly: false,
                //     secure: true,
                //     sameSite: "none",
                // });
                const body = {
                    token: accessToken,
                };

                const j = await fetch(`${env.URLAPI}/tokens?shop=${shop}`, {
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        apikey: env.APIKEY,
                    },
                    method: "POST",
                });
                const r = await j.json();
                console.log("saveToken", r);

                const response = await Shopify.Webhooks.Registry.register({
                    shop,
                    accessToken,
                    path: `/webhooks?token=${accessToken}`,
                    topic: "APP_UNINSTALLED",
                    webhookHandler: async (topic, shop, body) =>
                        delete ACTIVE_SHOPIFY_SHOPS[shop],
                });

                if (!response.success) {
                    console.log(
                        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
                    );
                }
                // Redirect to app with shop parameter upon auth
                ctx.redirect(`/?shop=${shop}&host=${host}`);
            },
        })
    );

    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.post("/webhooks", async (ctx) => {
        try {
            const url = ctx.req.url;
            const token = url.split("token=")[1];
            const j = await fetch(`${env.URLAPI}/shop?token=${token}`, {
                headers: {
                    "Content-Type": "application/json",
                    apikey: env.APIKEY,
                },
                method: "DELETE",
            });
            const r = await j.json();
            console.log("deleteShop", r);

            await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
            console.log("Webhook processed, returned status code 200");
        } catch (error) {
            console.log(`Failed to process webhook: ${error}`);
        }
    });

    router.post(
        "/graphql",
        verifyRequest({ returnHeader: true }),
        async (ctx, next) => {
            await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
        }
    );
    router.get("(/_next/static/.*)", handleRequest); // Static content is clear
    router.get("(.*)", async (ctx) => {
        const shop = ctx.query.shop;

        // This shop hasn't been seen yet, go through OAuth to create a session
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
            ctx.redirect(`/auth?shop=${shop}`);
        } else {
            await handleRequest(ctx);
        }
    });

    server.use(cors({ origin: "*" }));
    // server.use((req, res, next) => {
    //   res.header('Content-Security-Policy', "frame-ancestors 'none'")
    //   next()
    // });

    server.use(
        csp({
            policy: {
                "frame-ancestors": ["*"],
            },
        })
    );
    server.use(router.allowedMethods());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
