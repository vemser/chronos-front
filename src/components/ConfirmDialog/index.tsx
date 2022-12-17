import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';
import { Props } from '../../utils/interfaces';

export const ConfirmDialog: React.FC<Props> = ({confirmDialog, setConfirmDialog}:Props) => { 

    return (
        <Dialog
            open={confirmDialog.isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"
            sx={{
                display: 'flex',
                justifyContent: ' center'
            }}
            >
                Confirmação
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirmDialog.title}
                </DialogContentText>
            </DialogContent>
            <DialogActions
            sx={{
                display: 'flex',
                justifyContent: ' center'
            }}
            >
                <Button color='primary' onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false})}>
                    Cancelar
                </Button>
                <Button color='success' onClick={confirmDialog.onConfirm} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}