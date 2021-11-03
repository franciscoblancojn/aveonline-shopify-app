import { Spinner } from '@shopify/polaris'

const Index = ({ data = {}, id = '', className = '' }) => {
  return (
    <div id={id} className={`loader ${className}`} {...data}>
      <Spinner
        accessibilityLabel='Loading form field'
        hasFocusableParent={false}
      />
    </div>
  )
}
export default Index
