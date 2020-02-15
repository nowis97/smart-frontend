import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import {Checkbox, FormControlLabel, RadioGroup} from "@material-ui/core";
import {PlantaContext} from "./Planta";
import Radio from '@material-ui/core/Radio';
import useYup from "@usereact/use-yup/lib";
import {validationSchema} from "../../validators/Renovados";

export default function (props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    let renovado = state.initialStateRenovados;
    const handleChange = event => {
        const e = event.target;
        dispatch({type: 'HANDLE_PROCESOS_RENOVADOS', payload: e});
    };

    const {errors,isValid} = useYup(renovado,validationSchema,{validateOnChange:true});

    useEffect(()=>{
        dispatch(
            {
                type: 'HANDLE_VALIDATOR',
                payload: {isValid}
        })
    },[isValid]);

    return (
        <Grid container>
            <Grid container direction={"row"} justify={"center"}>
                <RadioGroup defaultValue={'smoothgroove'} style={{flexDirection: 'row',display:'contents'}} type={"number"} onChange={handleChange} error={Boolean(errors.hombro_133)} helperText={errors.hombro_133 ? errors.hombro_133 : ""} value={renovado.tipoRenovado || 'smoothgroove'}
                            name={'tipoRenovado'}>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel  value={'smoothgroove'} control={
                            <Radio/>
                        }
                                          label={
                                              "Smooth and Groove"
                                          }
                        />
                    </Grid>

                    {/*<Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel error={Boolean(errors.hombro_133)} helperText={errors.hombro_133 ? errors.hombro_133 : ""} value={"molde"} control={
                            <Radio/>
                        }
                                          label={
                                              "Molde"
                                          }
                        />
                    </Grid>*/}
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel  value={"ultratread"} control={
                            <Radio/>
                        }
                                          label={
                                              "Ultra Tread"
                                          }
                        />
                    </Grid>
                </RadioGroup>
            </Grid>

            <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>
                <Typography style={{
                    backgroundColor: 'white',
                    height: 'fit-content',
                    transform: 'translateY(25px)',
                    marginLeft: '30px'
                }} component="h1"
                            variant="body1">
                    Codigo
                </Typography>
                <Grid container item style={{padding: '7px', border: '1px rgba(0,0,0,0.1) inset', margin: '13px'}}>

                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"codigoCauchoBase"} label={"Caucho Base"}  onChange={handleChange} required
                               error={Boolean(errors.codigoCauchoBase)} helperText={errors.codigoCauchoBase? errors.codigoCauchoBase : ""} value={renovado.codigoCauchoBase}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoBanda1"} label={"Caucho Banda 1"}  onChange={handleChange} required
                               error={Boolean(errors.cauchoBanda1)} helperText={errors.cauchoBanda1 ? errors.cauchoBanda1 : ""}
                               value={renovado.cauchoBanda1}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoBanda2"} label={"Caucho Banda 2"}  onChange={handleChange}
                               error={Boolean(errors.cauchoBanda2)} helperText={errors.cauchoBanda2 ? errors.cauchoBanda2 : ""}
                               value={renovado.cauchoBanda2}
                    />
                </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoUtilizado"} label={"Caucho Utilizado (Kg)"} type={"number"} onChange={handleChange}
                               error={Boolean(errors.cauchoUtilizado)} helperText={errors.cauchoUtilizado ? errors.cauchoUtilizado : ""}
                               value={renovado.cauchoUtilizado}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"otdRenovado"} label={"OTD Renovado (mm)"} type={"number"} onChange={handleChange}
                               error={Boolean(errors.otdRenovado)} helperText={errors.otdRenovado ? errors.otdRenovado : ""}
                               value={renovado.otdRenovado}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"pesoCarcasa"} label={"Peso Carcasa (Kg)"} type={"number"} onChange={handleChange}
                               error={Boolean(errors.pesoCarcasa)} helperText={errors.pesoCarcasa ? errors.pesoCarcasa : ""}
                               value={renovado.pesoCarcasa}
                    />
                </Grid>


            </Grid>

        </Grid>
    );
}