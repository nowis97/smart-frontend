import React, {useEffect} from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import smart_logo from './../../assets/smart_logo.png';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from "./ListItems";
import Dashboard from "../Dashboard";
import Recepcion from "../RecepcionForm/Recepcion";
import {Switch} from 'react-router-dom'
import Ingreso from "../IngresoForm/Ingreso";
import {useLocation,useHistory} from 'react-router-dom';
import Cookie from 'js-cookie';
import useStyles from "../../styles/MainContainer";
import Copyright from "./Copyright";
import Cliente from "../Cliente";
import Recepcionado from "../PlantaForm/Recepcionado";
import Despacho from "../DespachoForm/Despacho";
import Facturacion from "../FacturacionForm/Facturacion";
import Reporte from "../ReporteForm/Reporte";
import Performance from "../PerformanceForm/Performance";
import Importar from "../ImportarForm/Importar";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import auth from "../../services/auth";
import Popover from "@material-ui/core/Popover";
import {Administrator} from "../Administrator/Administrator";
import {PrivateRoute} from "../utils/PrivateRoute";
import {ResourceContext} from "../utils/ResourceContext";



function MainContainer(props) {
    const history = useHistory();
    const {roles} = React.useContext(ResourceContext);


    useEffect(() =>{
        if (window.innerWidth<=760) handleDrawerClose();
        setUser(Cookie.get('username'));
    },[]);


    const [user,setUser] =  React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState('SMART');




    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () =>{
        auth.logout();
        history.push('/login');
    };

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);

    console.log(props);

    return (
        <>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>

                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant={"subtitle2"} gutterBottom color={"inherit"} noWrap className={classes.subTitle}>
                        {user?user.toUpperCase():""}
                    </Typography>
                    { <IconButton color="inherit" edge={"end"} style={{transform:'translateX(10px)'}}
                                  onClick={ () => history.push('/admin')} >
                        <SupervisorAccountIcon />
                    </IconButton>}

                     <IconButton color="inherit" edge={"end"} style={{transform:'translateX(10px)'}}
                                 onMouseEnter={handlePopoverOpen}
                                 onMouseLeave={handlePopoverClose}
                                     onClick={logout} >
                            <ExitToAppIcon />
                    </IconButton>
                    <Popover
                        id="mouse-over-popover"
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={openPop}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography variant={"body2"}>Cerrar Sesión</Typography>
                    </Popover>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={ open}
            >

                <div className={classes.toolbarIcon}>
                    <img alt={""} className={classes.img} src={smart_logo}/>
                    <IconButton onClick={handleDrawerClose} className={classes.icon}>
                        <ChevronLeftIcon  />
                    </IconButton>

                </div>
                <Divider />
                <List>
                    <ListItems changeTitle={setTitle} />
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Switch>
                        <PrivateRoute path = "/dashboard" roles ={["dashboard","superuser"]} component={Dashboard} />
                        <PrivateRoute path = "/ingreso" roles ={["ingreso","superuser"]} component = {Ingreso}/>
                        <PrivateRoute path = "/recepcion" roles={["recepcion","superuser"]} component = {Recepcion} />
                        <PrivateRoute path= "/planta" roles={["planta","superuser"]} component = {Recepcionado}/>
                        <PrivateRoute path= "/despacho" roles={["despacho","superuser"]} component={Despacho}/>
                        <PrivateRoute path= "/cliente" roles={["superuser"]} component={Cliente}/>
                        <PrivateRoute path= "/facturacion" roles={["facturacion","superuser"]} component={Facturacion}/>
                        <PrivateRoute path= "/reportes" roles={["reportes","superuser"]} component={Reporte}/>
                        <PrivateRoute path="/performance" roles={["performance","superuser"]} component={Performance}/>
                        <PrivateRoute path="/importar" roles={["importar","superuser"]} component={Importar}/>
                    </Switch>



                <Copyright />
            </main>
        </div>
        </>
    );
}

export default (MainContainer);