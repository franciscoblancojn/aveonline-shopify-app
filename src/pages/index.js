import { useState, useEffect } from "react";
import getConfig from "next/config";

import Api from "@/api/api";

import Loader from "@/components/loader";
import Error from "@/components/error";
import Page from "@/components/page";

const Index = ({ query }) => {
    const [page, setPage] = useState(<Loader />);
    const load = async () => {
        const { publicRuntimeConfig } = getConfig();
        const { key, URLAPI, URLAVEONLINE } = publicRuntimeConfig;
        const { shop } = query;
        if (shop && key) {
            const api = await Api({ shop, key, URLAPI, URLAVEONLINE });
            if (api.type === "error") {
                setPage(
                    <Error>
                        <p>Ocurrio un error, contactece con un desarrollador</p>
                    </Error>
                );
            } else {
                setPage(<Page api={api} />);
            }
        }
    };
    useEffect(() => {
        console.log("init load");
        load();
    }, []);
    return <>{page}</>;
};
export async function getServerSideProps(context) {
    const { query } = context;
    return {
        props: { query },
    };
}
export default Index;
