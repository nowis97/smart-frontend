import React, {useEffect} from 'react';
import clsx from 'clsx';
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
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from "./ListItems";
import Dashboard from "../Dashboard";
import Recepcion from "../RecepcionForm/Recepcion";
import {Route, Switch} from 'react-router-dom'
import Ingreso from "../IngresoForm/Ingreso";
import {useLocation,useRouteMatch,withRouter,useHistory} from 'react-router-dom';
import Cookie from 'js-cookie';
import Planta from "../PlantaForm/Planta";
import useStyles from "../../styles/MainContainer";
import Copyright from "./Copyright";
import Cliente from "../Cliente";
import Recepcionado from "../PlantaForm/Recepcionado";




function MainContainer(props) {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    useEffect(() =>{
        if (window.innerWidth<=760) handleDrawerClose();
        setUser(Cookie.get('username'));

    },[]);



    const [user,setUser] =  React.useState('');

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState('SMART');

    console.log(location.state);

    const changeTitle = React.useCallback((title) => {
        setTitle(title);
    },[title]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


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
                    {/*<IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>*/}
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
                    <ListItems changeTitle={changeTitle} />
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Switch>
                        <Route  path = "/dashboard" component={Dashboard} />
                        <Route   path = "/ingreso" component = {Ingreso}/>
                        <Route   path = "/recepcion" component = {Recepcion} />
                        <Route path="/planta" component = {Recepcionado}/>
                        <Route path={"/cliente"} component={Cliente}/>
                    </Switch>



                <Copyright />
            </main>
        </div>
        </>
    );
}

export default (MainContainer);