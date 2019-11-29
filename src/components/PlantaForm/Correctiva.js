import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";

export default function (props) {
    const {state,dispatch} = React.useContext(PlantaContext);

    const reparacionCorrectiva = state.initialStateReparaciones.reparacionCorrectiva;

    const handleChanges = event =>{
        let e = event.target;
        dispatch({type:'HANDLE_CORRECTIVA', payload:e});
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
                Correctiva
            </Typography>
            <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>

                {/*<Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"convencional_12"} label={"Convencional"} onChange={handleChanges} value={reparacionCorrectiva.convencional_12}
                    />
                </Grid>*/}
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_121"} label={"Banda de Rodado" } onChange={handleChanges} value={reparacionCorrectiva.bandaRodado_121}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_122"} label={"Banda Lateral"} onChange={handleChanges} value={reparacionCorrectiva.bandaLateral_122}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_123"} label={"Hombro"} onChange={handleChanges} value={reparacionCorrectiva.hombro_123}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"talon_126"} label={"Talon"} onChange={handleChanges} value={reparacionCorrectiva.talon_126
                    }
                    />
                </Grid>
            </Grid>

        </Grid>
    );
}