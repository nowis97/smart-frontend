import {makeStyles} from "@material-ui/core";

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

export default useStyles;