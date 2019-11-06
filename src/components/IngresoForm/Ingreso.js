import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import {Checkbox, FormControlLabel, InputAdornment, InputLabel} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import * as yup from 'yup';
import useYup from "@usereact/use-yup/lib";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import './Ingreso.css';
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        flexGrow: 1
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },


    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        userSelect:'none',
        unselectable:"on",
        webkitUserSelect: 'none',
    }
}));

const validationSchema = yup.object().shape({
    serie: yup.string().min(3).max(13).required("Campo requerido")
});

export default function (props) {
    const classes = useStyles();
    const clearSerie = (e) => {
        console.log(e.currentTarget.id);
        let serie = '';
        setIngreso({...ingreso, serie});
    };

    const [ingreso, setIngreso] = React.useState({
        serie: '',
        reSerie: '',
        cliente: '',
        guiaDespacho: '',
        guiaKaltire: false,
        patenteCamion: '',
        fechaRecepcion: null,
        comentarios: '',
        fotoNeumatico: []
    });

    const {errors} = useYup(ingreso, validationSchema, {validateOnChange: true});

    const handleChange = e => {
        if (e instanceof Date){
            setIngreso(prevState => ({
                ...prevState,
                fechaRecepcion:e
            }));
            return;
        }
        const {id, value} = e.currentTarget;
        setIngreso(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    return (<React.Fragment>
        <CssBaseline/>

        <main className={classes.layout} style={{margin: '15px'}}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="center" style={{paddingTop: '15px'}}>
                Ingreso de Neumaticos
            </Typography>
            <hr style={{marginTop: '1rem', marginBottom: '1rem', border: 0, borderTop: '1px solid rgba(0,0,0,0.1)'}}/>
            <Grid container spacing={2} direction={"row"} justify={"space-around"} className={classes.root}
                  style={{padding: '15px'}}>
                <Grid item xs={9} sm={3} >
                    <TextField id={"serie"} name={"Serie"} label={"Serie"} fullWidth className={classes.textField}
                               margin={"normal"}
                               inputProps={{onPaste:event => {event.preventDefault(); return false}}}
                               error={Boolean(errors.serie)} helperText={errors.serie ? errors.serie : ""}
                               onChange={handleChange} value={ingreso.serie}
                               InputProps={
                                   {
                                       endAdornment: <InputAdornment position={"end"}>
                                                        <IconButton aria-label={"clear"} onClick={clearSerie} id={"serie"}> <ClearIcon/>
                                                        </IconButton>
                                                    </InputAdornment>,
                                   }

                               }/>
                </Grid>
                <Grid item xs={9} sm={3}>
                    <TextField id={"_serie"} label={"Reingrese Serie"} fullWidth className={classes.textField} margin={"normal"}
                               error={Boolean(errors.serie)} helperText={errors.serie ? errors.serie : ""}
                               onChange={handleChange} value={ingreso.Reserie}
                               inputProps={{onPaste:event => {event.preventDefault(); return false}}}
                               InputProps={{
                        endAdornment: <InputAdornment position={"end"}>
                            <IconButton aria-label={"clear"} onClick={clearSerie} id={"_serie"}> <ClearIcon/> </IconButton>
                        </InputAdornment>
                    }}/>
                </Grid>
                <Grid item xs={9} sm={3} spacing={3} style={{marginTop:'15px'}}  >
                    <FormControl  >
                        <InputLabel > Cliente </InputLabel>
                        <NativeSelect value={""}>
                            <option value=""/>
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>

                <Grid container spacing={2} direction={"row"} justify={"space-between"} className={classes.root}
                      style={{padding: '15px'}}>
                    <Grid item xs={9} sm={3}>
                        <TextField id={"guia_despacho"} label={"Guia de despacho"} className={classes.textField}
                                   margin={"normal"} value={ingreso.guia_despacho}
                                   error={Boolean(errors.guia_despacho)}
                                   helperText={errors.guia_despacho ? errors.guia_despacho : ""}
                                   onChange={handleChange}/>

                        <FormControlLabel onChange={handleChange}
                                          control={<Checkbox checked={ingreso.guia_kt} value={'guia_kt'}/>}
                                          label={"Kal Tire"}/>
                    </Grid>
                    <Grid item xs={9} sm={3}>
                        <TextField id={"patente_camion"} label={"Patente de Camión"} className={classes.textField}
                                   margin={"normal"} value={ingreso.patente_camion}
                                   error={Boolean(errors.patente_camion)}
                                   helperText={errors.patente_camion ? errors.patente_camion : ""}
                                   onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={9} sm={3} style={{marginTop: '22px'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker id={"fechaRecepcion"} label={"Fecha de Recepción"} format={"dd/MM/yyyy"}
                                                KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                onChange={handleChange} value={ingreso.fechaRecepcion}/>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={9} sm={3} style={{marginTop: '22px'}}>
                        <TextField id={"comentario"} label={"Comentarios"} name={"Comentarios"} onFocus={(e) => console.log()}
                                   className={classes.textField} margin={"normal"} multiline rows={2}
                                   rowsMax={4}> </TextField>
                    </Grid>


                </Grid>

            </Grid>
            </Paper>
        </main>

    </React.Fragment>)

}