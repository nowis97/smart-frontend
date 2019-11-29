import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{marginTop:'20px'}}>
            {'Copyright © '}
            <Link color="inherit" href="http://www.kaltiremining.com/">
                Kal Tire MTG
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}