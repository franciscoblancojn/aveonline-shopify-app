import {
	Button,
    Card,
    FormLayout,
    Layout,
    TextField,
    DisplayText,
    Heading,
} from '@shopify/polaris';

class InputFormPackage extends React.Component {
    constructor(props) {
        super(props);
        // No llames this.setState() aquí!
        this.state = {
            package : props.value
        };
    }
    render() {
        return (
            <Layout.AnnotatedSection
                title={this.props.title}
                description={this.props.description}
            >
                <Card sectioned>
                    <FormLayout>
                        <FormLayout.Group condensed>
                            <Heading>{this.props.label}</Heading>
                            <DisplayText size="small"></DisplayText>
                            <DisplayText size="small"></DisplayText>
                            <Button 
                            primary
                            onClick={this.addPackage}
                            submit={false}
                            >
                                Agregar
                            </Button>
                        </FormLayout.Group>
                        {(this.props.value.length>0)?
                        (<FormLayout.Group condensed>
                            <DisplayText size="small">Length</DisplayText>
                            <DisplayText size="small">Width</DisplayText>
                            <DisplayText size="small">Height</DisplayText>
                            <DisplayText size="small"></DisplayText>
                        </FormLayout.Group>):""}
                        {this.props.value.map((item , key) =>{
                            return(
                                <FormLayout.Group condensed key={key}>
                                    <TextField
                                        id={`Length_${key}`}
                                        name={`Length_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Length"
                                        value={item.Length}
                                        onChange={(e)=>{this.changeItem(e,key,'Length')}}
                                        suffix="cm"
                                    />
                                    <TextField
                                        id={`Width_${key}`}
                                        name={`Width_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Width"
                                        value={item.Width}
                                        onChange={(e)=>{this.changeItem(e,key,'Width')}}
                                        suffix="cm"
                                    />
                                    <TextField
                                        id={`Height_${key}`}
                                        name={`Height_${key}`}
                                        type="number"
                                        min="1"
                                        placeholder="Height"
                                        value={item.Height}
                                        onChange={(e)=>{this.changeItem(e,key,'Height')}}
                                        suffix="cm"
                                    />
                                    <Button 
                                    destructive
                                    onClick={()=>{this.deletePackage(key)}}
                                    submit={false}
                                    >
                                        Eliminar
                                    </Button>
                                </FormLayout.Group>
                            )
                        })}
                    </FormLayout>
                </Card>
                <style jsx>
                    {`
                    .item{
                        display:flex;
                    }
                    `}
                </style>
            </Layout.AnnotatedSection>
        );
    }
    deletePackage = (key) => {
        var paquetes = this.state.package
        paquetes.splice(key, 1);
        this.savePackage(paquetes)
    }
    addPackage = () => {
        var paquetes = this.state.package
        paquetes.push({
            Length:1,
            Width:1,
            Height:1,
        })
        this.savePackage(paquetes)
    }
    savePackage = (paquetes) =>{
        this.props.changePackage(paquetes)
    }
    changeItem = (value,key,ele) => {
        var paquetes = this.state.package
        paquetes[key][ele] = value
        this.savePackage(paquetes)
    }
}

export default InputFormPackage;
