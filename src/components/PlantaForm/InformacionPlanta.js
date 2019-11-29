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


export function InformacionPlanta(props) {
    const {state, dispatch} = React.useContext(PlantaContext);

    const infoPlanta = state.initialStatePlanta;

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




    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>*/}
            <Container>
            <Grid container item style={{padding: '7px', margin: '13px'}} alignContent={"center"}>
                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'planta'} style={{marginTop:'13px'}}
                                  renderInput={params => (<TextField {...params} label={"Planta"} style={{width:'200px'}}
                                                                     value={infoPlanta.planta} />)}/>
                </Grid>
                {/*<Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"precio"} label={"Precio"}
                               margin={"normal"}
                               value={infoPlanta.precio}
                               onChange={handleChange}/>
                </Grid>*/}

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"ordenTrabajo"} label={"Orden de Trabajo"}
                               margin={"normal"}
                               value={infoPlanta.ordenTrabajo}
                               onChange={handleChange}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <TextField id={"codigoBaja"} label={"Codigo de Baja"}
                               margin={"normal"}
                               value={infoPlanta.codigoBaja}
                               onChange={handleChange}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={4} xl={3} md={3}>
                    <Autocomplete id={'condicionFinal'} style={{marginTop:'17px'}} value={infoPlanta.condicionFinal} renderInput={params => (
                        <TextField {...params} label={"Condicion Final"} style={{width:'200px'}} />)}/>

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
                                            style = {{marginTop:'13px'}}
                                            value={infoPlanta.mesProduccion}
                                            KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                            onChange={(e) => handleChangeDates(e, 'fechaControlCalidad')}/>
                    </MuiPickersUtilsProvider>}
                </Grid>

            </Grid>
            </Container>
        </React.Fragment>);


}