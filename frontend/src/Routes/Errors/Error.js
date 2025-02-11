import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton';

/*
 * Reusable component that displays an alert with the error messages received from the backend
 * Makes use of the Alert component from the MaterialUI Component Library
 * Errors have to be received in a specific format to render
 */
const ErrorAlert = props => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Collapse in={open} onClick={props.clear}>
                <Alert severity="error" action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                    {props.message.map(errors =>
                    <> 
                        <ul key={errors.error.toString()}>{errors.error}</ul><br />
                    </>
                    )}
                </Alert>
            </Collapse>
        </div>
    );
}

export default ErrorAlert