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
import SendIcon from "@material-ui/icons/Send";
import * as serviceDespacho from '../../services/despacho';
import {useSnackbar} from "notistack";
import update from "immutability-helper";
import {validationSchema} from "../../validators/InformacionDespacho";
import Confirmacion from "../utils/Confirmacion";
import {action} from "../utils/ProcessNotification";
import {addDays} from 'date-fns';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";



export function InformacionDespacho(props) {
    const initialStateDespacho = {
        guiaDespacho: '',
        patente:'',
        fecha:( addDays(new Date( props.despacho.despacho[6]),1)),
        comentarios:''
    };



    const {enqueueSnackbar,closeSnackbar} =useSnackbar();

    const {neumaticosPlantas,setNeumaticosPlantas} = props.terminados;

    const {ultimoDespacho, setUltimoDespacho} = props.ultimoDespacho;


    const [despacho,setDespacho] = React.useState(ultimoDespacho? ultimoDespacho:initialStateDespacho);
    const [openDialog,setOpenDialog] = React.useState(false);
    const {errors,isValid} =useYup(despacho,validationSchema,{validateOnChange:true});
    const [disable,setDisable] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid){
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        setOpenDialog(true);



    };

    const clearForm = () => setDespacho(initialStateDespacho);



    const submit = () =>{
        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:'info',action:action,persist:true});
        serviceDespacho.despacharNeumatico(despacho,props.despacho.despacho[0],props.despacho.despacho[1])
            .then(res => {

                setNeumaticosPlantas(update(neumaticosPlantas,{
                    $apply: rec => rec.filter( el => {

                        return  el.id !== props.despacho.despacho[0]
                    })
                }));
                enqueueSnackbar('Neumatico Despachado Correctamente',{variant:'success'});
                props.openModal(false);
                setUltimoDespacho({...despacho,['comentarios']:''});

            })
            .catch(err =>{
                enqueueSnackbar(err.response? err.response.data.error.message:err.message,{variant:"error",autoHideDuration:8000});

            }).finally(() => {
            setDisable(false);
            closeSnackbar(key);
        })
    };

    const handleChange = e => {
        if (e === null) return;
        if (e instanceof Date) {
            setDespacho(prevState => ({
                ...prevState,
                fecha: e
            }));
            return;
        }
        const {id, value} = e.currentTarget;
        setDespacho(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Container component={'main'}>
                    <Typography variant="h6" gutterBottom>
                        Despacho de: {props.despacho.despacho[1]}
                    </Typography>
                    <Grid container justify={"flex-start"} direction={"row"} spacing={2}
                          >

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"guiaDespacho"} label={"Guía de Despacho"}

                                       error={Boolean(errors.guiaDespacho)} helperText={errors.guiaDespacho ? errors.guiaDespacho : ""}
                                       onChange={handleChange} value={despacho.guiaDespacho}/>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"patente"} label={"Patente"}

                                       error={Boolean(errors.patente)} helperText={errors.patente ? errors.patente : ""}
                                       onChange={handleChange} value={despacho.patente}/>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>

                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker id={"fecha"} label={"Fecha de Despacho"} format={"dd/MM/yyyy"}

                                                    KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                    onChange = {handleChange} value = {despacho.fecha}
                                                    minDate = {addDays( new Date(props.despacho.despacho[6]),1)}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"comentarios"} label={"Comentarios"}
                                       onChange={handleChange}
                                       value={despacho.comentarios}
                                       margin={"normal"} multiline rows={3}
                                       rowsMax={3}/>

                        </Grid>





                    </Grid>
                </Container>

                <DialogActions>
                    <IconButton aria-label="delete" disabled={disable} onClick={clearForm}>
                        <DeleteIcon fontSize="large" color={'error'} />
                    </IconButton>
                    <Button
                        disabled={disable}
                        type={"submit"}
                        startIcon={<SendIcon/>}
                        variant="contained"
                        color="primary"
                        style={{backgroundColor: '#f47b20'}}
                    >Despachar </Button>

                </DialogActions>
            </form>
            <Confirmacion state = {{openDialog,setOpenDialog}} title = "Despacho" message ="¿Desea despachar?" fnFalse = {() =>{}} fnTrue ={submit} />

        </React.Fragment>
    );


}