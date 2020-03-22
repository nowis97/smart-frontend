import useStyles from "../../styles/Ingreso";
import {useSnackbar} from "notistack";
import React, {useEffect} from "react";
import useYup from "@usereact/use-yup/lib";
import {validationSchema} from "../../validators/InformacionPerformance";
import * as cliente from "../../services/cliente";
import * as serviceReporte from "../../services/reporte";
import xlsx from "xlsx";
import * as FileSaver from "file-saver";
import {Container, DialogActions, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import Confirmacion from "../utils/Confirmacion";
import * as servicePerformance from '../../services/performance';
import Checkbox from "@material-ui/core/Checkbox";
import PhotoIcon from "@material-ui/icons/Photo";
import {action} from "../utils/ProcessNotification";

const initialState = {
    serie: '',
    reSerie:'',
    fechaUltimaInspeccion:(new Date()),
    rtdActual:0,
    kmsActual:0,
    hrsActual:0,
    estadoActual:''
};

const nombreEstado = [
    {
        nombre:'Spare',
    },
    {
        nombre: 'Installed',
    },{
        nombre: 'Retread',
    },
    {
        nombre:'Repair',
    },
    {
        nombre: 'Scrap',
    },
    {
        nombre:'Hold'
    }
];


export default function InformacionPerformance(props) {

    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [performance,setPerformance] = React.useState(initialState);
    const {neumaticos,setNeumaticos} = props.neumaticosIngresados;
    const {errors,isValid} = useYup(performance,validationSchema,{validateOnChange:true});
    const [disable,setDisable] = React.useState(false);

    const [openDialog,setOpenDialog] = React.useState(false);


    const handleChangeAutoComplete = id => (e,value) =>{

        console.log(e,value);
        setPerformance(prevState => {
            return {
                ...prevState, [id]: value?value.nombre:null}
        });

    };

    const handleChangeDates =  (value,id) => {

        setPerformance(prevState => ({
            ...prevState,
            [id]:value
        }))
    };
    const submit = () =>{
        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:"info",persist:true,action:action});

        servicePerformance.ingresarNeumatico(performance).then(res =>{
            enqueueSnackbar(res.status + ': Neumatico Ingresado Correctamente',
            {variant:"success"});

            setNeumaticos(prevState => [...prevState,res.data]);
            props.openModal(false);

        })
            .catch(err => enqueueSnackbar(err.response? err.response.data.error.message:err.message,
            {variant:"error",autoHideDuration:8000}))
            .finally(() => {
                setDisable(false);
                closeSnackbar(key);
            })

    };
    const handleChange = e => {
        const {id, value} = e.currentTarget;
        setPerformance(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!isValid) {
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        setOpenDialog(true);

    };




    return (
        <React.Fragment>
            <form  onSubmit={handleSubmit}>
            <Container component={"main"} >
                <Typography variant="h6" gutterBottom>
                    Ingresar Neumático
                </Typography>
                        <Grid container justify={"flex-start"} direction={"row"} spacing={3}
                        >
                            <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                                <TextField id={"serie"} label={"Serie"}
                                           type={"text"}
                                           error={Boolean(errors.serie)} helperText={errors.serie ? errors.serie : ""}
                                           onChange={handleChange} value={performance.serie}/>

                            </Grid>
                            <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                                <TextField id={"reSerie"} label={"Reingrese Serie"}
                                           type={"text"}
                                           error={Boolean(errors.reSerie)} helperText={errors.reSerie ? errors.reSerie : ""}
                                           onChange={handleChange} value={performance.reSerie}/>

                            </Grid>



                            <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                                <Autocomplete  options={nombreEstado} getOptionLabel={option => option.nombre} aria-required={true} onChange={handleChangeAutoComplete('estadoActual')}
                                               renderInput={params => (<TextField fullWidth required {...params} label={"Estado Actual"}  />)}/>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker id={"fecha"} label={"Fecha de Ult. Inspección"} format={"dd/MM/yyyy"}

                                                        KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                        onChange = {e => handleChangeDates(e,'fechaUltimaInspeccion')} value = {performance.fechaUltimaInspeccion}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                                <TextField id={"rtdActual"} label={"RTD Actual"}
                                            type={"number"}
                                           error={Boolean(errors.rtdActual)} helperText={errors.rtdActual ? errors.rtdActual : ""}
                                           onChange={handleChange} value={performance.rtdActual}/>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                                <TextField id={"kmsActual"} label={"Kms. Actual"}
                                            type={"number"}
                                           error={Boolean(errors.kmsActual)} helperText={errors.kmsActual ? errors.kmsActual : ""}
                                           onChange={handleChange} value={performance.kmsActual}/>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                                <TextField id={"hrsActual"} label={"Hrs. Actual"}
                                           type={"number"}
                                           error={Boolean(errors.hrsActual)} helperText={errors.hrsActual ? errors.hrsActual : ""}
                                           onChange={handleChange} value={performance.hrsActual}/>
                            </Grid>

                        </Grid>
            </Container>
                    <DialogActions>
                        <Button
                            type={"submit"}
                            startIcon={<SaveIcon/>}
                            variant="contained"
                            color="primary"
                            disabled={disable}
                            style={{backgroundColor: '#f47b20'}}
                        >Guardar </Button>

                    </DialogActions>
            </form>

                <Confirmacion state = {{openDialog,setOpenDialog}} title = "Performance" message ="¿Desea guardar?" fnFalse = {() =>{}} fnTrue ={submit} />


        </React.Fragment>
    );

}