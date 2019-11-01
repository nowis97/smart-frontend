
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import NativeSelect from "@material-ui/core/NativeSelect";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import {Checkbox, FormControlLabel, InputLabel} from "@material-ui/core";
import useYup from "@usereact/use-yup";
import * as yup from 'yup'
import {FormRecepcionContext} from "./Recepcion";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root:{
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

const validationSchema = yup.object().shape({
    guia_despacho: yup.number().positive().required(),
    patente_camion: yup.string().max(6).required(),
});

export default function InformacionRecepcion(props) {
    const [recepcion,setRecepcion] = React.useContext(FormRecepcionContext);
    const handleChange = e => {
        if (e instanceof Date){
            setRecepcion(prevState => ({
                ...prevState,
                fecha:e
            }));
            return;
        }
        const {id ,value } = e.currentTarget;

        setRecepcion(prevState => ({
            ...prevState,
            [id]:value
        }))
    };
    const { errors } = useYup(recepcion, validationSchema, {
        validateOnChange: true
    });


    const _classes = useStyles();

    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>*/}
            <Grid container spacing={2} direction={"row"} justify={"space-around"} className={_classes.root} style={{padding:'15px'}}>
                <Grid item xs={6} sm={3} >
                    <FormControl fullWidth >
                        <InputLabel > Cliente </InputLabel>
                        <NativeSelect value={""} >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <FormControl fullWidth >
                        <InputLabel  > Causa de Recepción </InputLabel>
                        <NativeSelect value={""} >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>


                <Grid container spacing={2} direction={"row"} justify={"space-between"} className={_classes.root} style={{padding:'15px'}}>
                    <Grid item xs={9} sm={3}>
                        <TextField id = {"guia_despacho"} label={"Guia de despacho"} className={_classes.textField} margin={"normal"} value={recepcion.guia_despacho}
                                   error={Boolean(errors.guia_despacho)} helperText={errors.guia_despacho? errors.guia_despacho : ""}
                                   onChange={handleChange} />

                        <FormControlLabel onChange={handleChange} control={<Checkbox checked={recepcion.guia_kt} value={'guia_kt'} />} label={"Kal Tire"} />
                    </Grid>
                    <Grid item xs={9} sm={3}>
                        <TextField id = {"patente_camion"} label={"Patente de Camión"} className={_classes.textField} margin={"normal"} value={recepcion.patente_camion}
                                   error={Boolean(errors.patente_camion)} helperText={errors.patente_camion? errors.patente_camion:""} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={9} sm={3} style={{marginTop:'22px'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                       <KeyboardDatePicker id={"fecha"} label={"Fecha de Recepción"} format ={"dd/MM/yyyy"} KeyboardButtonProps={{'aria-label':'change-date'}} showTodayButton onChange = {handleChange} value = {recepcion.fecha}  />
                        </MuiPickersUtilsProvider>
                    </Grid>


                </Grid>

            </Grid>
        </React.Fragment>
    );
}