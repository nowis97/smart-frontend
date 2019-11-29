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
export default function Cliente (props) {

    let {regiones,tipoMinas} = React.useContext(ResourceContext);

    const handleSubmit = event =>{
      event.preventDefault();
      console.log(event.target.compania.value);
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
                                id="nombreFaena"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="compania"
                                label="Compañia"

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="latitud"
                                label="Latitud"
                                name="latitud"

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"

                                fullWidth
                                name="password"
                                label="Longitud"
                                id="longitud"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete id={'tipoMina'} options={tipoMinas} getOptionLabel={option => option.nombre}
                                          renderInput={params => (<TextField {...params} label={"Tipo de Mina"} variant={"outlined"} fullWidth />)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete id={'region'} options={regiones} getOptionLabel={option => option.nombre}
                                          renderInput={params => (<TextField {...params} label={"Region"} variant={'outlined'} fullWidth />)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
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
                    >
                        Guardar
                    </Button>

                </form>
            </div>

        </Container>
    );

}