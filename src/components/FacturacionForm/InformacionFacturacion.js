import Grid from "@material-ui/core/Grid";
import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";

import makeStyles from "@material-ui/core/styles/makeStyles";
import useYup from "@usereact/use-yup/lib";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Container, DialogActions} from "@material-ui/core";
import {ResourceContext} from "../utils/ResourceContext";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ReceiptIcon from '@material-ui/icons/Receipt';
import * as serviceFacturacion from '../../services/facturacion';
import {useSnackbar} from "notistack";
import update from "immutability-helper";
import {validationSchema} from "../../validators/InformacionFacturacion";
import Confirmacion from "../utils/Confirmacion";
import {action} from "../utils/ProcessNotification";
import {addDays} from 'date-fns';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";


const initialStateFacturacion = {
    numeroFactura: '',
    estadoPago:(new Date(Date.now())),
    fecha:(new Date(Date.now())),

};

export function InformacionFacturacion(props) {
    const {ultimaFactura,setUltimaFactura} = props.ultimaFactura;

    const {enqueueSnackbar,closeSnackbar} =useSnackbar();
    const [disable,setDisable] = React.useState(false);

    const {despachados,setDespachados} = props.despachados;

    const {despachado} = props.despachado;

    const [factura,setFactura] = React.useState( ultimaFactura? ultimaFactura: initialStateFacturacion);
    const {errors,isValid} =useYup(factura,validationSchema,{validateOnChange:true});
    const [openDialog,setOpenDialog] = React.useState(false);

    console.log(despachado);

    const clearForm = () => setFactura(initialStateFacturacion);

    const submit = () =>{
        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:"info",persist:true,action:action});
        serviceFacturacion.ingresarFactura(factura)
            .then(res => {
                setDespachados(update(despachados,{
                    $apply: rec => rec.filter( el => {
                        debugger;
                        return  el.serie !== despachado[0]
                    })
                }));
                closeSnackbar(key);
                setDisable(false);
                enqueueSnackbar('Neumatico Despachado Correctamente',{variant:'success'});
                props.openModal(false);
                setUltimaFactura(factura);

            })
            .catch(err =>{
                closeSnackbar(key);

                enqueueSnackbar(err.response? err.response.data.error.message :err.message,{variant:"error",autoHideDuration:8000})
                setDisable(false);
            })
    };

    const handleSubmit = (e) => {
        factura.serie = despachado[0];
        factura.guiaDespacho = despachado[2];
        e.preventDefault();

        if (!isValid){
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        setOpenDialog(true);


    };
    const handleChange = e => {

        const {id, value} = e.currentTarget;
        setFactura(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const handleChangeDates =  (value,id) => {

        setFactura(prevState => ({
            ...prevState,
            [id]:value
        }))
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Container component={'main'}>
                    <Typography variant="h6" gutterBottom>
                        Facturación de: {despachado[0]}
                    </Typography>
                    <Grid container justify={"flex-start"} direction={"row"} spacing={2}
                    >

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"numeroFactura"} label={"Numero de Factura"}

                                       error={Boolean(errors.numeroFactura)} helperText={errors.numeroFactura ? errors.numeroFactura : ""}
                                       onChange={handleChange} value={factura.numeroFactura}/>
                        </Grid>


                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>

                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker id={"fecha"} label={"Fecha de Facturación"} format={"dd/MM/yyyy"}
                                                    minDate={addDays(new Date(despachado[5]),1)}
                                                    KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                    onChange = {e => handleChangeDates(e,'fecha')} value = {factura.fecha}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>

                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker id={"estadoPago"} label={"Fecha de Estado Pago"} format={"dd/MM/yyyy"}
                                                    maxDate={factura.fecha}

                                                    KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                    onChange = {e => handleChangeDates(e,'estadoPago')} value = {factura.estadoPago}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>

                    </Grid>
                </Container>

                <DialogActions style={{paddingTop:'14px'}}>
                    <IconButton aria-label="delete" disabled={disable} onClick={clearForm}>
                        <DeleteIcon fontSize="large" color={'error'} />
                    </IconButton>
                    <Button
                        disabled={disable}
                        type={"submit"}
                        startIcon={<ReceiptIcon/>}
                        variant="contained"
                        color="primary"
                        style={{backgroundColor: '#f47b20'}}
                    >Facturar </Button>

                </DialogActions>
            </form>
            <Confirmacion state = {{openDialog,setOpenDialog}} title = "Facturación" message ="¿Desea facturar?" fnFalse = {() =>{}} fnTrue ={submit} />

        </React.Fragment>
    );


}