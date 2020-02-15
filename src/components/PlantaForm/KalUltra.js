import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";
import useYup from "@usereact/use-yup/lib";
import {validationSchemaKalUltra} from "../../validators/Procesos";


export default function (props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    let kalUltra = state.initialStateReparaciones.reparacionKalUltra;
    const handleChanges = event => {
        let e = event.target;
        dispatch({type: 'HANDLE_KALULTRA', payload: e});
    };

    const {errors,isValid} = useYup(kalUltra,validationSchemaKalUltra,{validateOnChange:true});

    useEffect(()=>{
        dispatch({
            type:'HANDLE_VALIDATOR',
            payload: {isValid}
        })
    },[isValid]);

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
            <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>
                {/*<Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"reparacion_13"} label={"Reparacion"} error={Boolean(errors.bandaRodado_121)} helperText={errors.bandaRodado_121 ? errors.bandaRodado_121 : ""}
                     value={kalUltra.reparacion_13}
                              type={"number} onChange={handleChanges}/>
                </Grid>*/}
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_131"} label={"Banda de Rodado (131)"} type={"number"} onChange={handleChanges}
                               error={Boolean(errors.bandaRodado_131)} helperText={errors.bandaRodado_131 ? errors.bandaRodado_131 : ""}
                               value={kalUltra.bandaRodado_131}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_132"} label={"Banda Lateral (132)"}
                               error={Boolean(errors.bandaLateral_132)} helperText={errors.bandaLateral_132 ? errors.bandaLateral_132 : ""}
                               value={kalUltra.bandaLateral_132}
                               type={"number"} onChange={handleChanges}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_133"} label={"Hombro (133)"}
                               error={Boolean(errors.hombro_133)} helperText={errors.hombro_133 ? errors.hombro_133 : ""}
                               value={kalUltra.hombro_133}
                               type={"number"} onChange={handleChanges}/>
                </Grid>
            </Grid>
        </Grid>
    );

}