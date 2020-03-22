import React, { forwardRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import auth from "../../services/auth";
import {useHistory} from 'react-router-dom';


const LogoutButton = forwardRef((props, ref) => {
    const history = useHistory();
    const handleClick = () =>{auth.logout(); history.replace('/login')};
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
        >
            <ExitIcon /> Logout

        </MenuItem>
    );
});

export default LogoutButton;