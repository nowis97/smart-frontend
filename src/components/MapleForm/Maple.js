import {useSnackbar} from "notistack";
import React, {Fragment, useEffect, useState} from "react";
import {getMaple} from "../../services/maple";
import Checkbox from "@material-ui/core/Checkbox";
import {CssBaseline} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import LoadingComponent from "../utils/LoadingComponent";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import useStyle from "../../styles/Recepcion";
import {format} from "date-fns";
import Modal from 'react-responsive-modal';
import InformacionMaple from "./InformacionMaple";
export default function Maple(props){
    const {enqueueSnackbar}=useSnackbar();
    const [isLoading,setIsLoading] = useState(false);
    const [facturadosRenovados,setFacturadosRenovados] = useState([]);
    const [facturadoRenovado, setFacturadoRenovado] = useState({});
    const [open, setOpen] = React.useState(false);
    const [mapleAnterior,setMapleAnterior] = useState({});

    const classes = useStyle();

    useEffect(() =>{
        getMaple().then(res => {
            setFacturadosRenovados(res.data)
            setIsLoading(true)
        }).catch(err =>{
            enqueueSnackbar(err.message,{variant:"error"})
        }).finally(() =>{
            setIsLoading(false);
        })
    },[]);

    const handleOpen =() =>{
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };


    const options = {
        filter: true,
        onRowClick: data => {handleOpen(); console.log(data); setFacturadoRenovado(data)},
        searchOpen:false,
        responsive: 'scrollMaxHeight',
        fixedHeaderOptions: {
            xAxis: false,
            yAxis:true
        }
    };

    const columns =[
        {
            name: 'serie',
            label:'Serie',

        },
        {
            name: 'faena',
            label: 'Cliente'
        },
        {
            name: 'tiene_contrato',
            label: 'Contrato',
            options:{
                empty:true,
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
        },
        {
            name: 'numero_factura',
            label: '# Factura'
        },
        {
            name: 'fecha',
            label: 'Fecha de facturación',
            options:{
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (format(Date.parse(value),'yyyy-MM-dd'));
                }
            }
        }

    ];

    return <Fragment>
        <CssBaseline/>
        <main className={classes.layout} style={{margin: '15px'}}>
            <Paper className={classes.paper}>
                {isLoading && <LoadingComponent/>}
                <Typography component="h1" variant="h5" align="center" style={{paddingTop: '15px'}}>
                    NFU de Neumaticos renovados
                </Typography>

                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>
                <MUIDataTable data={facturadosRenovados} columns={columns} options={options} title={"Neumáticos facturados"}  />
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>


            </Paper>
        </main>
        <Modal onClose={handleClose} open={open} focusTrapped={false} center>
            <InformacionMaple openModal={setOpen} ultimaMaple={{mapleAnterior,setMapleAnterior}}
                              facturado={{facturadoRenovado,setFacturadoRenovado}} facturados={{facturadosRenovados,setFacturadosRenovados}}
            />
        </Modal>
    </Fragment>


}