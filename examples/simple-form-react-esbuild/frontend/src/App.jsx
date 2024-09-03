import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

export default function App({ sendEvent }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isCreatingPersonRecord, setIsCreatingPersonRecord] = useState(false);
    const [createdPersonRecordId, setCreatedPersonRecordId] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const CREATE_PERSON_RECORD_EVENT = 'createPersonRecord';

    /**
     * Invokes the createPersonRecord event with the user inputs and stores the results in state.
     * @returns {Promise<void>}
     */
    const submitForm = async () => {
        if (firstName && lastName && email) {
            setIsCreatingPersonRecord(true);
            setErrorMessage('');

            const personData = {
                firstName,
                lastName,
                email
            }

            try {
                const createPersonResponse = await sendEvent(CREATE_PERSON_RECORD_EVENT, personData);
                console.log(createPersonResponse);
                const { id = '', error = '' } = createPersonResponse.data;

                setCreatedPersonRecordId(id);
                setErrorMessage(error);
            } catch (error) {
                console.error(error);
                // In future will catch/handle specific error types (EventError, SdkError, UnexpectedError)
            } finally {
                setIsCreatingPersonRecord(false);
            }
        }
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            <Card sx={{minWidth: 800, backgroundColor: '#f8f8f8', margin: 5}}>
                <CardHeader
                    title='Create Person Records'
                    sx={{backgroundColor: '#1b2f54', color: '#ffffff', paddingY: 1}}
                    titleTypographyProps={{fontSize: 32}}
                />
                <CardContent>
                    <Box
                        component='form'
                        sx={{
                            '& .MuiTextField-root': {margin: 1, width: 'auto'}
                        }}
                    >
                        <TextField
                            required
                            id='first-name-input-field'
                            label='First Name'
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                            sx={{backgroundColor: '#ffffff'}}
                            InputLabelProps={{
                                sx: { fontSize: 24 }
                            }}
                            InputProps={{
                                sx: { fontSize: 24 }
                            }}
                        />
                        <TextField
                            required
                            id='last-name-input-field'
                            label='Last Name'
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                            sx={{backgroundColor: '#ffffff'}}
                            InputLabelProps={{
                                sx: { fontSize: 24 }
                            }}
                            InputProps={{
                                sx: { fontSize: 24 }
                            }}
                        />
                        <TextField
                            required
                            id='email-input-field'
                            label='Email'
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            sx={{backgroundColor: '#ffffff'}}
                            InputLabelProps={{
                                sx: { fontSize: 24 }
                            }}
                            InputProps={{
                                sx: { fontSize: 24 }
                            }}
                        />
                    </Box>
                    {isCreatingPersonRecord ? <CircularProgress/> :
                        <>
                            {errorMessage ?
                                <Typography variant='h6' component='div' sx={{ fontSize: 20 }}>
                                    {errorMessage}
                                </Typography>
                                : <>
                                    {createdPersonRecordId ?
                                        <Typography variant='h6' component='div' sx={{ fontSize: 20 }}>
                                            Created person record: {createdPersonRecordId}
                                        </Typography> : null
                                    }
                                </>
                            }
                        </>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={submitForm}
                        disabled={!firstName || !lastName || !email}
                        sx={{ fontSize: 20 }}
                    >
                        Create
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}