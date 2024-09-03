import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import VaultUsersTable from './components/VaultUsersTable';
import useVaultUsers from './hooks/useVaultUsers';
import React from 'react';

export default function App({ userRecords, initiatingUser }) {
    const { data, columns } = useVaultUsers({userRecords, initiatingUser});

    return (
        <>
            <Card sx={{
                boxShadow: '0 0 5px rgba(0,0,0,0.5)',
                color: '#1b2f54',
                backgroundColor: '#f5f5f5',
                marginX: 1,
                marginY: 2,
                padding: 2
            }}>
                <Typography
                    variant='h4'
                    component='div'
                >
                    Vault Users
                </Typography>
            </Card>
            <VaultUsersTable {...{data, columns}} />
        </>
    )
}