import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

// Define the event name which will be handled in the Vault Java SDK server code
const CREATE_EMPLOYEE_RECORD_EVENT = 'createEmployeeRecord';

export default function App({ sendEvent }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isCreatingEmployeeRecord, setIsCreatingEmployeeRecord] =
        useState(false);
    const [createdEmployeeRecordId, setCreatedEmployeeRecordId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Sends the "createEmployeeRecord" event to the server code with the required parameters.
     * Reads the response and loads the results and/or error message into state for display to the user.
     * @returns {Promise<void>}
     */
    const submitForm = async () => {
        if (firstName && lastName && email) {
            setIsCreatingEmployeeRecord(true);
            setErrorMessage('');

            // Prepare the required parameters
            const employeeData = {
                first_name__c: firstName,
                last_name__c: lastName,
                name__v: `${firstName} ${lastName}`,
                email__c: email,
            };

            try {
                // Send the event (with the required parameters) to the server code.
                const createEmployeeResponse = await sendEvent(
                    CREATE_EMPLOYEE_RECORD_EVENT,
                    employeeData,
                );
                console.log(createEmployeeResponse);

                // Read the id & error returned from the PageController onEvent method of the server code.
                const { id = '', error = '' } = createEmployeeResponse?.data;

                setCreatedEmployeeRecordId(id);
                setErrorMessage(error);
            } catch (error) {
                console.error(error);

                if (error.message) {
                    setErrorMessage(error.message);
                }
            } finally {
                setIsCreatingEmployeeRecord(false);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: 'var(--color-white)',
            }}
        >
            <Card
                sx={{
                    minWidth: 300,
                    backgroundColor: 'var(--color-white)',
                    margin: 'calc(var(--spatial-system) * 4)',
                    width: { xs: '100%', sm: 'auto' },
                }}
            >
                <CardHeader
                    title='Create Employee Records'
                    titleTypographyProps={{
                        style: { fontSize: 'calc(var(--font-size) * 1.5)' },
                    }}
                    sx={{
                        backgroundColor: 'var(--color-light-gray)',
                        paddingY: 'calc(var(--spatial-system) * 2)',
                        borderBottom: '1px solid var(--color-orange)',
                    }}
                />
                <CardContent sx={{ paddingBottom: 'var(--spatial-system)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                required
                                id='first-name-input-field'
                                label='First Name'
                                fullWidth
                                size='small'
                                value={firstName}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                                sx={{ backgroundColor: 'var(--color-yellow)' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                required
                                id='last-name-input-field'
                                label='Last Name'
                                fullWidth
                                size='small'
                                value={lastName}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                                sx={{ backgroundColor: 'var(--color-yellow)' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                required
                                id='email-input-field'
                                label='Email'
                                fullWidth
                                size='small'
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                sx={{ backgroundColor: 'var(--color-yellow)' }}
                            />
                        </Grid>
                    </Grid>
                    {isCreatingEmployeeRecord ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {errorMessage ? (
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{
                                        marginTop:
                                            'calc(var(--spatial-system) * 2)',
                                    }}
                                >
                                    {errorMessage}
                                </Typography>
                            ) : (
                                <>
                                    {createdEmployeeRecordId ? (
                                        <Typography
                                            variant='h6'
                                            component='div'
                                            sx={{
                                                marginTop:
                                                    'calc(var(--spatial-system) * 2)',
                                            }}
                                        >
                                            Created employee:{' '}
                                            {createdEmployeeRecordId}
                                        </Typography>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={submitForm}
                        disabled={!firstName || !lastName || !email}
                        sx={{
                            backgroundColor: 'var(--color-blue)',
                            borderRadius: 'var(--spatial-system)',
                            paddingX: 'calc(var(--spatial-system) * 2)',
                        }}
                    >
                        Create
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
