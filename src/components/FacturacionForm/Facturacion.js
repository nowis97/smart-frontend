import React, {useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from 'mui-datatables';
import {TableHead} from 'mui-datatables';
import Modal from 'react-responsive-modal';
import '../../styles/Recepcion.css';
import useStyle from "../../styles/Recepcion";
import Button from "@material-ui/core/Button";
import PhotoIcon from '@material-ui/icons/Photo';
import {useSnackbar} from "notistack";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {InformacionFacturacion} from "./InformacionFacturacion";
import * as despachoService from './../../services/despacho';
import Checkbox from "@material-ui/core/Checkbox";
import LoadingComponent from "../utils/LoadingComponent";
import {TextField} from "@material-ui/core";
import {format} from 'date-fns';


const URI = process.env.REACT_APP_API_URL;


export default function Facturacion(props) {
    const {enqueueSnackbar} = useSnackbar();

    const [despachados,setDespachados] = React.useState([]);
    const [openImage,setOpenImage] = React.useState(false);
    const [pathImage,setPathImage] = React.useState('');
    const [isLoading,setIsLoading] = React.useState(true);

    useEffect(()=>{
        despachoService.obtenerDespachados().then(
            res => {
                setIsLoading(false);
                setDespachados(res.data);

            }
        ).catch(
            err => enqueueSnackbar(err.message,{variant:"error"})
        )
    },[]);

    const [open, setOpen] = React.useState(false);
    const [despachado,setDespachado] = React.useState({});
    const [ultimaFactura,setUltimaFactura] = React.useState(undefined);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const options = {
        filter: true,
        onRowClick: data => {handleOpen(); console.log(data); setDespachado(data)},
        searchOpen:false,
        responsive: 'scrollMaxHeight',
        fixedHeaderOptions: {
            xAxis: false,
            yAxis:true
        }
    };


    const classes = useStyle();


    const columns = [   {
        name: "serie",
        label: "Serie",
    }, {
        name: 'faena',
        label: 'Cliente'
    }, {
        name: 'guia_despacho',
        label: 'Guia de Despacho'
    }, {
        name: 'garantia',
        label: 'Garantia',
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
            },
        }
    }, {
        name: 'patente_camion',
        label: 'Patente Camión',
    }, {
        name: 'fecha',
        label: 'Fecha Despachado',
        options:{
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (format(Date.parse(value),'yyyy-MM-dd'));
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
                        }
                        }
                        endIcon={<PhotoIcon/>}
                    >
                        Ver
                    </Button>)},

            }

        }];


    return (

        <React.Fragment>
            <CssBaseline/>
            <main className={classes.layout} style={{margin: '15px'}}>
                <Paper className={classes.paper}>
                    {isLoading && <LoadingComponent/>}
                    <Typography component="h1" variant="h5" align="center" style={{paddingTop: '15px'}}>
                        Facturación de Neumaticos
                    </Typography>

                    <hr style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}/>
                    <MUIDataTable data={despachados} columns={columns}  options={options} title={"Neumaticos Despachados"} />
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
                <InformacionFacturacion openModal = {setOpen} ultimaFactura = {{ultimaFactura,setUltimaFactura}}
                                        despachado = {{despachado,setDespachado}} despachados = {{despachados,setDespachados}} />

            </Modal>


        </React.Fragment>


    );
}