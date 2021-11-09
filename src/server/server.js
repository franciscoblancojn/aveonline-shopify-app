import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
var cors = require('koa2-cors');

const fetch = require("node-fetch");

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
});

const handle = app.getRequestHandler();

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: process.env.SCOPES.split(","),
    HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
    API_VERSION: ApiVersion.October20,
    IS_EMBEDDED_APP: true,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};



const logf = async (json) => {
    return;
    const response = await fetch("https://8efe-181-33-226-20.ngrok.io/",  {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json),
        redirect: 'follow'
    })
    const result = await response.json()
    return result
}

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.keys = [Shopify.Context.API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            accessMode: 'online',
            async afterAuth(ctx) {
                // Access token and shop available in ctx.state.shopify
                const { shop, accessToken, scope } = ctx.state.shopify;
                const host = ctx.query.host;
                ACTIVE_SHOPIFY_SHOPS[shop] = scope;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                 });
                const body = {
                    token: accessToken,
                };

                await logf({
                    msj:"after j"
                })
                const j = await fetch(`${process.env.URLAPI}/tokens?shop=${shop}`, {
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        apikey: process.env.APIKEY,
                    },
                    method: "POST",
                });
                const r = await j.json()
                await logf({
                    r,
                    msj:"after r"
                })
                console.log("saveToken",r);

                const response = await Shopify.Webhooks.Registry.register({
                    shop,
                    accessToken,
                    path: `/webhooks?token=${accessToken}`,
                    topic: "APP_UNINSTALLED",
                    webhookHandler: async (topic, shop, body) =>
                        delete ACTIVE_SHOPIFY_SHOPS[shop],
                });

                await logf({
                    response,
                    msj:"after response"
                })
                if (!response.success) {
                    console.log(
                        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
                    );
                }
                await logf({
                    url:`/?shop=${shop}&host=${host}`,
                    msj:"after saveToken"
                })
                // Redirect to app with shop parameter upon auth
                ctx.redirect(`/?shop=${shop}&host=${host}`);
            },
        })
    );

    const handleRequest = async (ctx) => {
        await logf({
            msj:"in handleRequest",
            dev
        })
        await handle(ctx.req, ctx.res);
        await logf({
            msj:"in handle",
            dev
        })
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.post("/webhooks", async (ctx) => {
        try {
            const url = ctx.req.url
            const token = url.split("token=")[1]
            const j = await fetch(`${process.env.URLAPI}/shop?token=${token}`, {
                headers: {
                    "Content-Type": "application/json",
                    apikey: process.env.APIKEY,
                },
                method: "DELETE",
            });
            const r = await j.json()
            console.log("deleteShop",r);


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
    router.get("/", async (ctx) => {
        const shop = ctx.query.shop;
        // This shop hasn't been seen yet, go through OAuth to create a session
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
          ctx.redirect(`/auth?shop=${shop}`);
        } else {
          await handleRequest(ctx);
        }
      });
    router.get("(/_next/static/.*)", handleRequest); // Static content is clear
    router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
    router.get("(.*)", verifyRequest(), handleRequest);
    
    // router.get("(.*)", async (ctx) => {
    //     const shop = (() => {
    //         const { shop } = ctx.query
    //         if (!shop) return undefined
    //         if (typeof shop === 'string') return shop
    //         return shop[0]
    //     })();
    
    //     // This shop hasn't been seen yet, go through OAuth to create a session
    //     if (!shop || ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
    //         console.log(`rediret to /auth?shop=${shop}`);
    //       ctx.redirect(`/auth?shop=${shop}`);
    //     } else {
    //       await handleRequest(ctx);
    //     }
    //     return;

    //     // const shop = ctx.query.shop;

    //     // await logf({
    //     //     url:`(.*)`,
    //     //     msj:"before ACTIVE_SHOPIFY_SHOPS",
    //     //     ACTIVE_SHOPIFY_SHOPS,
    //     //     shop,
    //     //     dev
    //     // })
    //     // // This shop hasn't been seen yet, go through OAuth to create a session
    //     // if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined && shop) {
    //     //     console.log(`rediret to /auth?shop=${shop}`);
    //     //     ctx.redirect(`/auth?shop=${shop}`);
    //     // } else {
    //     //     console.log("handleRequest");
    //     //     await handleRequest(ctx);
    //     // }
    // });
  server.use(cors({origin: '*'}));
    server.use(router.allowedMethods());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
