import {
    Layout,
    SettingToggle,
    TextStyle,
} from '@shopify/polaris';

class InputFormCheckbox extends React.Component {
    render() {
        const contentStatus = this.props.enabled ? 'Enable' : 'Disable';
        const textStatus = this.props.enabled ? 'Activo' : 'Inactivo';

        return (
            <Layout.AnnotatedSection
                title={this.props.title}
                description={this.props.description}
            >
                <SettingToggle
                    id={this.props.id}
                    name={this.props.name}
                    action={{
                        content: contentStatus,
                        onAction: this.props.onAction,
                    }}
                    enabled={!this.props.enabled}
                >
                    {this.props.label}
                    <TextStyle variation="strong">{textStatus}</TextStyle>.
              </SettingToggle>
            </Layout.AnnotatedSection>
        );
    }
}

export default InputFormCheckbox;