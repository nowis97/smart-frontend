import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {PlantaContext} from "./Planta";
import useYup from "@usereact/use-yup/lib";
import {validationSchemaPreventiva} from "../../validators/Procesos";

export default function (props) {
    let {state, dispatch} = React.useContext(PlantaContext);
    let preventiva = state.initialStateReparaciones.preventiva;

    const {errors,isValid} = useYup(preventiva,validationSchemaPreventiva,{validateOnChange:true});

    const handleChanges = event => {
        let e = event.target;
        dispatch({type: 'HANDLE_PREVENTIVAS', payload: e});
    };

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
                Preventiva
            </Typography>

            <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>
                {/*<Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"menor_11"} label={"Menor"} value={preventiva.menor_11}
                              type={"number}  onChange={handleChanges} error={Boolean(errors.)} helperText={errors. ? errors. : ""} />
                </Grid>*/}
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaRodado_111"} label={"Banda Rodado (111)"} value={preventiva.bandaRodado_111}
                              type={"number"}  onChange={handleChanges} error={Boolean(errors.bandaRodado_111)} helperText={errors.bandaRodado_111 ? errors.bandaRodado_111 : ""} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"bandaLateral_112"} label={"Banda Lateral (112)"} value={preventiva.bandaLateral_112}
                              type={"number"}  onChange={handleChanges} error={Boolean(errors.bandaLateral_112)} helperText={errors.bandaLateral_112 ? errors.bandaLateral_112 : ""} />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"hombro_113"} label={"Hombro (113)"} value={preventiva.hombro_113}
                              type={"number"}  onChange={handleChanges} error={Boolean(errors.hombro_113)} helperText={errors.hombro_113 ? errors.hombro_113 : ""} />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}} md={3}>
                    <TextField id={"talon_116"} label={"Talon (116)"} value={preventiva.talon_116}
                              type={"number"}  onChange={handleChanges} error={Boolean(errors.talon_116)} helperText={errors.talon_116 ? errors.talon_116 : ""} />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding: '5px'}} md={3}>
                    <TextField id={"butilo_118"} label={"Butilo (118)"} value={preventiva.butilo_118}
                              type={"number"}  onChange={handleChanges} error={Boolean(errors.butilo_118)} helperText={errors.butilo_118 ? errors.butilo_118 : ""} />
                </Grid>

            </Grid>

        </Grid>
    );
}