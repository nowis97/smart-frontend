import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Container, CssBaseline, DialogActions, InputAdornment, InputLabel} from "@material-ui/core";
import useYup from "@usereact/use-yup";
import * as yup from 'yup'

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const validationSchema = yup.object().shape({
    rtd: yup.number().min(1).max(300).required(),
    hrs_operacion: yup.number().min(0).max(20000).notRequired(),
    kms_operacion: yup.number().min(0).max(20000).notRequired()
});

export default function InformacionNeumatico(props) {
    const [neumatico, setNeumatico] = React.useState({
        kmsOperacion: 0,
        hrsOperacion: 0,
        rtd: 0,
        marca: '',
        medida: '',
        modelo: '',
        fechaRecepcion:null
    });
    const handleChange = e => {
        const {id, value} = e.currentTarget;
        setNeumatico(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const {errors} = useYup(neumatico, validationSchema, {
        validateOnChange: true
    });



    return (
        <React.Fragment>
            <Container>
                <Typography variant="h6" gutterBottom>
                    Recepción
                </Typography>
                <Grid container justify={"flex-end"} direction={"row"} spacing={2}
                      style={{padding: '10px'}}>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'marca'}
                                      renderInput={params => (<TextField {...params} label={"Marca"} style={{width:'200px'}} />)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'medida'}
                                      renderInput={params => (<TextField {...params} label={"Medida"} style={{width:'200px'}} />)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'modelo'}
                                      renderInput={params => (<TextField {...params} label={"Modelo"} style={{width:'200px'}} />)}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"rtd"} label={"RTD"}  margin={"normal"}
                                   error={Boolean(errors.rtd)} helperText={errors.rtd ? errors.rtd : ""}
                                   onChange={handleChange} value={neumatico.rtd}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"hrs_operacion"} label={"Horas de Operación"}
                                   margin={"normal"}
                                   error={Boolean(errors.hrs_operacion)}
                                   helperText={errors.hrs_operacion ? errors.hrs_operacion : ""}
                                   onChange={handleChange} value={neumatico.hrs_operacion}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                        <Autocomplete id={'causaRecepcion'} style={{paddingTop:'15px'}}
                                      renderInput={params => (<TextField {...params} label={"Causa de Recepcion"}
                                                                         style={{width:'200px'}} />)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                        <TextField id={"kms_operacion"} label={"Kms de Operación"}
                                   margin={"normal"}
                                   error={Boolean(errors.kms_operacion)}
                                   helperText={errors.kms_operacion ? errors.kms_operacion : ""}
                                   onChange={handleChange} value={neumatico.kms_operacion}/>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                        <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker id={"fechaRecepcion"} label={"Fecha de Recepción"} format={"dd/MM/yyyy"}
                                                KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                />
                        </MuiPickersUtilsProvider>
                        </>
                    </Grid>




                </Grid>
            </Container>
            <DialogActions>
            <Button
                type={"submit"}
                startIcon={<SaveIcon/>}
                variant="contained"
                color="primary"
                style={{backgroundColor: '#f47b20'}}
            >Guardar </Button>

            </DialogActions>
        </React.Fragment>
    );
}