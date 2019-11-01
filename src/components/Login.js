import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SmartLogo from '../assets/smart_logo_negro.png';

import auth from '../services/auth';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://kaltiremining.com">
                Kal Tire MTG
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    img:{
        overflow: 'auto',
        height: 'fit-content',
        width: '300px'
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const signup = async (e) =>{
    e.preventDefault();
   await auth('Astaldi','123456789');
};

export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <img src={SmartLogo} className={classes.img} alt={""}/>
                <form className={classes.form} onSubmit={signup}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="ID de usuario"
                        name="id"
                        autoComplete="id"
                        autoFocus
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
                        className={classes.submit}

                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                ¿Olvido la contraseña?
                            </Link>
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