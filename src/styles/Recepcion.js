import {makeStyles} from "@material-ui/core";

const useStyle = () => makeStyles(theme => ({
    modal: {
        zIndex:1201,
    },
    layout: {

        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },


    },
    paperModal: {
        backgroundColor: '#fafafa',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position: 'absolute',
        top:'50%',
        left:'50%'
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        alignContent:'center',

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom:theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
        paddingBottom: theme.spacing(2)
    },

}));

export default useStyle;