import React from "react";
import {Container, DialogActions} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {addDays} from "date-fns";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Confirmacion from "../utils/Confirmacion";
import {useSnackbar} from "notistack";
import useYup from "@usereact/use-yup/lib";
import {validationSchema} from "../../validators/InformacionMaple";
import {action} from "../utils/ProcessNotification";
import * as serviceMaple from "../../services/maple";
import update from "immutability-helper";

export default function InformacionMaple(props){
    const {mapleAnterior,setMapleAnterior} = props.ultimaMaple;

    const {enqueueSnackbar,closeSnackbar} =useSnackbar();
    const [disable,setDisable] = React.useState(false);

    const {facturadosRenovados,setFacturadosRenovados} = props.facturados;

    const {facturadoRenovado,setFacturadoRenovado} = props.facturado;


    const initialStateMaple = {
        ahorroCo2: 0,
        ahorroDiesel:0,
        ahorroEmisionesCo2:0,
        codProducto:'',
        nombreProducto:''
    };
    console.log(props);
    console.log(facturadoRenovado, facturadosRenovados)
    debugger;

    const [maple,setMaple] = React.useState( setMapleAnterior? setMapleAnterior: initialStateMaple);
    const {errors,isValid} =useYup(maple,validationSchema,{validateOnChange:true});
    const [openDialog,setOpenDialog] = React.useState(false);


    const clearForm = () => setMaple(initialStateMaple);

    const submit = () =>{
        maple.serie = facturadoRenovado[0];
        maple.numeroFactura = facturadoRenovado[3];
        maple.ahorroEmisionesCo2=parseFloat(maple.ahorroEmisionesCo2);
        maple.ahorroDiesel=parseFloat(maple.ahorroDiesel);
        maple.ahorroCo2=parseFloat(maple.ahorroCo2);

        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:"info",persist:true,action:action});
        serviceMaple.ingresarMaple(maple)
            .then(res => {
                setFacturadoRenovado(update(facturadosRenovados,{
                    $apply: rec => rec.filter( el => {
                        debugger;
                        return  el.serie !== facturadoRenovado[0]
                    })
                }));
                closeSnackbar(key);
                setDisable(false);
                enqueueSnackbar('Ingreso maple correcto',{variant:'success'});
                props.openModal(false);
                setMapleAnterior(maple);

            })
            .catch(err =>{
                closeSnackbar(key);

                enqueueSnackbar(err.response? err.response.data.error.message :err.message,{variant:"error",autoHideDuration:8000})
                setDisable(false);
            })
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!isValid){
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        setOpenDialog(true);


    };
    const handleChange = e => {

        const {id, value} = e.currentTarget;
        setMaple(prevState => ({
            ...prevState,
            [id]: value
        }))
    };


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Container component={'main'}>
                    <Typography variant="h6" gutterBottom>
                        Ingreso Maple de: {facturadoRenovado[0]}
                    </Typography>
                    <Grid container justify={"flex-start"} direction={"row"} spacing={2}
                    >

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"ahorroCo2"} label={"Ahorro de CO2"} type={"number"}
                                       error={Boolean(errors.ahorroCo2)} helperText={errors.ahorroCo2 ? errors.ahorroCo2 : ""}
                                       onChange={handleChange} value={maple.ahorroCo2}/>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"ahorroDiesel"} label={"Ahorro diesel"} type={"number"}
                                       error={Boolean(errors.ahorroDiesel)} helperText={errors.ahorroDiesel ? errors.ahorroDiesel : ""}
                                       onChange={handleChange} value={maple.ahorroDiesel}/>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"ahorroEmisionesCo2"} type={"number"} label={"Ahorro emisiones de CO2"}

                                       error={Boolean(errors.ahorroEmisionesCo2)} helperText={errors.ahorroEmisionesCo2 ? errors.ahorroEmisionesCo2 : ""}
                                       onChange={handleChange} value={maple.ahorroEmisionesCo2}/>
                        </Grid>


                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"codProducto"} label={"Código producto"}  onChange={handleChange}
                                       error={Boolean(errors.codProducto)} helperText={errors.codProducto ? errors.codProducto : ""} value={maple.codProducto}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                            <TextField id={"nombreProducto"} label={"Nombre producto"}  onChange={handleChange}
                                       error={Boolean(errors.nombreProducto)} helperText={errors.nombreProducto ? errors.nombreProducto : ""} value={maple.nombreProducto}
                            />
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
                    >Maple </Button>

                </DialogActions>
            </form>
            <Confirmacion state = {{openDialog,setOpenDialog}} title = "Ingreso maple" message ="¿Desea ingresar este neumático a maple?" fnFalse = {() =>{}} fnTrue ={submit} />

        </React.Fragment>
    );
}