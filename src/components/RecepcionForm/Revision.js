import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {FormRecepcionContext} from "./Recepcion";

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));


export default function Revision() {
    const classes = useStyles();
    const [neumatico, recepcion] = useContext(FormRecepcionContext);
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom style={{paddingTop:'10px'}}>
                Neumatico
            </Typography>

            <List disablePadding style={{marginLeft:'70px', marginRight:'70px'}}>

                    <ListItem className={classes.listItem}>
                        <ListItemText primary={"Serie"} />
                        <Typography variant="subtitle2">{neumatico.serie}</Typography>
                    </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Marca"} />
                    <Typography variant="subtitle2">{neumatico.marca}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Medida"} />
                    <Typography variant="subtitle2">{neumatico.medida}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Modelo"} />
                    <Typography variant="subtitle2">{neumatico.modelo}</Typography>
                </ListItem>

                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>

                <ListItem className={classes.listItem}>
                    <ListItemText primary={"RTD"} />
                    <Typography variant="subtitle2">{neumatico.rtd}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Horas de Operación"} />
                    <Typography variant="subtitle2">{neumatico.hrs_operacion}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Kilómetros de Operación"} />
                    <Typography variant="subtitle2">{neumatico.kms_operacion}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Recepción
                    </Typography>
                    <Typography gutterBottom>{recepcion.cliente}</Typography>
                    <Typography gutterBottom>{recepcion.causa_recepcion}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{"Guia de Despacho"}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{neumatico.guia_despacho}</Typography>
                                </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{"Patente de Camión"}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{neumatico.patente_camion}</Typography>
                        </Grid>



                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}