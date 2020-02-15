import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {




    let {fnTrue,fnFalse,message,title,state} = props;

    let {openDialog,setOpenDialog} = state;

    const close = () => {
        setOpenDialog(false);
    };


    const handleAceptar = () =>{

        fnTrue();
        close();

    };

    const handleRechazar = () =>{
      fnFalse();
      close();
    };

    return (
        <React.Fragment>
            <Dialog
                open={openDialog}
                onClose={close}
                TransitionComponent={Transition}

            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRechazar}  style={{backgroundColor:'#c82333',color:'white'}}>
                        Rechazar
                    </Button>
                    <Button onClick={handleAceptar} style={{backgroundColor:'#28a745',color:'white'}} >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}