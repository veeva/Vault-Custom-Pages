import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import VaultEmployeesTable from "./components/VaultEmployeesTable";
import useVaultEmployees from "./hooks/useVaultEmployees";
import React from "react";

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
    <Box sx={{ display: "flex", flexDirection: "column", maxHeight: 800 }}>
      <Card
        sx={{
          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
          color: "#1b2f54",
          backgroundColor: "#f5f5f5",
          marginX: 1,
          marginY: 2,
          padding: 2,
          flex: "0 0 auto",
        }}
      >
        <Typography variant="h4" component="div">
          Employees
        </Typography>
      </Card>
      <Box
        sx={{
          height: 500,
          marginX: 1,
          flex: "1 1 auto",
        }}
      >
        {isExecutingQuery ? (
          <Skeleton variant="rectangular" animation="pulse" height={500} />
        ) : (
          <VaultEmployeesTable
            {...{ employeeTableData, tableColumns }}
          />
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", gap: 1, margin: 1 }}
      >
        <Button
          variant="contained"
          size="small"
          disabled={!previousPage}
          onClick={() => queryPage(previousPage)}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={!nextPage}
          onClick={() => queryPage(nextPage)}
        >
          Next Page
        </Button>
      </Box>
    </Box>
  );
}
