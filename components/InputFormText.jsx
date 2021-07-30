import {
    Card,
    FormLayout,
    Layout,
    TextField,
} from '@shopify/polaris';

const InputFormText = (props) => {
    const {
        id,
        name,
        title,
        description,
        value,
        onChange,
        label,
        type,
    } = props;
    return (
        <Layout.AnnotatedSection
            title={title}
            description={description}
        >
            <Card sectioned>
                <FormLayout>
                    <TextField
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        label={label}
                        type={type}
                    />
                </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
    )
}

export default InputFormText;
