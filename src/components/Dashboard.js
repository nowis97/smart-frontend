import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React from "react";
import clsx from "clsx";

import useStyles from "../styles/Dashboard";

export default function Dashboard(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Container maxWidth="lg" className={classes.container}>

        <Grid container spacing={3} >
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <iframe width="990" height="580"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMTAxMzU3MmMtOTNjNy00MTVjLWFlMWEtMmViM2MwMDlkZjkwIiwidCI6ImFkYzQxYjk1LWEyOWItNGRhNS1hNGZmLWU4Y2U2NGM4MWY2MSIsImMiOjZ9"
                        frameBorder="0" allowFullScreen="true"/>
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