import { Tabs, Modal, TextContainer } from '@shopify/polaris'
import { useState } from 'react'

import Content from '@/components/content'

import Pageconfig from '@/pages/config'
import Pageproducts from '@/pages/products'
import Pagerecogidas from '@/components/recogidas'
import Pagerelaciones from '@/components/relaciones'
import PageErrorCotizar from '@/pages/errorCotizar'

const Index = ({ api , shop}) => {
  const [indexTab, setIndexTab] = useState(0)
  const [configModal, setConfigModal] = useState({
    open: false,
    title: '',
    text: ''
  })
  const openModal = ({ title, text }) => {
    setConfigModal({ open: true, title, text })
  }
  const closeModal = () => setConfigModal({ ...configModal, open: false })
  const controllerModal = {
    openModal,
    closeModal
  }
  const tabs = [
    {
      id: 'config',
      content: 'Configuraciones',
      page: (<Pageconfig api={api} modal={controllerModal} />)
    },
    {
      id: 'products',
      content: 'Productos',
      page: (<Pageproducts api={api} modal={controllerModal} shop={shop}/>)
    },
    {
      id: 'recogidas',
      content: 'Recogidas',
      page: (<Pagerecogidas modal={controllerModal} />)
    },
    {
      id: 'relaciones',
      content: 'Relaciones',
      page: (<Pagerelaciones modal={controllerModal} />)
    },
    {
      id: 'errorsCotizar',
      content: 'Errores de Cotizacion',
      page: (<PageErrorCotizar api={api} modal={controllerModal} shop={shop}/>)
    },
  ]
  return (
    <Tabs
      tabs={tabs}
      selected={indexTab}
      onSelect={setIndexTab}
    >
      <Modal
        open={configModal.open}
        onClose={closeModal}
        title={configModal.title}
        primaryAction={{
          content: 'Ok',
          onAction: closeModal
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              {configModal.text}
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
      <div className='height-top' />
      <Content>
        {tabs[indexTab].page}
      </Content>
    </Tabs>
  )
}
export default Index
