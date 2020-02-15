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
import LoadingComponent from "../utils/LoadingComponent";
import {ingresarRecepcion, neumaticoEnToms, default as recepcion} from "../../services/recepcion";
import {format} from "date-fns";
import {action} from "../utils/ProcessNotification";

const URI = process.env.REACT_APP_API_URL;

const initialStateInfoNeumatico = {
    kmsOperacion: 0,
    hrsOperacion: 0,
    rtd: 0,
    marca: '',
    medida: '',
    modelo: '',
    compuesto:''
};

export default function Recepcion(props) {
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();

    const [ingresos,setIngresos] = React.useState([]);
    const [openImage,setOpenImage] = React.useState(false);
    const [pathImage,setPathImage] = React.useState('');
    const [isLoading,setIsLoading] = React.useState(true);
    const [infoNeumatico,setInfoNeumatico] = React.useState({});
    const [neumaticoEncontrado,setNeumaticoEncontrado] = React.useState(false);

    useEffect(()=>{
        obtenerNeumaticos()
            .then(resp=> {
                setIsLoading(false);
                setIngresos(resp.data);})
            .catch(err => enqueueSnackbar(err.message,{variant:"error"}) )
    },[]);

    const [open, setOpen] = React.useState(false);
    const [ingreso,setIngreso] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isInToms = data =>{
        const key = enqueueSnackbar('Procesando...', {variant: "info", persist: true, action: action});

        neumaticoEnToms(data[1]).then(res => {
            if (res.data.length === 0)
                throw new Error('Neumatico no encontrado en TOMS');

            const tire = res.data[0];
            setNeumaticoEncontrado(true);

            initialStateInfoNeumatico.hrsOperacion = tire.hours;
            initialStateInfoNeumatico.kmsOperacion = tire.distance;
            initialStateInfoNeumatico.marca = tire.manufactureCode;
            initialStateInfoNeumatico.medida = tire.size;
            initialStateInfoNeumatico.rtd = tire.rtdAverage;
            initialStateInfoNeumatico.modelo = tire.pattern;
            initialStateInfoNeumatico.compuesto = tire.compound;
            initialStateInfoNeumatico.numeroCatalogo = tire.nCatalogue;

            setInfoNeumatico(initialStateInfoNeumatico);

        })
            .catch(err =>{
                enqueueSnackbar(err.response? err.response.data.error.message:err.message,{variant:"error"});
                setNeumaticoEncontrado(false);
                setInfoNeumatico(undefined);
            }).finally(()=>{
            closeSnackbar(key);
            setIngreso(data);
            handleOpen();
        })







    };


    const options = {
        filter: true,
        onRowClick: isInToms,
        searchOpen:false,
        responsive: 'scrollMaxHeight',
        fixedHeaderOptions: {
            xAxis: false,
            yAxis:true
        }
    };


    const classes = useStyle();


    const columns = [{
        name:'id',
        options:{
            display:false
        }
    },{
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
            customBodyRender: (value, tableMeta, KQOOSIupdateValue) => {
                return format(Date.parse(value),'yyyy-MM-dd');
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
                    {isLoading && <LoadingComponent/>}
                    <Typography component="h1" variant="h5" align="center" style={{paddingTop: '15px'}}>
                        Recepción de Neumaticos
                    </Typography>
                    <hr style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}/>
                    <MUIDataTable data={ingresos} columns={columns}  options={options} title = {"Neumáticos Ingresados"} />
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
                <InformacionNeumatico ingresos = {{ingresos,setIngresos}} openModal = {setOpen}
                                      ingreso = {ingreso} infoNeumatico = {infoNeumatico} neumaticoEncontrado = {neumaticoEncontrado} />

            </Modal>


        </React.Fragment>


    );
}