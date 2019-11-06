import auth from "../../services/auth";
import {Route,Redirect} from 'react-router-dom';
import React from "react";

export default function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect to={{pathname:'/login',state:{from:location}}}
                    />
                )
            }
        />
    );
}