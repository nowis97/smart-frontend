import Grid from "@material-ui/core/Grid";
import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";

import makeStyles from "@material-ui/core/styles/makeStyles";
import useYup from "@usereact/use-yup/lib";
import {PlantaContext} from "./Planta";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Container} from "@material-ui/core";
import {ResourceContext} from "../utils/ResourceContext";


export function InformacionPlanta(props) {
    const {state, dispatch} = React.useContext(PlantaContext);
    const {plantas,codigosBajas,condicionFinal} = React.useContext(ResourceContext);

    const infoPlanta = state.initialStatePlanta;
    console.log(condicionFinal);
    const handleChange = e => {
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

    const handleChangeAutocomplete =id => (e,value) =>{

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
                    <Autocomplete id={'planta'} style={{transform: 'translateY(16px)'}} options={plantas} getOptionLabel={option => option.nombre} onChange={handleChangeAutocomplete('planta') }
                                  inputValue={getTextValue(plantas,infoPlanta.planta)? getTextValue(plantas,infoPlanta.planta).nombre:''}
                                  renderInput={params => (<TextField fullWidth {...params} required label={"Planta"}
                                                                     value={infoPlanta.planta} />)}/>
                </Grid>
                {/*<Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"precio"} label={"Precio"}
                               margin={"normal"}
                               value={infoPlanta.precio}
                               onChange={handleChange}/>
                </Grid>*/}

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"ordenTrabajo"} label={"Orden de Trabajo"} fullWidth
                               margin={"normal"}
                               required
                               value={infoPlanta.ordenTrabajo}
                               onChange={handleChange}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'codigoBaja'} style={{transform: 'translateY(16px)'}} options={codigosBajas} getOptionLabel={option => option.code} inputValue={infoPlanta.codigoBaja}
                                  onChange={handleChangeAutocomplete('codigoBaja')}
                                  renderInput={params => (<TextField fullWidth {...params} label={"Codigo de Baja"} required
                                                                     value={infoPlanta.codigoBaja} />)}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'condicionFinal'} style={{marginTop:'17px'}}  options={condicionFinal} getOptionLabel={option => option.nombre}
                                  inputValue={getTextValue(condicionFinal,infoPlanta.condicionFinal)? getTextValue(condicionFinal,infoPlanta.condicionFinal).nombre:''}
                                  onChange={handleChangeAutocomplete('condicionFinal')} renderInput={params => (
                        <TextField fullWidth {...params} label={"Condicion Final"} required value={infoPlanta.condicionFinal} />)}/>

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
                        <KeyboardDatePicker id={"mesProduccion"} label={"Fecha de Producción"}
                                            format={"dd/MM/yyyy"}
                                            style = {{marginTop:'15px'}}
                                            value={infoPlanta.mesProduccion}
                                            KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                            onChange={(e) => handleChangeDates(e, 'mesProduccion')}/>
                    </MuiPickersUtilsProvider>}
                </Grid>

            </Grid>
            </Container>
        </React.Fragment>);


}