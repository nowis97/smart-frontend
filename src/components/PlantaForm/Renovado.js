import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {Checkbox, FormControlLabel, RadioGroup} from "@material-ui/core";
import {PlantaContext} from "./Planta";
import Radio from '@material-ui/core/Radio';

export default function (props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    let renovado = state.initialStateRenovados;
    const handleChange = event => {
        const e = event.target;
        dispatch({type: 'HANDLE_PROCESOS_RENOVADOS', payload: e});
    };
    return (
        <Grid container>
            <Grid container direction={"row"} justify={"center"}>
                <RadioGroup defaultValue={'smoothgroove'} style={{flexDirection: 'row',display:'contents'}} onChange={handleChange} value={renovado.tipoRenovado || 'smoothgroove'}
                            name={'tipoRenovado'}>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel value={'smoothgroove'} control={
                            <Radio/>
                        }
                                          label={
                                              "Smooth and Groove"
                                          }
                        />
                    </Grid>

                    {/*<Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel value={"molde"} control={
                            <Radio/>
                        }
                                          label={
                                              "Molde"
                                          }
                        />
                    </Grid>*/}
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>

                        <FormControlLabel value={"ultratread"} control={
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
                    <TextField id={"codigoCauchoBase"} label={"Caucho Base"} onChange={handleChange} value={renovado.codigoCauchoBase}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoBanda1"} label={"Caucho Banda 1"} onChange={handleChange} value={renovado.cauchoBanda1}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoBanda2"} label={"Caucho Banda 2"} onChange={handleChange} value={renovado.cauchoBanda2}
                    />
                </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"cauchoUtilizado"} label={"Caucho Utilizado"} onChange={handleChange} value={renovado.cauchoUtilizado}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4} xl={3} style={{padding: '5px'}}>
                    <TextField id={"otdRenovado"} label={"OTD Renovado"} onChange={handleChange} value={renovado.otdRenovado}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} md={3} xl={3} style={{padding: '5px'}}>
                    <TextField id={"pesoCarcasa"} label={"Peso Carcasa"} onChange={handleChange} value={renovado.pesoCarcasa}
                    />
                </Grid>


            </Grid>

        </Grid>
    );
}