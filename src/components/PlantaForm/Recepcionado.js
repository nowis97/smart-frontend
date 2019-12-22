import React, {useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from 'mui-datatables';
import Recepcion from "../RecepcionForm/Recepcion";
import Modal from 'react-responsive-modal';
import '../../styles/Recepcion.css';
import useStyle from "../../styles/Recepcion";
import Button from "@material-ui/core/Button";
import PhotoIcon from '@material-ui/icons/Photo';
import {obtenerRecepcionados} from '../../services/recepcion';
import {useSnackbar} from "notistack";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Planta from "./Planta";
import LoadingComponent from "../utils/LoadingComponent";

const URI = process.env.REACT_APP_API_URL;


export default function Recepcionado(props) {
    const {enqueueSnackbar} = useSnackbar();

    const [recepcionados,setRecepcionados] = React.useState([]);
    const [openImage,setOpenImage] = React.useState(false);
    const [pathImage,setPathImage] = React.useState('');
    const [isLoading,setIsLoading] = React.useState(true);
    useEffect(()=>{
        obtenerRecepcionados()
            .then(resp=> {
                setRecepcionados(resp.data);
                setIsLoading(false);
            })
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
        onRowClick: data => {handleOpen(); console.log(data);},
        searchOpen:true,
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
        name: "serie",
        label: "Serie",
    }, {
        name: 'faena',
        label: 'Cliente'
    }, {
        name: 'guia_despacho',
        label: 'Guía de Despacho'
    }, {
        name: 'kms_operacion',
        label: 'Kms de Operación'
    }, {
        name: 'hrs_operacion',
        label: 'Hrs de Operación',
    },{
        name:'rtd',
        label:'RTD'
    }, {
        name: 'fecha',
        label: 'Fecha',
        options:{
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (new Date(Date.parse(value))).toLocaleDateString();
            }
        }
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
                        Planta
                    </Typography>
                    <hr style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}/>
                    <MUIDataTable data={recepcionados} columns={columns}  options={options} />
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
                <Planta/>
            </Modal>


        </React.Fragment>


    );
}