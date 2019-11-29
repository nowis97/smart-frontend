import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";


export default function (props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    let kalUltra = state.initialStateReparaciones.reparacionKalUltra;
    const handleChanges = event => {
        let e = event.target;
        dispatch({type: 'HANDLE_KALULTRA', payload: e});
    };
    return (
        <Grid container>
            <Typography style={{
                backgroundColor: 'white',
                height: 'fit-content',
                transform: 'translateY(25px)',
                marginLeft: '30px'
            }} component="h1"
                        variant="body1" align="center">
                Kal Ultra
            </Typography>
            <Grid container item item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>
                {/*<Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"reparacion_13"} label={"Reparacion"} value={kalUltra.reparacion_13}
                               onChange={handleChanges}/>
                </Grid>*/}
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_131"} label={"Banda de Rodado"} onChange={handleChanges} value={kalUltra.bandaRodado_131}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_132"} label={"Banda Lateral"} value={kalUltra.bandaLateral_132}
                               onChange={handleChanges}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_133"} label={"Hombro"} value={kalUltra.hombro_133}
                               onChange={handleChanges}/>
                </Grid>
            </Grid>
        </Grid>
    );

}