import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';

/*
  Renders the provided Vault Employee data in a table, with searchable column filters
 */
export default function VaultEmployeesTable({
    employeeTableData,
    tableColumns,
}) {
    const table = useReactTable({
        data: employeeTableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [
                {
                    id: 'name__v',
                    desc: false,
                },
            ],
        },
    });

    return (
        <Box
            sx={{
                height: 500,
                overflowY: 'auto',
                width: '100%',
            }}
        >
            <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 1 }}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Box
                        key={headerGroup.id}
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            borderBottom: '2px solid var(--color-gray)',
                            borderTop: '2px solid var(--color-orange)',
                        }}
                    >
                        {headerGroup.headers.map((header) => {
                            return (
                                <Box
                                    key={header.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding:
                                            'calc(var(--spatial-system) * 2)',
                                        textAlign: 'left',
                                        whiteSpace: 'nowrap',
                                        borderRight:
                                            '1px solid var(--color-gray)',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        backgroundColor:
                                            header.column.getIsSorted()
                                                ? 'var(--color-gray)'
                                                : 'var(--color-white)',
                                    }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {header.column.getIsSorted() ===
                                        'asc' ? (
                                            <ArrowDropUpIcon />
                                        ) : header.column.getIsSorted() ===
                                          'desc' ? (
                                            <ArrowDropDownIcon />
                                        ) : null}
                                        {header.column.getCanFilter() ? (
                                            <Box
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <ColumnFilter
                                                    column={header.column}
                                                />
                                            </Box>
                                        ) : null}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                ))}
            </Box>
            <Box sx={{ width: '100%', overflow: 'auto' }}>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <Box
                            key={row.id}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <Box
                                        key={cell.id}
                                        sx={{
                                            padding:
                                                'calc(var(--spatial-system) * 2)',
                                            textAlign: 'left',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

/*
 A component that renders a search input field for filtering table columns.
 */
function ColumnFilter({ column }) {
    const columnFilterValue = column.getFilterValue();

    return (
        <Paper
            variant='outlined'
            component='form'
            sx={{ paddingX: 'calc(var(--spatial-system) * 2)' }}
        >
            <InputBase
                value={columnFilterValue ?? ''}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder={`Search...`}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Paper>
    );
}
