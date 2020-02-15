import React from "react";
import {Checkbox, Container, FormControlLabel, FormGroup, RadioGroup, Switch} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TipoReparacion from "./TipoReparacion";
import {PlantaContext} from "./Planta";
import Renovado from "./Renovado";
import Radio from "@material-ui/core/Radio";


export default function (props) {

    let {dispatch, state} = React.useContext(PlantaContext);

    let tipoProceso = state.initialStateForms;


    const handleGarantia = name => event => {
        let e = event.currentTarget;
        dispatch({type: 'HANDLE_PROCESOS_GARANTIA', payload: {name, e}})
    };
    const selectTipoProceso = () => {
        if (tipoProceso.reparacion) {

            return <TipoReparacion/>;
        } else if (tipoProceso.renovado) {
            return <Renovado/>;
        } else {

            return null;
        }
    };

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
                                          checked={tipoProceso.reparacion || false}

                        />


                        <FormControlLabel control={
                            <Radio />
                        }
                                          label={
                                              "Renovado"
                                          }
                                          value={'renovado'}
                                          checked={tipoProceso.renovado || false}
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