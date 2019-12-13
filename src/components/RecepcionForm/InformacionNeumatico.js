import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Container, CssBaseline, DialogActions, InputAdornment, InputLabel} from "@material-ui/core";

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



export default function InformacionNeumatico(props) {
    const [compuestoField,setCompuestoField] = React.useState(false);


    const [marcas,setMarcas] = React.useState([]);
    const [medidas,setMedidas] = React.useState([]);
    const [modelos,setModelos] = React.useState([]);

    const loading = marcas.length ===0 || medidas.length ===0;


    React.useEffect(()=>{
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
        fechaRecepcion:null
    });
    const handleChange = e => {
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
        resources.obtenerMedidasSegunMarca(neumatico.marca).then(res => setMedidas(res)).catch(()=> setMedidas([]));
        resources.obtenerModelosSegunMarcaMedida(neumatico.marca,neumatico.medida).then(res => setModelos(res)).catch(()=>setModelos([]))
    },[neumatico.marca,neumatico.medida]);

    const handleSubmit = e =>{
        e.preventDefault();
    };
    const {errors,isValid} = useYup(neumatico, validationSchema, {validateOnChange: true});

    console.log(medidas);


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
                        <Autocomplete id={'medida'} options={medidas} getOptionLabel={option => option.size}
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
                        <Autocomplete id={'modelo'} options={modelos} getOptionLabel={option => option.patternTreadDesign}
                                      renderInput={params => (<TextField {...params} label={"Modelo"} style={{width:'200px'}} required />)}/>
                    </Grid>
                    {compuestoField?
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <Autocomplete id={'compuesto'}
                                      renderInput={params => (<TextField {...params} label={"Compuesto"} required style={{width:'200px',transform:'traslateY(17px)'}} />)}/>
                    </Grid>:null
                    }

                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"rtd"} label={"RTD"}  margin={"normal"}
                                   error={Boolean(errors.rtd)} helperText={errors.rtd ? errors.rtd : ""}
                                   onChange={handleChange} value={neumatico.rtd}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                        <TextField id={"hrsOperacion"} label={"Horas de Operación"}
                                   margin={"normal"}
                                   error={Boolean(errors.hrsOperacion)}
                                   helperText={errors.hrsOperacion ? errors.hrsOperacion : ""}
                                   onChange={handleChange} value={neumatico.hrsOperacion}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                        <Autocomplete id={'causaRecepcion'} style={{paddingTop:'15px'}}
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
                            <KeyboardDatePicker id={"fechaRecepcion"} label={"Fecha de Recepción"} format={"dd/MM/yyyy"}
                                                KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
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