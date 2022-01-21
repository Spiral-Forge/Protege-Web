import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
  } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorDialog from "./ErrorDialog"

const LogoutDialog = ({isOpen, closeModal, errorMessage}) => {
    const { signOut } = useAuth();
    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await signOut();
            closeModal();
        } catch (err) {
            <ErrorDialog isOpen={isOpen} closeModal={()=>closeModal()} errorMessage="Unable to sign out" />
            console.log(err);
        }
        history.push("/");
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                closeModal()
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        closeModal()
                    }}>
                    No
                </Button>
                <Button onClick={handleSignOut} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default LogoutDialog;