import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";
import useYup from "@usereact/use-yup/lib";
import {validationSchemaCorrectiva} from "../../validators/Procesos";

export default function (props) {
    const {state,dispatch} = React.useContext(PlantaContext);

    const reparacionCorrectiva = state.initialStateReparaciones.reparacionCorrectiva;

    const {errors,isValid} = useYup(reparacionCorrectiva,validationSchemaCorrectiva,{validateOnChange:true});

    useEffect(()=>{
        dispatch({
            type:'HANDLE_VALIDATOR',
            payload: {isValid}
        })
    },[isValid]);

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
                    <TextField id={"convencional_12"} label={"Convencional"} type={"number} onChange={handleChanges}
                    error={Boolean(errors.bandaLateral_122)} helperText={errors.bandaLateral_122 ? errors.bandaLateral_122 : ""} value={reparacionCorrectiva.convencional_12}
                    />
                </Grid>*/}
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_121"} label={"Banda de Rodado (121)" } type={"number"} onChange={handleChanges}
                               error={Boolean(errors.bandaRodado_121)} helperText={errors.bandaRodado_121 ? errors.bandaRodado_121 : ""} value={reparacionCorrectiva.bandaRodado_121}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_122"} label={"Banda Lateral (122)"} type={"number"} onChange={handleChanges}
                               error={Boolean(errors.bandaLateral_122)} helperText={errors.bandaLateral_122 ? errors.bandaLateral_122 : ""} value={reparacionCorrectiva.bandaLateral_122}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_123"} label={"Hombro (123)"} type={"number"} onChange={handleChanges}
                               error={Boolean(errors.hombro_123)} helperText={errors.hombro_123 ? errors.hombro_123 : ""} value={reparacionCorrectiva.hombro_123}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3} style={{padding: '5px'}}>
                    <TextField id={"talon_126"} label={"Talon (126)"} type={"number"} onChange={handleChanges}
                               error={Boolean(errors.talon_126)} helperText={errors.talon_126 ? errors.talon_126 : ""} value={reparacionCorrectiva.talon_126
                    }
                    />
                </Grid>
            </Grid>

        </Grid>
    );
}