import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import {validationSchema} from '../../validators/InformacionPlanta';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useYup from "@usereact/use-yup/lib";
import {PlantaContext} from "./Planta";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Container} from "@material-ui/core";
import ResourceProvider, {ResourceContext} from "../utils/ResourceContext";
import {addDays} from 'date-fns';


export function InformacionPlanta(props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    const {plantas,condicionFinal} = React.useContext(ResourceContext);


    const infoPlanta = state.initialStatePlanta;
    let {errors,isValid} = useYup(infoPlanta,validationSchema,{validateOnChange:true});

    const handleChange = e => {
        e.preventDefault();

        dispatch({
            type: 'HANDLE_PLANTA',
            payload: e.currentTarget
        });

    };



    const handleChangeDates = (e, id) => {
        dispatch({
            type: 'HANDLE_PLANTA_FECHAS',
            payload: {e, id}
        })
    };

    useEffect(()=>{
        dispatch({
            type:'HANDLE_VALIDATOR',
            payload:{isValid}
        })
    },[isValid]);



    const handleChangeAutocomplete =id => (e,value) =>{
        debugger;

        dispatch({type:'HANDLE_PLANTA_AUTOCOMPLETE',payload:{id,value}})
    };

    const getTextValue =(array,id) => array.find(x => x.id === id);



    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>*/}
            <Container>
            <Grid container item alignContent={"center"} spacing={3}>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'planta'} style={{transform: 'translateY(16px)'}} options={plantas} getOptionLabel={option => option.nombre}
                                  onChange={handleChangeAutocomplete('planta') }
                                  inputValue={getTextValue(plantas,infoPlanta.planta)? getTextValue(plantas,infoPlanta.planta).nombre:''}
                                  value={infoPlanta.planta}
                                  renderInput={params => (<TextField fullWidth {...params} required label={"Planta"}/>)}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"hrsGarantia"} label={"Horas garantia"} margin={"normal"}
                               fullWidth
                               required
                               type={"number"}
                               error={Boolean(errors.hrsGarantia)}
                               helperText={errors.hrsGarantia?errors.hrsGarantia:''}
                               value={infoPlanta.hrsGarantia}

                               onChange={handleChange}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"ordenTrabajo"} label={"Orden de Trabajo"} fullWidth
                               margin={"normal"}
                               error={Boolean(errors.ordenTrabajo)} helperText={errors.ordenTrabajo ? errors.ordenTrabajo : ""}

                               required
                               value={infoPlanta.ordenTrabajo}
                               onChange={handleChange}/>
                </Grid>


                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'condicionFinal'} style={{marginTop:'14px'}}  options={condicionFinal} getOptionLabel={option => option.nombre}
                                  inputValue={getTextValue(condicionFinal,infoPlanta.condicionFinal)? getTextValue(condicionFinal,infoPlanta.condicionFinal).nombre:''}
                                  value={infoPlanta.condicionFinal}
                                  onChange={handleChangeAutocomplete('condicionFinal')} renderInput={params => (
                        <TextField fullWidth {...params} label={"Condicion Final"} required />)}/>

                </Grid>

                {/*<Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                        <KeyboardDatePicker id={"mesProduccion"} label={"Fecha de Producción"} format={"dd/MM/yyyy"}
                                            style = {{marginTop:'30px'}}
                                            value={infoPlanta.mesProduccion}
                                            KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                            onChange={(e) => handleChangeDates(e, 'mesProduccion')}/>
                    </MuiPickersUtilsProvider>
                </Grid>*/}

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    {<MuiPickersUtilsProvider utils={DateFnsUtils }>
                        <DatePicker id={"mesProduccion"} label={"Fecha de Producción"}
                                            format={"dd/MM/yyyy"}
                                            style = {{marginTop:'15px'}}
                                            value={infoPlanta.mesProduccion}
                                            minDate={addDays(new Date(props.fechaRecepcionado),1)}
                                            KeyboardButtonProps={{'aria-label': 'change-date'}}
                                            onChange={(e) => handleChangeDates(e, 'mesProduccion')}/>
                    </MuiPickersUtilsProvider>}
                </Grid>

            </Grid>
            </Container>
        </React.Fragment>);


}