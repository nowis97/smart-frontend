
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from 'mui-datatables';
import InformacionNeumatico from "./InformacionNeumatico";
import Modal from 'react-responsive-modal';
import '../../styles/Recepcion.css';
import useStyle from "../../styles/Recepcion";


const columns = ["Name", "Title", "Location", "Age", "Salary"];


const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    [
        "Blake Duncan",
        "Business Management Analyst",
        "San Diego",
        65,
        "$94,000"
    ],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    [
        "Addison Navarro",
        "Business Management Analyst",
        "New York",
        50,
        "$295,000"
    ],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    [
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        "$45,000"
    ],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
];





export default function Recepcion (props) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [neumatico, setNeumatico] = React.useState({
        serie:'',
        rtd:0,
        hrsOperacion:0,
        kmsOperacion:0,
        marca: '',
        medida:'',
        modelo:''

    });

    const options = {
        onRowClick  : data => handleOpen()
    };


    const classes = useStyle();


    /*<React.Fragment>
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


        </React.Fragment>*/

    return (

        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout} style={{margin:'15px'}}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5" align="center" style={{paddingTop:'15px'}}>
                        Recepción de Neumaticos
                    </Typography>
                    <hr style={{marginTop:'1rem',marginBottom:'1rem',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>
                    <MUIDataTable data={data} columns={columns} title={'Employee list'} options={options}/>
                    <hr style={{marginTop:'1rem',marginBottom:'1rem',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                </Paper>
            </main>


             <Modal onClose={handleClose} open={open} center focusTrapped={false}>
                <InformacionNeumatico/>

            </Modal>
        </React.Fragment>


    );
}