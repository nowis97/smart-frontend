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
import SvgPlantaIcon from "./Icons/PlantaIcon";
import SvgPerformanceIcon from "./Icons/PerformanceIcon";
import SvgDespachoIcon from "./Icons/DespachoIcon";

const useStyles = makeStyles({
    listItem: {
        color: 'white',
    },
    icon:{
        color:'white'
    }
});



export default function ListItems() {
    const classes = useStyles();
    return (
        <div className={classes.listItem}>
            <ListItem button >
                <ListItemIcon className={classes.icon}>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <CallReceivedIcon/>
                </ListItemIcon>
                <ListItemText primary="Recepción"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                <SvgIcon><SvgPlantaIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Planta"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <SvgIcon ><SvgPerformanceIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Performance"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <SvgIcon ><SvgDespachoIcon/></SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Despacho"/>
            </ListItem>
            <ListItem button >
                <ListItemIcon className={classes.icon}>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Reportes"/>
            </ListItem>
            <ListItem button >
                <ListItemIcon className={classes.icon}>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="Integrations"/>
            </ListItem>
        </div>
    )
}
