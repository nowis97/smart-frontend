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
import xlsx from 'xlsx'
import * as FileSaver from 'file-saver'
import {action} from "../utils/ProcessNotification";
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const initialState = {
    cliente: '',
    fechaInicio:(new Date(Date.now())),
    fechaTermino:(new Date()),
    nombreReporte:''
};

const nombreReportes = [
    {
        nombre:'Maple',id:'maple'
    },
    {
        nombre: 'Ingresados',id: 'ingresos'
    },{
        nombre: 'Recepcionados',id:'recepcionados'
    },
    {
        nombre:'Planta',id:'planta'
    },
    {
        nombre: 'Despachos',id:'despachados'
    },{
        nombre:'Facturados',id:'facturados'
    }
    ];


export default function Reporte() {

    const classes = useStyles();
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [reporteOptions,setReporteOptions] = React.useState(initialState);
    const [reporte,setReporte] = React.useState([]);

    const [clientes,setClientes] = React.useState([]);

    const [clicked,setClicked] = React.useState('');
    const [cols,setCols] = React.useState([]);
    const {errors,isValid} = useYup(reporteOptions,validationSchema,{validateOnChange:true});
    const [disable,setDisable] = React.useState(false);



    const options = {
        filter: true,
        searchOpen:false,
        responsive: 'scrollMaxHeight',
        download:false,
        fixedHeaderOptions: {
            xAxis: true,
            yAxis:true
        }
    };

    useEffect(()=>{
        cliente.obtenerClientes().then(res => setClientes([{id:0,faena:'Todos'},...res]));
    },[]);

    const handleChangeAutoComplete = id => (e,value) =>{
        setReporteOptions(prevState => {
            return {
                ...prevState, [id]: value?value.id:null}
        });

    };

    const handleChangeDates =  (value,id) => {

        setReporteOptions(prevState => ({
            ...prevState,
            [id]:value
        }))
    };
    const submit = () =>{
        setDisable(true);
        const key = enqueueSnackbar('Procesando...',{variant:"info",persist:true,action:action});


        if (clicked ==='exportar' && reporteOptions.nombreReporte ==='maple'){

            serviceReporte.exportarReporte(reporteOptions).then(res =>{
                const href = URL.createObjectURL(res.data);
                const link = document.createElement('a');
                link.href = href;
                link.download = 'ReporteMaple.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(err=>{
                enqueueSnackbar(err.response? err.response.data.error.message: err.message,{variant:"error"})
            }).finally(() => {
                setDisable(false);
                closeSnackbar(key);
            });
            return;
        }
        if (clicked ==='exportar'){

            if (reporte.length ===0) {
                enqueueSnackbar('No hay datos para exportar',{variant:'error'});
                return;
            }

            const ws = xlsx.utils.json_to_sheet(reporte);
            const wb = xlsx.utils.book_new();


            const header = Object.keys(reporte[0]); // columns name

            const wscols = [];
            for (let i = 0; i < header.length; i++) {  // columns length added
                wscols.push({ wch: header[i].length + 5 })
            }
            ws['!cols'] = wscols;

            xlsx.utils.book_append_sheet(wb,ws,reporteOptions.nombreReporte);
            const excelBuffer = xlsx.write(wb,{bookType:"xlsx",type:'array'});
            const data = new Blob([excelBuffer],{type:fileType});
            setDisable(false);
            closeSnackbar(key);
            FileSaver.saveAs(data,reporteOptions.nombreReporte+fileExtension);


        }else {
            serviceReporte.reporte(reporteOptions).then(res =>{

                if (res.data.length ===0) throw new Error('No hay datos');
                setCols(Object.keys(res.data[0]));
                setReporte(res.data);

            })
                .catch(err=>{

                    enqueueSnackbar(err.response? err.response.data.error.message:err.message,{variant:"error",autoHideDuration:8000})
                })
                .finally(() => {
                    setDisable(false);
                    closeSnackbar(key);
                })

        }

    };
    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!isValid) {
            enqueueSnackbar('Campos no validos',{variant:"warning"});
            return;
        }
        submit();

    };




    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" align="center" >
                    Reportes
                </Typography>
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>
            <form  onSubmit={handleSubmit}>
                <Container component={'main'}>
                    <Grid container justify={"flex-start"} direction={"row"} spacing={4}
                    >
                        <Grid item xs={12} sm={6} md={3} lg={4} xl={3} >
                            <Autocomplete  options={nombreReportes} getOptionLabel={option => option.nombre} aria-required={true} onChange={handleChangeAutoComplete('nombreReporte')}
                                           renderInput={params => (<TextField fullWidth required {...params} label={"Reportes"}  />)}/>
                        </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                                <Autocomplete  options={clientes} getOptionLabel={option => option.faena} aria-required={true} onChange={handleChangeAutoComplete('cliente')}
                                               renderInput={params => (<TextField fullWidth required {...params} label={"Cliente"}   />)}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker id={"fecha"} label={"Fecha de Inicio"} format={"dd/MM/yyyy"}

                                                        KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                        onChange = {e => handleChangeDates(e,'fechaInicio')} value = {reporteOptions.fechaInicio}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={4} xl={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker id={"fecha"} label={"Fecha de Termino"} format={"dd/MM/yyyy"}

                                                        KeyboardButtonProps={{'aria-label': 'change-date'}} showTodayButton
                                                        onChange = {e => handleChangeDates(e,'fechaTermino')} value = {reporteOptions.fechaTermino}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>




                    </Grid>
                </Container>
                <Grid container item justify={"flex-end"} direction={"row"} alignItems={"flex-end"} spacing={1}>
                    <Grid item  >
                        <Button id={"obtener_btn"} disabled={disable} style={{backgroundColor:'#f47b20',color:'white'}} variant={"contained"} type={"submit"} onClick={() => setClicked('obtener')}
                                 endIcon={<SvgIcon > <path d={"M8,5.14V19.14L19,12.14L8,5.14Z"}/></SvgIcon>}>
                            Obtener
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button id={"exportar_btn"} disabled={disable} style={{backgroundColor:'#f47b20',color:'white'}} variant={"contained"} type={"submit"} onClick={() => setClicked('exportar')}
                                 endIcon={<SvgIcon > <path d={"M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M16 11V18.1L13.9 16L11.1 18.8L8.3 16L11.1 13.2L8.9 11H16Z"}/></SvgIcon>}>
                            Exportar
                        </Button>
                    </Grid>
                </Grid>
            </form>


                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>

                <MUIDataTable title={ reporteOptions.nombreReporte? reporteOptions.nombreReporte.toUpperCase():""} data={reporte} options={options} columns={cols} />
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>


            </Paper>
        </React.Fragment>
    );

}