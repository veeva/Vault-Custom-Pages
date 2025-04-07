import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import VaultEmployeesTable from './components/VaultEmployeesTable';
import useVaultEmployees from './hooks/useVaultEmployees';
import React from 'react';

export default function App() {
    const {
        employeeTableData,
        tableColumns,
        isExecutingQuery,
        nextPage,
        previousPage,
        queryPage,
    } = useVaultEmployees();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 800,
                backgroundColor: 'var(--color-white)',
            }}
        >
            <Box
                component='h5'
                style={{
                    margin: 'calc(var(--spatial-system) * 2)',
                    padding: 'var(--spatial-system)',
                    flex: '0 0 auto',
                    fontSize: 'calc(var(--font-size) * 1.5)',
                    fontWeight: 'normal',
                }}
            >
                All Employees
            </Box>
            <Box
                sx={{
                    height: 500,
                    marginX: 'calc(var(--spatial-system) * 2)',
                    flex: '1 1 auto',
                }}
            >
                {isExecutingQuery ? (
                    <Skeleton
                        variant='rectangular'
                        animation='pulse'
                        height={500}
                    />
                ) : (
                    <VaultEmployeesTable
                        {...{ employeeTableData, tableColumns }}
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                    margin: 'calc(var(--spatial-system) * 2)',
                }}
            >
                <Button
                    variant='contained'
                    size='small'
                    disabled={!previousPage}
                    onClick={() => queryPage(previousPage)}
                    sx={{
                        color: 'var(--color-white)',
                        backgroundColor: 'var(--color-blue)',
                        borderRadius: 'var(--spatial-system)',
                        paddingX: 'calc(var(--spatial-system) * 2)',
                    }}
                >
                    Previous Page
                </Button>
                <Button
                    variant='contained'
                    size='small'
                    disabled={!nextPage}
                    onClick={() => queryPage(nextPage)}
                    sx={{
                        color: 'var(--color-white)',
                        backgroundColor: 'var(--color-blue)',
                        borderRadius: 'var(--spatial-system)',
                        paddingX: 'calc(var(--spatial-system) * 2)',
                    }}
                >
                    Next Page
                </Button>
            </Box>
        </Box>
    );
}
