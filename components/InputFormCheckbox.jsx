import {
    Layout,
    SettingToggle,
    TextStyle,
} from '@shopify/polaris';

const InputFormCheckbox = (props) => {
    const {
        id,
        name,
        title,
        description,
        label,
        onChange,
        enabled,
    } = props

    const contentStatus = enabled ? 'Enable' : 'Disable';
    const textStatus = enabled ? 'Activo' : 'Inactivo';
    
    return (
        <Layout.AnnotatedSection
            title={title}
            description={description}
        >
            <SettingToggle
                id={id}
                name={name}
                action={{
                    content: contentStatus,
                    onAction: ()=>{
                        onChange(!enabled)
                    },
                }}
                enabled={!enabled}
            >
                {label}
                <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
        </Layout.AnnotatedSection>
    );
}

export default InputFormCheckbox;