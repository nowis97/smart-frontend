import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";


export default function (props) {
    let {state, dispatch} = React.useContext(PlantaContext);
    let preventiva = state.initialStateReparaciones.preventiva;

    const handleChanges = event => {
        let e = event.target;
        dispatch({type: 'HANDLE_PREVENTIVAS', payload: e});
    };
    //todo me falta despachar los cambios a los valores
    return (
        <Grid container>
            <Typography style={{
                backgroundColor: 'white',
                height: 'fit-content',
                transform: 'translateY(25px)',
                marginLeft: '30px'
            }} component="h1"
                        variant="body1" align="center">
                Preventiva
            </Typography>

            <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>
                {/*<Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"menor_11"} label={"Menor"} value={preventiva.menor_11}
                               onChange={handleChanges}/>
                </Grid>*/}
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_111"} label={"Banda Rodado"} value={preventiva.bandaRodado_111}
                               onChange={handleChanges}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_112"} label={"Banda Lateral"} value={preventiva.bandaLateral_112}
                               onChange={handleChanges}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_113"} label={"Hombro"} value={preventiva.hombro_113}
                               onChange={handleChanges}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}} md={3}>
                    <TextField id={"talon_116"} label={"Talon"} value={preventiva.talon_116}
                               onChange={handleChanges}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}} md={3}>
                    <TextField id={"butilo_118"} label={"Butilo"} value={preventiva.butilo_118}
                               onChange={handleChanges}/>
                </Grid>

            </Grid>

        </Grid>
    );
}