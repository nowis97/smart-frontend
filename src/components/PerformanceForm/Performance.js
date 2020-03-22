import {Container, DialogActions, Paper} from "@material-ui/core";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Confirmacion from "../utils/Confirmacion";
import useStyles from "../../styles/Ingreso";
import * as cliente from '../../services/cliente';
import SvgIcon from "@material-ui/core/SvgIcon";
import {validationSchema} from "../../validators/Reporte";
import useYup from "@usereact/use-yup/lib";
import {useSnackbar} from "notistack";
import * as serviceReporte from "../../services/reporte";
import {DepartureBoard} from "@material-ui/icons";
import * as FileSaver from 'file-saver'
import {InformacionDespacho} from "../DespachoForm/InformacionDespacho";
import Modal from "react-responsive-modal";
import InformacionPerformance from "./InformacionPerformance";

import * as performance from '../../services/performance';

export default function Performance() {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const [open, setOpen] = React.useState(false);

    const [neumaticos,setNeumaticos] = React.useState([]);

    const options = {
        filter: true,
        searchOpen:true,
        responsive: 'scrollMaxHeight',
        download:false,
        fixedHeaderOptions: {
            xAxis: true,
            yAxis:true
        }
    };

    const columns = [{
        name:'id',
        options:{
            display:false
        }
    },{
        name: "serie",
        label: "Serie",
    }, {
        name: 'rtdActual',
        label: 'RTD Actual'
    }, {
        name: 'kmsActual',
        label: 'Kms. Actual'
    }, {
        name: 'hrsActual',
        label: 'Hrs. Actual'
    },  {
        name: 'fechaUltimaInspeccion',
        label: 'Fecha',
        options:{
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (new Date(Date.parse(value))).toLocaleDateString();
            }
        }
    },{
        name: 'estadoActual',
        label: 'Estado Actual'
    }
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        performance.obtenerNeumaticos().then(res=> setNeumaticos(res.data))
            .catch(err => {
                debugger;
                enqueueSnackbar(err.response? err.response.data.error.message:err.message,{variant:"error"})})
    },[]);

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" align="center" >
                    Performance
                </Typography>
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>
                    <Grid container item justify={"flex-end"} direction={"row"} alignItems={"flex-end"} spacing={1}>
                        <Grid item  >
                            <Button id={"obtener_btn"}  style={{backgroundColor:'#f47b20',color:'white'}} variant={"contained"} type={"submit"} onClick={handleOpen}
                                    endIcon={<SvgIcon > <path d={"M8,5.14V19.14L19,12.14L8,5.14Z"}/></SvgIcon>}>
                                Agregar
                            </Button>
                        </Grid>

                    </Grid>


                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>

                <MUIDataTable title={ 'Performance'} data={neumaticos} options={options} columns={columns} />
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>


            </Paper>
            <Modal onClose={handleClose} open={open} center focusTrapped={false}>
                <InformacionPerformance openModal = {setOpen}  neumaticosIngresados = {{neumaticos,setNeumaticos}} />

            </Modal>
        </React.Fragment>
    );

}