import {
	Button,
	Stack,
    Card,
    FormLayout,
    Layout,
    TextField,
} from '@shopify/polaris';

class InputFormLoadSelect extends React.Component {
    render() {
        return (
            <Layout.AnnotatedSection
                title={this.props.title}
                description={this.props.description}
            >
                <Card sectioned>
                    <FormLayout>
                        <div className="contentFieldBtn">
                            <div className="contentField">
                                <TextField
                                    id={this.props.id}
                                    name={this.props.name}
                                    value={this.props.value}
                                    disabled
                                    type={this.props.type}
                                />
                            </div>
                            <div className="contentBtn">
                                <Stack distribution="trailing">
                                    <Button 
                                    primary
                                    onClick={this.props.load}
                                    submit={false}
                                    >
                                        {this.props.btn}
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </FormLayout>
                </Card>
                <style jsx>
                    {`
                    .contentFieldBtn{
                        display:flex;
                    }
                    .contentField{
                        width:100%;
                    }
                    .contentBtn{
                        min-width: 130px;
                    }
                    `}
                </style>
            </Layout.AnnotatedSection>
        );
    }
}

export default InputFormLoadSelect;
