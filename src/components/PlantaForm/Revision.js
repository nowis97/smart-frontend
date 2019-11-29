import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import {PlantaContext} from "./Planta";


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
    const {state} = React.useContext(PlantaContext);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom style={{paddingTop:'10px'}}>
                Planta
            </Typography>

            <List disablePadding style={{marginLeft:'40px', marginRight:'40px'}}>

                    <ListItem className={classes.listItem}>
                        <ListItemText primary={"Serie"} />
                        <Typography variant="subtitle2">{'serie'}</Typography>
                    </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Planta"} />
                    <Typography variant="subtitle2">{'planta'}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Precio"} />
                    <Typography variant="subtitle2">{'precio'}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Fecha Produccion"} />
                    <Typography variant="subtitle2">{'produccion'}</Typography>
                </ListItem>

                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>

                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Fecha Control Calidad"} />
                    <Typography variant="subtitle2">{'control calidad'}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Garantia"} />
                    <Typography variant="subtitle2">{'hrs'}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Condicion Final"} />
                    <Typography variant="subtitle2">{'reparado'}</Typography>
                </ListItem>
                <hr style={{marginTop:'1px',marginBottom:'1px',border:0,borderTop: '1px solid rgba(0,0,0,0.1)'}}/>


            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Reparaciones
                    </Typography>
                    <Typography gutterBottom>{'cliente'}</Typography>
                    <Typography gutterBottom>{'causa'}</Typography>
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
                                    <Typography gutterBottom>{'guia'}</Typography>
                                </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{"Patente de Camión"}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{'patente'}</Typography>
                        </Grid>



                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}