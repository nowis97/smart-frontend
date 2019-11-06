import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React from "react";
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

const useStyles = () => makeStyles({
    container: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    fixedHeight: {
        height: 240,
    },
    paper: {
    padding: 2,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
}
});

export default function Dashboard(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Container maxWidth="lg" className={classes.container}>

        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>

                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                </Paper>
            </Grid>
        </Grid>
    </Container>);
}