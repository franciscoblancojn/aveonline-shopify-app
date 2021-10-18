import {
  Card,
  FormLayout,
  Layout,
  Select
} from '@shopify/polaris'

const InputFormSelect = (props) => {
  const {
    id,
    name,
    title,
    description,
    value,
    onChange,
    label,
    type,
    options
  } = props
  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
      <Card sectioned>
        <FormLayout>
          <Select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            type={type}
            options={options}
          />
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  )
}

export default InputFormSelect
