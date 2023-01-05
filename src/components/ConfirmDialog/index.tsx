import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';
import { Props } from '../../utils/interfaces';

export const ConfirmDialog: React.FC<Props> = ({ confirmDialog, setConfirmDialog }: Props) => {

    return (
        <Dialog
            open={confirmDialog.isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    justifyContent: ' center',
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
                <Button color='primary' onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    variant="contained"
                    sx={{
                        boxShadow: '-2px 7px 10px -4px rgba(0,0,0,0.75)',
                        transition: '0.3s',
                        "&:hover": {
                            boxShadow: '-2px 7px 10px -4px rgba(0,0,0,0.75)',
                            transform: 'scale(1.02)'
                        },
                        "&:active": {
                            transform: 'scale(0.98)'
                        }
                    }}
                >
                    Cancelar
                </Button>
                <Button color='error' onClick={confirmDialog.onConfirm} autoFocus
                    variant="contained"
                    sx={{
                        boxShadow: '-2px 7px 10px -4px rgba(0,0,0,0.75)',
                        transition: '0.3s',
                        "&:hover": {
                            boxShadow: '-2px 7px 10px -4px rgba(0,0,0,0.75)',
                            transform: 'scale(1.02)'
                        },
                        "&:active": {
                            transform: 'scale(0.98)'
                        }
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}