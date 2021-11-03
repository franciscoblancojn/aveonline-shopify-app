import {
  Button,
  Stack,
  Card,
  FormLayout,
  Layout,
  TextField
} from '@shopify/polaris'

const InputFormLoadSelect = (props) => {
  const {
    id,
    name,
    title,
    description,
    value,
    type,
    btn,
    load
  } = props
  return (
    <Layout.AnnotatedSection
      title={title}
      description={description}
    >
      <Card sectioned>
        <FormLayout>
          <div className='loadSelect'>
            <div className='contentFieldBtn'>
              <div className='contentField'>
                <TextField
                  id={id}
                  name={name}
                  value={value}
                  disabled
                  type={type}
                />
              </div>
              <div className='contentBtn'>
                <Stack distribution='trailing'>
                  <Button
                    primary
                    onClick={load}
                    submit={false}
                  >
                    {btn}
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  )
}

export default InputFormLoadSelect
