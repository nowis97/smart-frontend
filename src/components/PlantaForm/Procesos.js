import React, {useEffect} from "react";
import {Checkbox, Container, FormControlLabel, FormGroup, RadioGroup, Switch} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TipoReparacion from "./TipoReparacion";
import {PlantaContext} from "./Planta";
import Renovado from "./Renovado";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";


export default function (props) {

    let {dispatch, state} = React.useContext(PlantaContext);

    let tipoProceso = state.initialStateForms;


    const handleGarantia = name => event => {
        let e = event.currentTarget;
        dispatch({type: 'HANDLE_PROCESOS_GARANTIA', payload: {name, e}})
    };
    const selectTipoProceso = () => {
        if (tipoProceso.reparacion || state.initialStatePlanta.condicionFinal ===2) {

            return <TipoReparacion/>;
        } else if (tipoProceso.renovado || state.initialStatePlanta.condicionFinal ===1) {
            return <Renovado/>;
        } else {

            return null;
        }
    };

    useEffect(()=>{
        dispatch({type: 'HANDLE_FORM_STATUS',payload: {value:'reparacion',e:{checked:state.initialStatePlanta.condicionFinal ===2}}});
        dispatch({type: 'HANDLE_FORM_STATUS',payload: {value:'renovado',e:{checked:state.initialStatePlanta.condicionFinal ===1}}});

    },[]);

    const handleChange = (event,value) => {
        event.preventDefault();
        let e = event.currentTarget;
        dispatch({type: 'HANDLE_FORM_STATUS',payload: {value,e}});
    };


    return (
        <React.Fragment>
            <Container>
                <Grid container direction={"row"} justify={"center"} spacing={2} style={{transform:'translateX(15px)'}}>
                    <RadioGroup row onChange={handleChange}>
                        <FormControlLabel control={
                            <Radio />

                        }
                                          label={
                                              "Reparacion"
                                          }
                                          value={'reparacion'}
                                          checked={state.initialStatePlanta.condicionFinal ===2 || false}
                                          disabled

                        />


                        <FormControlLabel control={
                            <Radio />
                        }
                                          label={
                                              "Renovado"
                                          }
                                          value={'renovado'}
                                          checked={state.initialStatePlanta.condicionFinal ===1 || false}
                                          disabled
                        />

                    </RadioGroup>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Checkbox checked={state.initialStateReparaciones.garantia || false}
                                      onChange={handleGarantia('garantia')}/>
                        }
                                          label={
                                              "Garantia"
                                          }

                                          value={state.initialStateReparaciones.garantia}
                        />
                    </Grid>

                </Grid>

                    {selectTipoProceso()}



            </Container>
        </React.Fragment>
    );

}