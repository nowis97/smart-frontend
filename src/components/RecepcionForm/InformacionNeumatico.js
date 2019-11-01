
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import NativeSelect from "@material-ui/core/NativeSelect";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import {Icon, InputAdornment, InputLabel} from "@material-ui/core";
import useYup from "@usereact/use-yup";
import * as yup from 'yup'
import {FormRecepcionContext} from "./Recepcion";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
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
    serie: yup.string().min(3).max(13).required(),
    rtd: yup.number().min(1).max(300).required(),
    hrs_operacion: yup.number().min(0).max(20000).notRequired(),
    kms_operacion: yup.number().min(0).max(20000).notRequired()
});

export default function InformacionNeumatico(props) {
    const [neumatico,setNeumatico] = React.useContext(FormRecepcionContext);
    const handleChange = e => {
        const {id ,value } = e.currentTarget;
        setNeumatico(prevState => ({
            ...prevState,
            [id]:value
        }))
    };
    const { errors } = useYup(neumatico, validationSchema, {
        validateOnChange: true
    });

    const clearSerie = () => {
        let serie = ''
        setNeumatico({...neumatico,serie});
    };

    const _classes = useStyles();

    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>*/}
            <Grid container spacing={3} direction={"row"} justify={"space-between"} className={_classes.root} style={{padding:'15px'}}>
                <Grid item xs={6} sm={3} >
                    <FormControl fullWidth >
                        <InputLabel > Marca </InputLabel>
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
                        <InputLabel > Medida </InputLabel>
                        <NativeSelect value={""} >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs = {6} sm = {3}>
                    <FormControl fullWidth >
                        <InputLabel > Modelo </InputLabel>
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
                        <TextField id = {"serie"} label={"Serie"} className={_classes.textField} margin={"normal"}
                                   error={Boolean(errors.serie)} helperText={errors.serie? errors.serie : ""}
                                   onChange={handleChange} value={neumatico.serie} InputProps={{endAdornment: <InputAdornment position={"end"} >
                                <IconButton aria-label={"clear"} onClick={clearSerie}> <ClearIcon/> </IconButton>
                            </InputAdornment>}} />
                    </Grid>
                    <Grid item xs={9} sm={3}>
                        <TextField id = {"rtd"} label={"RTD"} className={_classes.textField} margin={"normal"}
                                   error={Boolean(errors.rtd)} helperText={errors.rtd? errors.rtd:""} onChange={handleChange} value={neumatico.rtd}/>
                    </Grid>
                    <Grid item xs={9} sm={3}>
                        <TextField id = {"hrs_operacion"} label={"Horas de Operación"} className={_classes.textField} margin={"normal"}
                       error={Boolean(errors.hrs_operacion)} helperText={errors.hrs_operacion? errors.hrs_operacion: ""} onChange={handleChange} value={neumatico.hrs_operacion} />
                    </Grid>
                    <Grid item xs={9} sm={3}>
                        <TextField id = {"kms_operacion"} label={"Kms de Operación"} className={_classes.textField} margin={"normal"}
                        error={Boolean(errors.kms_operacion)} helperText={errors.kms_operacion? errors.kms_operacion:""} onChange={handleChange} value={neumatico.kms_operacion} />
                    </Grid>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}