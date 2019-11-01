import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import InformacionNeumatico from "./InformacionNeumatico";
import getThemeProps from '@material-ui/styles/getThemeProps';
import './Recepcion.css'
import InformacionRecepcion from "./InformacionRecepcion";
import Revision from "./Revision";
const useStyle = () => makeStyles(theme => ({

    layout: {

        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },


    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        alignContent:'center',

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom:theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
        paddingBottom: theme.spacing(2)
    },

}));

export const FormRecepcionContext = React.createContext();


const steps = ['Información Neumático', 'Información Recepción', 'Revisión'];

const getStepContent =  (step) => {
    switch (step) {
        case 0:
            return <InformacionNeumatico/>;
        case 1:
            return  <InformacionRecepcion/>;
        case 2:
            return <Revision/>;
    }
};

export default function Recepcion (props) {
    const muiTheme = getThemeProps({
        stepper: {
            iconColor: 'green' // or logic to change color
        }
    });
    const [neumatico, setNeumatico] = React.useState({
        serie:'',
        rtd:0,
        hrs_operacion:0,
        kms_operacion:0,
        marca: '',
        medida:'',
        modelo:''

    });

    const [recepcion,setRecepcion] = React.useState({
        cliente: '',
        causa_recepcion:'',
        guia_despecho:'',
        patente_camion:'',
        guia_kt:false,
        fecha:null
    });


    const classes = useStyle();
    const [activeStep, setActiveStep ] = React.useState(0);

    const handleNext = () => {
      setActiveStep(activeStep+1);
    };
    const handleBack = () => {
        setActiveStep(activeStep-1);
    };


    return (
        <React.Fragment>
            <CssBaseline />
            <FormRecepcionContext.Provider value = {[neumatico,setNeumatico,recepcion,setRecepcion]}>
            <main className={classes.layout} style={{margin:'15px'}}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5" align="center" style={{paddingTop:'15px'}}>
                        Recepción de Neumaticos
                    </Typography>
                    <hr style={{marginTop:'1rem',marginBottom:'1rem',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>
                    <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel orientation={"horizontal"} style={{padding:'5px', marginTop:'20px'}}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
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
                                {getStepContent(activeStep)}
                                <div className={classes.buttons} >
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack}  className={classes.button} style={{marginBottom:'15px'}}
                                        >
                                            Atrás
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        style={{marginBottom:'15px', backgroundColor:'#f47b20'}}

                                    >
                                        {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>

                </Paper>

            </main>
            </FormRecepcionContext.Provider>


        </React.Fragment>
    );
}