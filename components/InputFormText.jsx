import {
    Card,
    FormLayout,
    Layout,
    TextField,
} from '@shopify/polaris';

class InputFormText extends React.Component {
    render() {
        return (
            <Layout.AnnotatedSection
                title={this.props.title}
                description={this.props.description}
            >
                <Card sectioned>
                    <FormLayout>
                        <TextField
                            id={this.props.id}
                            name={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            label={this.props.label}
                            type={this.props.type}
                        />
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        );
    }
}

export default InputFormText;
