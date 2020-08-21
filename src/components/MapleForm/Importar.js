import {Container, DialogActions, Paper, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/Ingreso";
import {useSnackbar} from "notistack";
import Dropzone from "react-dropzone-uploader";
import * as maple from '../../services/maple';
import TableBody from "@material-ui/core/TableBody";
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const encoding = ';charset=UTF-8';
const fullFileType = fileType+encoding;
const fileExtension = '.xlsx';

export default function Reporte() {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [reporte,setReporte] = React.useState([]);

    const [submitted,setSubmitted] = React.useState(true);

    const handleSubmit = (files,allFiles) =>{

        maple.importarExcel(files[0].file)
            .then(res => enqueueSnackbar(res.message,{variant:'success'}))
            .catch(err => enqueueSnackbar(err.response? err.response.data.error.message:err.message,{variant:"error"}));

    };

    const handleFile = (fileWithMeta,status,fileWithMetaarr) =>{
        if (status === 'rejected_file_type')
            enqueueSnackbar('Formato no valido del archivo',{variant:"warning"});

    };



    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" align="center" >
                    Importar Maple
                </Typography>
                <hr style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}/>


                    <Container component={'main'}>
                        <Paper>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell> Serie </TableCell>
                                    <TableCell> # Factura </TableCell>
                                    <TableCell> Ahorro Emision CO2 Kgs</TableCell>
                                    <TableCell> Litros de Petroleo Ahorrado</TableCell>
                                    <TableCell> Ahorro Emisiones CO2 %</TableCell>
                                    <TableCell> Codigo Producto</TableCell>
                                    <TableCell> Nombre Producto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                        </Paper>

                        <hr style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            border: 0,
                            borderTop: '1px solid rgba(0,0,0,0.1)'
                        }}/>

                        <Typography>
                            El archivo debe tener estas columnas para ser importado, de lo contrario no podra ser importado
                        </Typography>

                        <hr style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            border: 0,
                            borderTop: '1px solid rgba(0,0,0,0.1)'
                        }}/>
                        <Grid container justify={"center"} direction={"row"} spacing={4}
                      isValid  >


                            <Grid item xs={12} sm={5}>
                                {submitted?
                                    <Dropzone maxFiles={1} inputContent={"Arrastre el documento excel o haga click para explorar"}
                                              onSubmit={handleSubmit}  accept={fileType} submitButtonContent={"Importar"}  onChangeStatus={handleFile} />
                                    :null}
                            </Grid>


                        </Grid>
                    </Container>
                    {/*<Grid container item justify={"flex-end"} direction={"row"} alignItems={"flex-end"} spacing={1}>
                        <Grid item  >
                            <Button id={"obtener_btn"}  style={{backgroundColor:'#f47b20',color:'white'}} variant={"contained"} type={"submit"} onClick={() => setClicked('obtener')}
                                    endIcon={<SvgIcon > <path d={"M8,5.14V19.14L19,12.14L8,5.14Z"}/></SvgIcon>}>
                                Obtener
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button id={"exportar_btn"}  style={{backgroundColor:'#f47b20',color:'white'}} variant={"contained"} type={"submit"} onClick={() => setClicked('exportar')}
                                    endIcon={<SvgIcon > <path d={"M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M16 11V18.1L13.9 16L11.1 18.8L8.3 16L11.1 13.2L8.9 11H16Z"}/></SvgIcon>}>
                                Exportar
                            </Button>
                        </Grid>
                    </Grid>*/}
















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