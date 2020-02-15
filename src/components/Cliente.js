import Copyright from "./MainContainer/Copyright";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useStyle from "../styles/Cliente";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import '../styles/Cliente.css';
import {ResourceContext} from "./utils/ResourceContext";
import * as serviceCliente from "../services/cliente";
import {useSnackbar} from "notistack";
import {action} from "./utils/ProcessNotification";
import {format, validate} from "rut.js";

const initialStateCliente = {
  nombreFaena:'',
  compania:'',
  latitud:0,
  longitud:0,
  tipoMina:null,
  region:null,
  tieneContrato:false,
  rut:''
};

export default function Cliente (props) {

    let {regiones, tipoMinas} = React.useContext(ResourceContext);

    let [cliente, setCliente] = React.useState(initialStateCliente);

    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [disable,setDisable] = React.useState(false);

    const clearForm = () =>{
        initialStateCliente.region = cliente.region;
        initialStateCliente.tipoMina = cliente.tipoMina;
        setCliente(initialStateCliente);
    };

    const handleSubmit = event =>{
      event.preventDefault();
      if (!validate(cliente.rut)){
          enqueueSnackbar('RUT no valido',{variant:"warning"});
          return;
      }

      setDisable(true);
      const key = enqueueSnackbar('Procesando...',{variant:"info",persist:true,action:action});

      serviceCliente.crearCliente(cliente).then(res =>{
          if (res) {
              enqueueSnackbar('Se ha Ingresado el Cliente',{variant:"success"});
              clearForm();
          }

      }).catch(
            err=> enqueueSnackbar(err.message,{variant:"error"}
          ))
          .finally(() => {
              setDisable(false);
              closeSnackbar(key);
          })
    };
    const handleChangeAutoComplete = id => (e,value) =>{
        console.log(e,value);
        setCliente(prevState => {
            return {
                ...prevState, [id]: value?value.id:null}
        });

    };

    const handleChanges = e =>{

        let id = e.target.id?e.target.id:e.target.name;
        let value = e.target.value || (e.target.value ==='' && e.target.checked ===false)?e.target.value:e.target.checked;
        setCliente(prevState => ({
            ...prevState,
            [id]:id === 'rut'? format(value):value
        }));

        console.log(cliente);
    };
    const classes = useStyle();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Ingresar Cliente
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="rut"
                                label="RUT"
                                autoFocus
                                value={cliente.rut}
                                onChange={handleChanges}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nombreFaena"
                                label="Nombre"
                                value={cliente.nombreFaena}
                                onChange={handleChanges}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="compania"
                                label="Compañia"
                                onChange={handleChanges}
                                value={cliente.compania}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                type={"number"}
                                fullWidth
                                id="latitud"
                                label="Latitud"
                                name="latitud"
                                value={cliente.latitud}
                                onChange={handleChanges}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                type={"number"}
                                fullWidth
                                name="password"
                                label="Longitud"
                                id="longitud"
                                value={cliente.longitud}
                                onChange={handleChanges}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete  options={tipoMinas} getOptionLabel={option => option.nombre} onChange={handleChangeAutoComplete('tipoMina')}
                                          renderInput={params => (<TextField {...params} label={"Tipo de Mina"} variant={"outlined"} fullWidth />)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete  options={regiones} getOptionLabel={option => option.nombre} onChange={handleChangeAutoComplete('region')}
                                          renderInput={params => (<TextField id={"region"} {...params} label={"Region"} variant={'outlined'} fullWidth />)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel name={"tieneContrato"} onChange={handleChanges} defaultValue={false}
                                control={<Checkbox  color="primary" checked={cliente.tieneContrato}
                                />}
                                label="Contrato"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        type={"submit"}
                        color="primary"
                        style={{ backgroundColor:'#f47b20'}}
                        startIcon={<SaveIcon/>}
                        disabled={disable}
                    >
                        Guardar
                    </Button>

                </form>
            </div>

        </Container>
    );

}