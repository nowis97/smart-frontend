import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import '../../styles/Planta.css'
import {InformacionPlanta} from "./InformacionPlanta";
import Procesos from "./Procesos";
import plantaReducer from "../../reducers/PlantaReducer";
import Revision from "./Revision";
import Confirmacion from "../utils/Confirmacion";
import SaveIcon from '@material-ui/icons/Save';
import useStyle from "../../styles/Planta";
import DialogActions from "@material-ui/core/DialogActions";
import Container from "@material-ui/core/Container";


const initialStateForms = {
    reparacion: false,
    renovado:false,
    preventiva:false,
    correctiva:false,
    kalUltra:false

};

const initialStatePlanta={
    planta:'',
    mesProduccion:(new Date(Date.now())) ,
    ordenTrabajo: '',
    codigoBaja:'',
    condicionFinal:''

};
const initialStateReparaciones = {
    preventiva:{
        bandaRodado_111:0,
        bandaLateral_112:0,
        hombro_113:0,
        talon_116:0,
        butilo_118:0

    },
    reparacionCorrectiva:{
        bandaRodado_121:0,
        bandaLateral_122:0,
        hombro_123:0,
        talon_126:0
    },

    reparacionKalUltra:{
        bandaRodado_131:0,
        bandaLateral_132:0,
        hombro_133:0
    },
    garantia:false

};

const initialStateRenovados = {
    tipoRenovado:'',
    codigoCauchoBase:'',
    cauchoUtilizado:'',
    otdRenovado:'',
    pesoCarcasa:'',
    cauchoBanda1:'',
    cauchoBanda2:''

};

export const PlantaContext = React.createContext({});


const steps = ['Información Planta', 'Procesos'];

const getStepContent =  (step) => {
    switch (step) {
        case 0:
            return <InformacionPlanta/>;
        case 1:
            return  <Procesos/>;
        case 2:
            return <Revision/>;
    }
};


export default function Planta(props) {
    const [state,dispatch] =React.useReducer(plantaReducer,{initialStatePlanta,initialStateReparaciones,initialStateRenovados,initialStateForms});
    const classes = useStyle();
    const [activeStep, setActiveStep ] = React.useState(0);

    const [openDialog,setOpenDialog] = React.useState(false);

    const handleNext = () => {

        setActiveStep(activeStep+1);


    };
    const handleBack = () => {
        setActiveStep(activeStep-1);
    };

    const handleGuardar = () =>{
        setOpenDialog(true);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleNext();

    };


    return (
        <React.Fragment>
            <CssBaseline />
            <PlantaContext.Provider value ={{state,dispatch}}>
                <Container component={'main'}>
                        <Typography variant="h6" gutterBottom >
                            Planta
                        </Typography>
                        <hr style={{marginTop:'1rem',marginBottom:'1rem',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>
                        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel orientation={"horizontal"} style={{padding:'5px', marginTop:'20px'}} >
                            {steps.map(label => (
                                <Step  key={label}>
                                    <StepLabel  >{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <hr style={{marginTop:'1rem',marginBottom:'1rem',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>

                        <React.Fragment >
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #2001539. We have emailed your order confirmation, and will
                                        send you an update when your order has shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <form onSubmit={handleSubmit}>
                                    {getStepContent(activeStep)}
                                    <DialogActions>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack}  className={classes.button} style={{marginBottom:'15px'}}
                                            >
                                                Atrás
                                            </Button>
                                        )}
                                        {activeStep!==steps.length-1?
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type={"submit"}
                                                className={classes.button}
                                                style={{marginBottom: '15px', backgroundColor: '#f47b20'}}

                                            >
                                                Siguiente

                                            </Button>
                                            :
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleGuardar}
                                            className={classes.button}
                                            style={{marginBottom:'15px', backgroundColor:'#f47b20'}}
                                            startIcon={<SaveIcon/>}
                                            >
                                            Guardar
                                            </Button>
                                        }
                                    </DialogActions>
                                    </form>

                                </React.Fragment>
                            )}
                        </React.Fragment>
                </Container>

            </PlantaContext.Provider>
            {/*openDialog? <Confirmacion title = "Planta" message ="¿Desea guardar?" fnFalse = {() =>{}} />:null*/}
            <Confirmacion state = {{openDialog,setOpenDialog}} title = "Planta" message ="¿Desea guardar?" fnFalse = {() =>{}} />
        </React.Fragment>
    );
}
