import {
	Button,
    Card,
    FormLayout,
    Layout,
    TextField,
    DisplayText,
    Heading,
} from '@shopify/polaris';

const InputFormPackage = (props) => {
    const {
        id,
        name,
        title,
        description,
        packages,
        onChange,
        label,
    } = props;

    const deletePackage = (key) => {
        var paquetes = state.package
        paquetes.splice(key, 1);
        savePackage(paquetes)
    }
    const addPackage = () => {
        var paquetes = state.package
        paquetes.push({
            Length:"1",
            Width:1,
            Height:1,
        })
        savePackage(paquetes)
    }
    const savePackage = (paquetes) =>{
        onChange(paquetes)
    }
    const changeItem = (value,key,ele) => {
        var paquetes = state.package
        paquetes[key][ele] = value
        savePackage(paquetes)
    }
    return (
        <Layout.AnnotatedSection
            title={title}
            description={description}
        >
            <Card sectioned>
                <FormLayout>
                    <FormLayout.Group condensed>
                        <Heading>{label}</Heading>
                        <DisplayText size="small"></DisplayText>
                        <DisplayText size="small"></DisplayText>
                        <Button 
                        primary
                        onClick={addPackage}
                        submit={false}
                        >
                            Agregar
                        </Button>
                    </FormLayout.Group>
                    {
                    packages.length > 0 ?
                        <FormLayout.Group condensed>
                            <DisplayText size="small">Length</DisplayText>
                            <DisplayText size="small">Width</DisplayText>
                            <DisplayText size="small">Height</DisplayText>
                            <DisplayText size="small"></DisplayText>
                        </FormLayout.Group>
                    :
                        packages.map((item , key) =>{
                            return(
                                <FormLayout.Group condensed key={key}>
                                    <TextField
                                        id={`Length_${key}`}
                                        name={`Length_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Length"
                                        value={item.Length}
                                        onChange={(e)=>{changeItem(e,key,'Length')}}
                                        suffix="cm"
                                    />
                                    <TextField
                                        id={`Width_${key}`}
                                        name={`Width_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Width"
                                        value={item.Width}
                                        onChange={(e)=>{changeItem(e,key,'Width')}}
                                        suffix="cm"
                                    />
                                    <TextField
                                        id={`Height_${key}`}
                                        name={`Height_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Height"
                                        value={item.Height}
                                        onChange={(e)=>{changeItem(e,key,'Height')}}
                                        suffix="cm"
                                    />
                                    <Button 
                                    destructive
                                    onClick={()=>{deletePackage(key)}}
                                    submit={false}
                                    >
                                        Eliminar
                                    </Button>
                                </FormLayout.Group>
                            )
                    })}
                </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
    );
}

export default InputFormPackage;
