import React, { useEffect } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import { Close as CloseIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { theme } from '../../../App';

interface ErrorAlertProps {
    message: string;
    closeResponseAreaSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, closeResponseAreaSetter }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            closeResponseAreaSetter(false);  
        }, 5000);

        return () => clearTimeout(timer);  
    }, [closeResponseAreaSetter]);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <Alert
                severity="error"
                icon={<ErrorIcon fontSize="inherit" />}
                action={
                    <CloseIcon
                        onClick={() => closeResponseAreaSetter(false)}
                        sx={{ cursor: 'pointer' }}
                    />
                }
                sx={{
                    maxWidth: '600px',
                    fontSize: '1rem',
                    background: theme.palette.secondary.main
                }}
            >
                <AlertTitle sx={{fontWeight: 'bold'}}>Error</AlertTitle>
                {message}
            </Alert>
        </Box>
    );
};

export default ErrorAlert;