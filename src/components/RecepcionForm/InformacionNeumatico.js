import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Container, CssBaseline, DialogActions, InputAdornment, InputLabel} from "@material-ui/core";
import update from 'immutability-helper';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useYup from "@usereact/use-yup/lib";
import {validationSchema} from "../../validators/InformacionNeumatico";
import resources from "../../services/resources";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as recepcion from '../../services/recepcion';
import {useSnackbar} from "notistack";




export default function InformacionNeumatico(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [compuestoField,setCompuestoField] = React.useState(false);

    const [marcas,setMarcas] = React.useState([]);
    const [medidas,setMedidas] = React.useState([]);
    const [modelos,setModelos] = React.useState([]);
    const [compuestos, setCompuestos] = React.useState([]);
    const [causasRecepcion,setCausasRecepcion] = React.useState([]);

    const  {ingresos,setIngresos} = props.ingresos;

    console.log(props);

    const loading = marcas.length ===0 || medidas.length ===0;


    React.useEffect(()=>{
        resources.obtenerCausaRecepcion().then(res => setCausasRecepcion(res));
        resources.obtenerMarcas().then(res => setMarcas(res)).catch(()=>setMarcas([]))
    },[]);

    const [neumatico, setNeumatico] = React.useState({
        kmsOperacion: 0,
        hrsOperacion: 0,
        rtd: 0,
        marca: '',
        medida: '',
        modelo: '',
        compuesto:'',
        fecha: (new Date(Date.now())),
        ingresosid:props.ingreso[0],
        neumaticosserie:props.ingreso[1]
    });
    const {errors,isValid} = useYup(neumatico, validationSchema, {validateOnChange: true});

    const handleChange = e => {
        if (e === null) return;
        if (e.toString() === 'Invalid Date' ) return;
        if (e instanceof Date) {
            setNeumatico(prevState => ({
                ...prevState,
                fecha: e
            }));
            return;
        }
        const {id, value} = e.currentTarget;
        setNeumatico(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const handleChangeAutoComplete = id => (e,value) => {
        console.log(e, value);
        value = value? Object.values(value)[0]:null;

        setNeumatico(prevState => {
            return {
                ...prevState, [id]: value ? value : null
            }
        });


    };

    React.useEffect(()=>{
        if (neumatico.marca !=='' )
            resources.obtenerMedidasSegunMarca(neumatico.marca).then(res => setMedidas(res)).catch(()=> setMedidas([]));

    },[neumatico.marca]);

    React.useEffect(()=>{
        if (neumatico.medida !=='')
            resources.obtenerModelosSegunMarcaMedida(neumatico.marca,neumatico.medida).then(res => setModelos(res)).catch(()=>setModelos([]))
    },[neumatico.medida]);

    React.useEffect(()=>{
       if (neumatico.modelo !== ''){
           resources.obtenerNumeroCatalogo(neumatico.marca,neumatico.medida,neumatico.modelo).then((res=>{
               if (res.length>1) {
                   setCompuestoField(true);
                   resources.obtenerCompuestos(neumatico.marca,neumatico.medida,neumatico.modelo).then(res=>setCompuestos(res))

               }else{
                   setNeumatico({...neumatico,'numeroCatalogo':res[0].catalogueNumber})
               }
           }))
       }
    },[neumatico.modelo]);

    React.useEffect(()=>{
        if (neumatico.compuesto !== '')
            resources.obtenerNumeroCatalogo(neumatico.marca,neumatico.medida,neumatico.modelo,neumatico.compuesto).then(res => setNeumatico({...neumatico,'numeroCatalogo':res[0].catalogueNumber}) )
    },[neumatico.compuesto]);

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(neumatico);
        if (!isValid) {
            enqueueSnackbar('Hay campos incompletos',{variant:"info"});
            return;
        }
        recepcion.ingresarRecepcion(neumatico)
            .then(res =>{
                debugger;
                if (res instanceof Error) {
                    enqueueSnackbar(res.message,{variant: "error"});
                    return;
                }
                enqueueSnackbar('Se ha recepcionado el neumatico',{variant:"success"});
                props.openModal(false);
                setIngresos(update(ingresos,{$apply: elements => elements.filter( t=> t.id !== props.ingreso[0])}))
            })
            .catch(err => enqueueSnackbar(err.message,{variant: "error"}))

    };



    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
            <Container component={'main'}>
                <Typography variant="h6" gutterBottom>
                    Recepción
                </Typography>
                <Grid container justify={"flex-end"} direction={"row"} spacing={2}
                      style={{padding: '10px'}}>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'marca'} options={marcas} getOptionLabel={option => option.manufacturer} onChange={handleChangeAutoComplete('marca')}
                                      renderInput={params => (<TextField {...params} label={"Marca"} style={{width:'200px'}} required
                                                                         InputProps={{
                                                                             ...params.InputProps,
                                                                             endAdornment: (
                                                                                 <React.Fragment>
                                                                                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                                     {params.InputProps.endAdornment}
                                                                                 </React.Fragment>
                                                                             ),
                                                                         }}/>)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'medida'} options={medidas} getOptionLabel={option => option.size} onChange={handleChangeAutoComplete('medida')}
                                      renderInput={params => (<TextField {...params} label={"Medida"} style={{width:'200px'}} required   InputProps={{
                                          ...params.InputProps,
                                          endAdornment: (
                                              <React.Fragment>
                                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                  {params.InputProps.endAdornment}
                                              </React.Fragment>
                                          ),
                                      }}/>)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'modelo'} options={modelos} getOptionLabel={option => option.patternTreadDesign} onChange={handleChangeAutoComplete('modelo')}
                                      renderInput={params => (<TextField {...params} label={"Modelo"} style={{width:'200px'}} required />)}/>
                    </Grid>
                    {compuestoField?
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'compuesto'} options={compuestos} getOptionLabel={option => option.compound} onChange={handleChangeAutoComplete('compuesto')}
                                      renderInput={params => (<TextField {...params} label={"Compuesto"} required style={{width:'200px',transform:'traslateY(17px)'}} />)}/>
                    </Grid>:null
                    }

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"rtd"} label={"RTD"}  margin={"normal"}
                                   type={"number"}
                                   error={Boolean(errors.rtd)} helperText={errors.rtd ? errors.rtd : ""}
                                   onChange={handleChange} value={neumatico.rtd}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"hrsOperacion"} label={"Horas de Operación"}
                                   margin={"normal"}
                                   type={"number"}
                                   error={Boolean(errors.hrsOperacion)}
                                   helperText={errors.hrsOperacion ? errors.hrsOperacion : ""}
                                   onChange={handleChange} value={neumatico.hrsOperacion}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                        <Autocomplete id={'causaRecepcion'} style={{paddingTop:'15px'}} options={causasRecepcion} getOptionLabel={option => option.nombre} onChange={handleChangeAutoComplete('causaRecepcionid')}
                                      renderInput={params => (<TextField {...params} label={"Causa de Recepcion"} required
                                                                         style={{width:'200px'}} />)}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                        <TextField id={"kmsOperacion"} label={"Kms de Operación"}
                                   margin={"normal"}
                                   type={"number"}
                                   error={Boolean(errors.kmsOperacion)}
                                   helperText={errors.kmsOperacion ? errors.kmsOperacion : ""}
                                   onChange={handleChange} value={neumatico.kmsOperacion}/>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>

                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker id={"fecha"} label={"Fecha de Recepción"} format={"dd/MM/yyyy"}
                                                KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                onChange = {handleChange} value = {neumatico.fechaRecepcion}
                                                />
                        </MuiPickersUtilsProvider>

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
            </form>
        </React.Fragment>
    );
}