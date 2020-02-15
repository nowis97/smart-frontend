import React from "react";
import {Checkbox, Container, FormControlLabel, Switch} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Preventiva from "./Preventiva";
import Correctiva from "./Correctiva";
import KalUltra from "./KalUltra";

import {PlantaContext} from "./Planta";

export default function () {
    // const [tipoReparacion,setTipoReparacion] = React.useState({
    //     preventiva:false,
    //     correctiva:false,
    //     kalUltra:false
    // });

    const {state,dispatch} = React.useContext(PlantaContext);

    const tipoReparacion = state.initialStateForms;





    const handleChange = value => (event) => {
        let e = event.target;
        dispatch({type:'HANDLE_FORM_STATUS',payload:{value,e}})
    };

    return (

        <React.Fragment>
            <Container>

                <Grid container direction={"row"} justify={"center"} style={{padding:'10px',border:'1px rgba(0,0,0,0.1) inset',margin:'10px'}} >

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Switch checked={tipoReparacion.preventiva || false} onChange={handleChange('preventiva')}/>
                        }
                                          label={
                                              "Preventiva"
                                          }
                                          value={tipoReparacion.preventiva}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Switch checked={tipoReparacion.correctiva || false} onChange={handleChange('correctiva')}/>
                        }
                                          label={
                                              "Correctiva"
                                          }
                                          value={tipoReparacion.correctiva}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel control={
                            <Switch checked={tipoReparacion.kalUltra || false} onChange={handleChange('kalUltra')} />
                        }
                                          label={
                                              "Kal Ultra"
                                          }
                                          value={tipoReparacion.kalUltra}
                        />
                    </Grid>

                    {tipoReparacion.preventiva? <Preventiva/>:null}
                    {tipoReparacion.correctiva? <Correctiva/>:null}
                    {tipoReparacion.kalUltra? <KalUltra/>:null}

                </Grid>
            </Container>
        </React.Fragment>
    );
}