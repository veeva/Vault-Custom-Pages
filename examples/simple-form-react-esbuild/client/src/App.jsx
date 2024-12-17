import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

// Define the event name which will be handled in the Vault Java SDK server code
const CREATE_EMPLOYEE_RECORD_EVENT = "createEmployeeRecord";

export default function App({ sendEvent }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isCreatingEmployeeRecord, setIsCreatingEmployeeRecord] =
    useState(false);
  const [createdEmployeeRecordId, setCreatedEmployeeRecordId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Sends the "createEmployeeRecord" event to the server code with the required parameters.
   * Reads the response and loads the results and/or error message into state for display to the user.
   * @returns {Promise<void>}
   */
  const submitForm = async () => {
    if (firstName && lastName && email) {
      setIsCreatingEmployeeRecord(true);
      setErrorMessage("");

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
        const { id = "", error = "" } = createEmployeeResponse?.data;

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
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card sx={{ minWidth: 800, backgroundColor: "#f8f8f8", margin: 5 }}>
        <CardHeader
          title="Create Employee Records"
          sx={{ backgroundColor: "#1b2f54", color: "#ffffff", paddingY: 1 }}
        />
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { margin: 1, width: "100%" },
              display: "flex",
            }}
          >
            <TextField
              required
              id="first-name-input-field"
              label="First Name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              sx={{ backgroundColor: "#ffffff" }}
              InputLabelProps={{
                sx: { fontSize: 18 },
              }}
              InputProps={{
                sx: { fontSize: 18 },
              }}
            />
            <TextField
              required
              id="last-name-input-field"
              label="Last Name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              sx={{ backgroundColor: "#ffffff" }}
              InputLabelProps={{
                sx: { fontSize: 18 },
              }}
              InputProps={{
                sx: { fontSize: 18 },
              }}
            />
            <TextField
              required
              id="email-input-field"
              label="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              sx={{ backgroundColor: "#ffffff" }}
              InputLabelProps={{
                sx: { fontSize: 18 },
              }}
              InputProps={{
                sx: { fontSize: 18 },
              }}
            />
          </Box>
          {isCreatingEmployeeRecord ? (
            <CircularProgress />
          ) : (
            <>
              {errorMessage ? (
                <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
                  {errorMessage}
                </Typography>
              ) : (
                <>
                  {createdEmployeeRecordId ? (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: 16 }}
                    >
                      Created employee: {createdEmployeeRecordId}
                    </Typography>
                  ) : null}
                </>
              )}
            </>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={submitForm}
            disabled={!firstName || !lastName || !email}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
