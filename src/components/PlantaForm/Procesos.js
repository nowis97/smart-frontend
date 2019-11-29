import React from "react";
import {Checkbox, Container, FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TipoReparacion from "./TipoReparacion";
import {PlantaContext} from "./Planta";
import Renovado from "./Renovado";


export default function (props) {

    let {dispatch, state} = React.useContext(PlantaContext);

    const [tipoProceso, setTipoProceso] = React.useState({
        reparacion: false,
        renovado: false,
    });

    const handleGarantia = name => event => {
        let e = event.currentTarget;
        dispatch({type: 'HANDLE_PROCESOS_GARANTIA', payload: {name, e}})
    };
    const selectTipoProceso = () => {
        if (tipoProceso.reparacion) {
            return <TipoReparacion/>;
        } else if (tipoProceso.renovado) {
            return <Renovado/>;
        } else return null;
    };

    const handleChange = name => e => {
        setTipoProceso({...setTipoProceso, [name]: e.target.checked});
    };


    return (
        <React.Fragment>
            <Container>
                <Grid container direction={"row"} justify={"center"}>

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Switch checked={tipoProceso.reparacion || false}  onChange={handleChange('reparacion')}/>
                        }
                                          label={
                                              "Reparaciones"
                                          }
                                          value={tipoProceso.reparacion}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Switch checked={tipoProceso.renovado || false}  onChange={handleChange('renovado')}/>
                        }
                                          label={
                                              "Renovados"
                                          }
                                          value={tipoProceso.renovado}
                        />
                    </Grid>
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


                    {selectTipoProceso()}


                </Grid>
            </Container>
        </React.Fragment>
    );

}