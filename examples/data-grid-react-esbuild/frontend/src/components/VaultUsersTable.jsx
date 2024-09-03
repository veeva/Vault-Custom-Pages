import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import TablePaginationActions from './TablePaginationActions';

export default function VaultUsersTable({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const { pageSize, pageIndex } = table.getState().pagination;

    return (
        <Box sx={{ margin: 1 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableCell key={header.id} colSpan={header.colSpan} sx={{ backgroundColor: '#1b2f54', color: '#ffffff', fontWeight: 'bold' }}>
                                            {header.isPlaceholder ? null : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <ColumnFilter column={header.column} table={table} />
                                                        </div>
                                                    ) : null}
                                                </Box>
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                slotProps={{
                    select: {
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    },
                }}
                onPageChange={(_, page) => {
                    table.setPageIndex(page)
                }}
                onRowsPerPageChange={e => {
                    const size = e.target.value ? Number(e.target.value) : 10
                    table.setPageSize(size)
                }}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    )
}

function ColumnFilter({ column }) {
    const columnFilterValue = column.getFilterValue();

    return (
        <Paper variant='outlined' component='form' sx={{ paddingX: 1 }}>
            <InputBase
                value={(columnFilterValue ?? '')}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder={`Search...`}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Paper>
    )
}
