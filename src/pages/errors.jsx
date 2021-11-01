import { Tabs } from "@shopify/polaris";
import { useState } from "react";

import Content from "@/components/content";

import PageErrorCotizar from "@/pages/errorCotizar";

const Index = ({ api, controllerModal, shop }) => {
    const [indexTab, setIndexTab] = useState(0);
    const tabs = [
        {
            id: "errorsCotizar",
            content: "Cotizaciones",
            page: (
                <PageErrorCotizar
                    api={api}
                    modal={controllerModal}
                    shop={shop}
                />
            ),
        },
    ];
    return (
        <div id="taberrors">
            <Tabs tabs={tabs} selected={indexTab} onSelect={setIndexTab}>
                <div className="height-top" />
                <Content>{tabs[indexTab].page}</Content>
            </Tabs>
            <style jsx global>
                {`
                    #taberrors .Polaris-Tabs {
                        top: inherit;
                    }
                `}
            </style>
        </div>
    );
};
export default Index;
