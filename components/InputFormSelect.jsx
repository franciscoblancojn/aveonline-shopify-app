import {
    Card,
    FormLayout,
    Layout,
    Select,
} from '@shopify/polaris';

class InputFormSelect extends React.Component {
    render() {
        return (
            <Layout.AnnotatedSection
                title={this.props.title}
                description={this.props.description}
            >
                <Card sectioned>
                    <FormLayout>
                        <Select
                            id={this.props.id}
                            name={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            label={this.props.label}
                            type={this.props.type}
                            options={this.props.options}
                        />
                    </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
        );
    }
}

export default InputFormSelect;
