import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {Checkbox, FormControlLabel, InputAdornment, InputLabel} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import '../../styles/Ingreso.css';
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import useStyles from "../../styles/Ingreso";
import {obtenerClientes} from "../../services/cliente";
import * as serviceIngreso from '../../services/ingreso'
import {useSnackbar} from "notistack";
import useYup from "@usereact/use-yup/lib";
import {validationSchema} from "../../validators/Ingreso";
import Confirmacion from "../utils/Confirmacion";
import {action} from "../utils/ProcessNotification";



const initialState = {
    serie: '',
    reSerie: '',
    cliente: '',
    guiaDespacho: '',
    guiaKaltire: false,
    patenteCamion: '',
    fecha: (new Date(Date.now())),
    comentarios: '',
    fotoNeumatico: []
};

const initialStateClientes = [];

export default function (props) {
    const classes = useStyles();
    const [ingreso, setIngreso] = React.useState(initialState);
    const [openDialog,setOpenDialog] = React.useState(false);
    const [disable,setDisable] = React.useState(false);


    const [clientes,setClientes] = React.useState(initialStateClientes);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const {errors,isValid} = useYup(ingreso, validationSchema, {validateOnChange: true});
    const [submitted,setSubmitted] = React.useState(true);

    const clearSerie = () => {
        let serie  = '';
        setIngreso({...ingreso, serie});
    };


    useEffect(()=>{
        obtenerClientes().then(
            res => setClientes(res)
        ).catch(
            res =>  {
                setClientes(initialStateClientes);
            }
        )
    },[]);

    const handleImages = ({meta,file},status) => {
        console.log(status,meta,file);
        if (status==='done'){
            ingreso.fotoNeumatico.push(file);
        }else if(status==='removed'){
          ingreso.fotoNeumatico=  ingreso.fotoNeumatico.filter(item => !Object.is(file,item));
        }
    };

    const handleChange = e => {
        if (e === null) return;
        //if (e.toString() === 'Invalid Date' ) return;
        if (e instanceof Date) {
            setIngreso(prevState => ({
                ...prevState,
                fecha: e
            }));
            return;
        }
        let id = e.target.id;
        let value = e.target.value || (e.target.value ==='' && e.target.checked ===false)?e.target.value:e.target.checked;
        setIngreso(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const handleChangeAutoComplete = id => (e,value) =>{
        console.log(e,value);
        setIngreso(prevState => {
            return {
                ...prevState, [id]: value?value.id:null}
        });

    };

    const submit = async () => {
        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:"info",action:action,persist:true});
        serviceIngreso.ingresarNeumatico(ingreso).then(res=>{

            enqueueSnackbar('Neumatico Ingresado', {variant: "success"});
            setIngreso({...ingreso,['serie']:'',['reSerie']:'',['comentarios']:''});
            setTimeout(()=>{
                setSubmitted(true);
            },1);
        }).catch((error)=>{
            enqueueSnackbar( error.response?error.response.data.error.message:error.message, {variant: 'error'})
        }).finally(() => {
                closeSnackbar(key);
                setDisable(false);
            })

    };


    const handleSubmit = e => {
        e.preventDefault();

        if(!isValid){
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        setOpenDialog(true);


    };


    function clearForm() {
        initialState.cliente = ingreso.cliente;
        initialState.fotoNeumatico = [];
        setSubmitted(false);
        setTimeout(()=>{
            setSubmitted(true);
        },1);
    }

    useEffect(()=>{
        setIngreso(initialState);
    },[initialState.fotoNeumatico]);

    return (<React.Fragment>
        <CssBaseline/>
        <main className={classes.layout} style={{margin: '15px'}}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" align="center" >
                    Ingreso de Neumaticos
                </Typography>
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction={"row"} justify={"space-around"} className={classes.root}
                          style={{padding: '15px'}}>
                        <Grid item xs={12} sm={3}>
                            <TextField id={"serie"} name={"Serie"} label={"Serie"} fullWidth required autoFocus
                                       className={classes.textField}
                                       margin={"normal"}
                                       inputProps={{
                                           onPaste: event => {
                                               event.preventDefault();
                                               return false
                                           },
                                           style:{textTransform:"uppercase"},
                                           onInput: event => {
                                               event.target.value = (""+event.target.value).toUpperCase();
                                           }


                                       }}
                                       error={Boolean(errors.serie)} helperText={errors.serie ? errors.serie : ""}
                                       onChange={handleChange} value={ingreso.serie}
                                       InputProps={
                                           {
                                               endAdornment: <InputAdornment position={"end"}>
                                                   <IconButton aria-label={"clear"} onClick={clearSerie} id={"serie"}>
                                                       <ClearIcon/>
                                                   </IconButton>
                                               </InputAdornment>,
                                           }

                                       }/>

                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField id={"reSerie"} label={"Reingrese Serie"} fullWidth className={classes.textField} required
                                       margin={"normal"}
                                       error={Boolean(errors.reSerie)} helperText={errors.reSerie ? errors.reSerie : ""}
                                       onChange={handleChange} value={ingreso.reSerie}
                                       inputProps={{
                                           onPaste: event => {
                                               event.preventDefault();
                                               return false
                                           },
                                           style:{textTransform:"uppercase"},
                                           onInput: event => {
                                               event.target.value = (""+event.target.value).toUpperCase();
                                           }
                                       }}
                                       InputProps={{
                                           endAdornment: <InputAdornment position={"end"}>
                                               <IconButton aria-label={"clear"} onClick={clearSerie} id={"reSerie"}>
                                                   <ClearIcon/> </IconButton>
                                           </InputAdornment>
                                       }}/>
                        </Grid>
                        <Grid item xs={11} sm={3} style={{marginTop: '15px'}} className={classes.root}>
                            <Autocomplete   options={clientes} getOptionLabel={option => option.faena} aria-required={true} onChange={handleChangeAutoComplete('cliente')}
                                          renderInput={params => (<TextField required {...params} label={"Cliente"} style={{width:'200px'}} />)}/>
                        </Grid>

                        <Grid container spacing={2} direction={"row"} justify={"space-between"} alignItems={"flex-end"} className={classes.root}
                              >
                            <Grid item  xs={12} sm={3}   >
                                <TextField id={"guiaDespacho"} label={"Guia de despacho"} className={classes.textField} required
                                           margin={"normal"} value={ingreso.guiaDespacho}
                                           error={Boolean(errors.guiaDespacho)}
                                           helperText={errors.guiaDespacho ? errors.guiaDespacho : ""}

                                           onChange={handleChange}/>

                                <FormControlLabel
                                                  control={<Checkbox id={"guiaKaltire"} onChange={handleChange} checked={ingreso.guiaKaltire} />}
                                                  label={"Kal Tire"}/>
                            </Grid>
                            <Grid item xs={12} sm={3}  style={{position:'relative',bottom:'30px'}}>
                                <TextField id={"patenteCamion"} label={"Patente de Camión"}
                                            required
                                           className={classes.textField}
                                           margin={"normal"} value={ingreso.patenteCamion}
                                           error={Boolean(errors.patenteCamion)}
                                           helperText={errors.patenteCamion ? errors.patenteCamion : ""}
                                           fullWidth
                                           onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={3}   style={{position:'relative',bottom:'39px'}}>
                                <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                    <KeyboardDatePicker id={"fecha"} label={"Fecha de Ingreso"}
                                                        format={"dd/MM/yyyy"}
                                                        disableFuture
                                                        showTodayButton
                                                        minDate={(new Date().setDate(new Date().getDate()-7))}
                                                        onChange={handleChange} value={ingreso.fecha}


                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {<Grid item xs={12} sm={6} >
                                <TextField id={"comentarios"} label={"Comentarios"} name={"Comentarios"}
                                            onChange={handleChange}
                                           value={ingreso.comentarios}
                                           className={classes.textField} margin={"normal"} multiline rows={3}
                                           rowsMax={3}> </TextField>
                            </Grid>}
                            <Grid item xs={12} sm={5}   style={{marginTop: '22px'}}>
                                {submitted?
                                <Dropzone maxFiles={1} inputContent={"Arrastre la imagen o haga click para explorar"} initialFiles={ingreso.fotoNeumatico}  accept={'image/*'}  onChangeStatus={handleImages} />
                                :null}
                            </Grid>
                            <Grid item xs  >
                            <div>
                            <Button
                                style={{backgroundColor:'#f47b20'}}
                                type={"submit"}
                                startIcon={<SaveIcon/>}
                                variant="contained"
                                color="primary"
                                disabled={disable}

                            >
                                Ingresar
                            </Button>
                                <IconButton aria-label="delete" className={classes.margin} disabled={disable} onClick={clearForm }>
                                    <DeleteIcon fontSize="large" color={'error'} />
                                </IconButton>
                            </div>
                            </Grid>

                        </Grid>

                    </Grid>
                </form>
            </Paper>
            {<Confirmacion title={"Ingreso"} message={"¿Desea Ingresar el Neumático?"} fnFalse={()=>{}} fnTrue={submit} state={{openDialog,setOpenDialog}}/>}

        </main>

    </React.Fragment>
)

}