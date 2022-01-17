import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
  } from "@material-ui/core";
import Button from '@mui/material/Button';

const ErrorDialog = ({isOpen, closeModal, errorMessage}) => {

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {errorMessage}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={() => {
                    closeModal();
                }}
                autoFocus
            >
                Close
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorDialog;