import { useEffect, useMemo, useState } from 'react';
import { query, formatDateTime, queryByPage } from '../utils/DataGridUtils';

export default function useVaultEmployees() {
    const [employeeTableData, setEmployeeTableData] = useState([]);
    const [isExecutingQuery, setIsExecutingQuery] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    /**
     * Executes a VQL query to retrieve Employee data from Vault
     */
    const submitInitialEmployeeQuery = async () => {
        setIsExecutingQuery(true);
        const queryString =
            'SELECT id, name__v, email__c, created_date__v FROM employee__c';

        try {
            const queryResponse = await query(queryString);
            if (queryResponse) {
                processEmployeeQueryResponse(queryResponse);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsExecutingQuery(false);
        }
    };

    /**
     * Executes a paginated VQL query to retrieve data from Vault
     * @param {string} page - the next_page or previous_page URL to retrieve
     */
    const queryPage = async (page) => {
        setIsExecutingQuery(true);

        try {
            const queryResponse = await queryByPage(page);
            if (queryResponse) {
                processEmployeeQueryResponse(queryResponse);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsExecutingQuery(false);
        }
    };

    /**
     * Process a VQL query response. Converts the query response data into the format expected by @tanstack/react-table and loads it into state.
     * @param {Object} response - the VQL query response
     */
    const processEmployeeQueryResponse = (response) => {
        // Extract the next/previous page URLs from the response details, to support pagination
        setPreviousPage(response?.responseDetails?.previous_page || null);
        setNextPage(response?.responseDetails?.next_page || null);

        // Process the query results into the format expected by @tanstack/react-table
        const employeeData = response?.data?.map((employee) => {
            // Convert the created_date__v field to human-friendly format
            const formattedCreatedDate = formatDateTime({
                utcDateTimeString: employee.created_date__v,
            });

            return {
                id: employee.id,
                name__v: employee.name__v,
                email__c: employee.email__c,
                created_date__v: formattedCreatedDate,
            };
        });

        // Load the data into state
        setEmployeeTableData(employeeData);
    };

    // Define the table columns
    const tableColumns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: () => 'ID',
                footer: (props) => props.column.id,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'name__v',
                header: () => 'Name',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'email__c',
                header: () => 'Email',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'created_date__v',
                header: 'Created Date (UTC)',
                footer: (props) => props.column.id,
                enableColumnFilter: false,
            },
        ],
        [],
    );

    /**
     * On page load, execute the initial query for Employee data
     */
    useEffect(() => {
        submitInitialEmployeeQuery();
    }, []);

    return {
        employeeTableData,
        tableColumns,
        isExecutingQuery,
        nextPage,
        previousPage,
        queryPage,
    };
}
