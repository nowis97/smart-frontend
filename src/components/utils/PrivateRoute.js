import {Redirect, Route} from "react-router-dom";
import React from "react";
import auth from "../../services/auth";
import {ResourceContext} from "./ResourceContext";
import {useSnackbar} from "notistack";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {

    const {currentRoles} = React.useContext(ResourceContext);
    const {enqueueSnackbar} = useSnackbar();

    return <Route {...rest} render={props => {
        debugger;

        if (!auth.isAuthenticated())
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;

        // check if route is restricted by role
        if (currentRoles && currentRoles.some( v =>  roles.includes(v)))
            // role not authorised so redirect to home page
            return <Component {...props} />;


        // authorised so return component
        enqueueSnackbar('No Autorizado',{variant:"error"});
        return <Redirect to={{pathname: '/'}}/>
    }}/>
};
