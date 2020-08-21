import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {makeStyles} from "@material-ui/core";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import SvgIcon from "@material-ui/core/SvgIcon";
import SvgPlantaIcon from "../../Icons/PlantaIcon";
import SvgPerformanceIcon from "../../Icons/PerformanceIcon";
import SvgDespachoIcon from "../../Icons/DespachoIcon";
import SvgFacturacionIcon from "../../Icons/FacturacionIcon";
import {Link} from "react-router-dom";
import {useLocation,useHistory} from 'react-router-dom'
import SvgNeumaticoIcon from "../../Icons/NeumaticoIcon";
import useStyles from "../../styles/ListItems";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function ListItems(props) {

    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className={classes.listItem}>
            <ListItem button component={Link} to ="dashboard" selected={location.pathname === '/dashboard'}
                      onClick={ () => {props.changeTitle('Dashboard');}} >
                <ListItemIcon className={classes.icon}>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>

            <ListItem button component= { Link } to="ingreso" selected={location.pathname === '/ingreso'}
                      onClick={ () => {props.changeTitle('Ingreso')}}>
                <ListItemIcon className={classes.icon}>
                    <CallReceivedIcon/>
                </ListItemIcon>
                <ListItemText primary="Ingreso"/>

            </ListItem>
            <ListItem button  component= { Link } to="recepcion" selected={location.pathname === '/recepcion'}
                      onClick={ () => props.changeTitle('Recepción')}>
                <ListItemIcon className={classes.icon}>
                    <SvgIcon> <SvgNeumaticoIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Recepción"/>

            </ListItem>

            <ListItem button component = {Link} to={"planta"} selected={location.pathname ==='/planta'}
                      onClick={() => props.changeTitle('Planta')}
            >
                <ListItemIcon className={classes.icon}>
                <SvgIcon><SvgPlantaIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Planta"/>
            </ListItem>

            <ListItem button component={Link} to={"despacho"} selected={location.pathname ==='/despacho'}
            onClick={()=> props.changeTitle('Despacho')}>
                <ListItemIcon className={classes.icon} >
                    <SvgIcon ><SvgDespachoIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Despacho"/>
            </ListItem>
            <ListItem button component={Link} to={"facturacion"} selected={location.pathname ==='/facturacion'} onClick={() =>
                props.changeTitle('Facturación')}>
                <ListItemIcon className={classes.icon} >
                    <SvgIcon ><SvgFacturacionIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Facturación"/>
            </ListItem>

            <ListItem button component={Link} to ="performance" selected={location.pathname === '/performance'} onClick={()=> props.changeTitle('Performance')}>
                <ListItemIcon className={classes.icon}>
                    <SvgIcon ><SvgPerformanceIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Performance"/>
            </ListItem>
            <ListItem button  component={Link} to={"reportes"} selected={location.pathname === '/reportes'}
            onClick={()=> props.changeTitle('Reportes')} >
                <ListItemIcon className={classes.icon}>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Reportes"/>
            </ListItem>
            <ListItem button component={Link} to={"cliente"} selected={location.pathname === '/cliente'}
                onClick={()=> props.changeTitle('Cliente')}>
                <ListItemIcon className={classes.icon}>
                    <PersonAddIcon/>
                </ListItemIcon>
                <ListItemText primary="Clientes"/>
            </ListItem>

            <ListItem button component={Link} to={"maple"} selected={location.pathname === '/maple'}
                      onClick={()=> props.changeTitle('Maple')}>
                <ListItemIcon className={classes.icon}>
                    <SvgIcon> <path d={"M6,2C4.89,2 4,2.9 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13M10.05,11.22L12.88,14.05L15,11.93V19H7.93L10.05,16.88L7.22,14.05"} /> </SvgIcon>

                </ListItemIcon>
                <ListItemText primary="Maple"/>
            </ListItem>

        </div>

    )
}
