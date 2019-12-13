import React, {useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from 'mui-datatables';
import InformacionNeumatico from "./InformacionNeumatico";
import Modal from 'react-responsive-modal';
import '../../styles/Recepcion.css';
import useStyle from "../../styles/Recepcion";
import Button from "@material-ui/core/Button";
import PhotoIcon from '@material-ui/icons/Photo';
import {obtenerNeumaticos} from '../../services/ingreso';
import {useSnackbar} from "notistack";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Checkbox from "@material-ui/core/Checkbox";

const URI = 'http://localhost:3001/';


export default function Recepcion(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [neumatico, setNeumatico] = React.useState({
        rtd: 0,
        hrsOperacion: 0,
        kmsOperacion: 0,
        marca: '',
        medida: '',
        modelo: ''

    });

    const [ingresos,setIngresos] = React.useState([]);
    const [openImage,setOpenImage] = React.useState(false);
    const [pathImage,setPathImage] = React.useState('');
    useEffect(()=>{
        obtenerNeumaticos()
            .then(resp=> {
                setIngresos(resp.data);})
            .catch(err => enqueueSnackbar(err.message,{variant:"error"}) )
    },[]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const options = {
        filter: true,
        responsive: 'scroll',
        onRowClick: data => {handleOpen()},
        searchOpen:true,
    };


    const classes = useStyle();


    const columns = [{
        name: "neumaticosserie",
        label: "Serie",
    }, {
        name: 'faena',
        label: 'Cliente'
    }, {
        name: 'guia_despacho',
        label: 'Guía de Despacho'
    }, {
        name: 'patente_camion',
        label: 'Patente Camión'
    }, {
        name: 'guia_kt',
        label: 'Guia Kal Tire',
        options:{
            empty: true,
            customBodyRender: (value,tableMeta,updateValue) =>{
                return (<Checkbox
                    disabled
                    checked ={Boolean(value)}
                    inputProps={{
                        'aria-label': 'disabled checked checkbox',
                    }}
                />)
            }
        }
    }, {
        name: 'fecha',
        label: 'Fecha',
        options:{
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (new Date(Date.parse(value))).toLocaleDateString();
            }
        }
    }, {
        name: 'comentario',
        label: 'Comentarios'
    },
        {
            name: "ruta_foto",
            label:'Fotografia',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) =>{
                    console.log(value);
                   return (<Button
                        variant="contained"
                        onClick={e =>{
                            e.stopPropagation();
                            setPathImage(value);
                            setOpenImage(true);
                            console.log('Clicked me')
                        }
                        }
                        endIcon={<PhotoIcon/>}
                    >
                        Ver
                    </Button>)}
                }

        }];


    return (

        <React.Fragment>
            <CssBaseline/>
            <main className={classes.layout} style={{margin: '15px'}}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5" align="center" style={{paddingTop: '15px'}}>
                        Recepción de Neumaticos
                    </Typography>
                    <hr style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}/>
                    <MUIDataTable data={ingresos} columns={columns}  options={options} />
                    <hr style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}/>


                </Paper>
            </main>

            {openImage? <Lightbox mainSrc={URI +'images/'+ pathImage} onCloseRequest={() => setOpenImage(false)}/>:null}

            <Modal onClose={handleClose} open={open} center focusTrapped={false}>
                <InformacionNeumatico/>

            </Modal>


        </React.Fragment>


    );
}