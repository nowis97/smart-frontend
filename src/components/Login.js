import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from "../styles/Login";
import Container from '@material-ui/core/Container';
import SmartLogo from '../assets/smart_logo_negro.png';
import {useSnackbar} from "notistack";
import auth from '../services/auth';
import {useHistory,useLocation} from "react-router-dom";
import Copyright from "./MainContainer/Copyright";
import {action} from "./utils/ProcessNotification";
import {ResourceContext} from "./utils/ResourceContext";


export default function Login(props) {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const history = useHistory();
    const [disable,setDisable] = React.useState(false);
    const {addContext} = React.useContext(ResourceContext);



    const [login,setLogin] =React.useState({
        userId:'',
        password:'',
    });

    const handleChange = e => {
        const {id ,value } = e.currentTarget;
        setLogin(prevState => ({
            ...prevState,
            [id]:value
        }))
    };

    const signup = async (e) =>{
        e.preventDefault();
        setDisable(true);
        const key = enqueueSnackbar('Ingresando...',{persist:true,action:action,variant:"info"});
        auth.login(login.userId,login.password).then( async res =>{

            const result = res.data;
            addContext('currentRoles',result.roles);
            const roles = await auth.obtenerRoles();

            if('token' in result)
                history.push({pathname:'/',state:{result,roles}});
        })
        .catch(err => {
            enqueueSnackbar(err.response ? err.response.data.error.message : err.message,{variant:'error'})
        })
        .finally(() => {
                setDisable(false);
                closeSnackbar(key);
            })

    };
    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
                    <img src={SmartLogo} className={classes.img} alt={""}/>
                <form className={classes.form} onSubmit={signup} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="ID de usuario"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    { /*<FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />*/}
                    <Button
                        type={"submit"}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={disable}
                        className={classes.submit}

                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">
                                ¿Olvido la contraseña?
                            </Link>*/}
                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}