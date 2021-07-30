import {Tabs} from '@shopify/polaris';
import {useState} from 'react'

import Content from "@/components/content"


import Pageconfig from "@/pages/config"
import Pagerecogidas from "@/components/recogidas"
import Pagerelaciones from "@/components/relaciones"

const Index = ({api}) => {
    const [indexTab, setIndexTab] = useState(0)
    const tabs = [
        {
            id: 'config',
            content: "Configuraciones",
            page:(<Pageconfig api={api}/>)
        },
        {
            id: 'recogidas',
            content: "Recogidas",
            page:(<Pagerecogidas/>)
        },
        {
            id: 'relaciones',
            content: "Relaciones",
            page:(<Pagerelaciones/>)
        },
    ]
    return (
        <Tabs 
        tabs={tabs} 
        selected={indexTab} 
        onSelect={setIndexTab}>
            <div className="height-top"></div>
            <Content>
                {tabs[indexTab].page}
            </Content>
        </Tabs>
    )
}
export default Index