import resources from "../../services/resources";
import React, {useEffect} from "react";
import update from 'immutability-helper';





export const ResourceContext = React.createContext({});

function assignAttribute(field, attribute,fnState) {
    let temp = update(this.state.fields, {
        [field]: {$set: attribute}
    });

    fnState({
        fields: temp
    });
}

export default function ResourceProvider(props) {

    const [value,setValue] = React.useState({});

    useEffect(()=>{
        getResources();
    },[]);

    const getResources = () =>{

        resources.obtenerTipoMinas().then(
            response =>{
                setValue(prevState => ({...prevState,['tipoMinas']:response}))

            }
        );


        resources.obtenerRegiones().then(
            response => {
                setValue(prevState => ({ ...prevState,['regiones']:response}))
            }

        );

        resources.obtenerCodigos()
            .then(response =>
                setValue(prevState => ({...prevState,['codigosBajas']:response}))
            );

        resources.obtenerPlantas().then(
            response => setValue(prevState => ({...prevState,['plantas']:response}))
        );

        resources.obtenerCondicionFinal().then(
            response => setValue(prevState => ({...prevState,['condicionFinal']:response}))
        );


    };

    return (
        <ResourceContext.Provider children={props.children}  value={value}/>
    )
}

