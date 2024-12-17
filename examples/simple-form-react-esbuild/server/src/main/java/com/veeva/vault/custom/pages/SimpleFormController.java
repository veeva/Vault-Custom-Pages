/*
 * --------------------------------------------------------------------
 * UserDefinedService:	SimpleFormController
 * Author:				RyanLacy @ Veeva
 * Date:				2024-08-15
 *---------------------------------------------------------------------
 * Description:
 *---------------------------------------------------------------------
 * Copyright (c) 2024 Veeva Systems Inc.  All Rights Reserved.
 *		This code is based on pre-existing content developed and
 * 		owned by Veeva Systems Inc. and may only be used in connection
 *		with the deliverable with which it was provided to Customer.
 *---------------------------------------------------------------------
 */

package com.veeva.vault.custom.pages;

import com.veeva.vault.custom.models.EmployeeModel;
import com.veeva.vault.custom.services.EmployeeService;
import com.veeva.vault.sdk.api.core.LogService;
import com.veeva.vault.sdk.api.core.ServiceLocator;
import com.veeva.vault.sdk.api.executeas.ExecuteAs;
import com.veeva.vault.sdk.api.executeas.ExecuteAsUser;
import com.veeva.vault.sdk.api.json.JsonObject;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;
import com.veeva.vault.sdk.api.json.JsonService;
import com.veeva.vault.sdk.api.page.PageController;
import com.veeva.vault.sdk.api.page.PageControllerInfo;
import com.veeva.vault.sdk.api.page.PageEventContext;
import com.veeva.vault.sdk.api.page.PageEventResponse;

@PageControllerInfo
@ExecuteAs(ExecuteAsUser.REQUEST_OWNER)
public class SimpleFormController implements PageController {

    // Define the event name(s) which can be sent from the client code
    public static final String CREATE_EMPLOYEE_RECORD_EVENT = "createEmployeeRecord";

    public PageEventResponse onEvent(PageEventContext context) {
        LogService logService = ServiceLocator.locate(LogService.class);
        JsonService jsonService = ServiceLocator.locate(JsonService.class);

        boolean isDebugEnabled = logService.isDebugEnabled();

        // Handle the "createEmployeeRecord" event sent by the client code
        if (context.getEventName().equals(CREATE_EMPLOYEE_RECORD_EVENT)) {
            if (isDebugEnabled) {
                logService.debug("Entering: createEmployeeRecord event");
            }

            // Read the parameters provided by the client code into a User Defined Model
            EmployeeModel employeeModel = jsonService.convertToUserDefinedModel(context.getData(), EmployeeModel.class);
            if (employeeModel.getFirstName() == null || employeeModel.getLastName() == null || employeeModel.getName() == null || employeeModel.getEmail() == null) {
                if (isDebugEnabled) {
                    logService.debug("All required parameters were not provided");
                }

                // Return an error response to the client code if missing any required parameters
                return context.newEventErrorResponseBuilder()
                        .withTitle("Missing Required Parameters")
                        .withUserMessage("All required parameters were not provided")
                        .build();
            } else {
                // Invoke a User Defined Service method to create an employee__c record, which returns a
                // JsonObjectBuilder containing the created record ID or an error message
                EmployeeService employeeService = ServiceLocator.locate(EmployeeService.class);
                JsonObjectBuilder createEmployeeResponseBuilder = employeeService.createEmployee(employeeModel);

                // Return a JsonObject containing the created employee ID or an error message to the client code
                JsonObject createEmployeeResponse = createEmployeeResponseBuilder.build();
                return context.newEventResponseBuilder()
                        .withData(createEmployeeResponse)
                        .build();

            }
        } else {
            // Return an error response if the client code provided an unexpected event name
            String invalidEventUserMessage = String.format("Event [%s] is not handled", context.getEventName());
            return context.newEventErrorResponseBuilder()
                    .withTitle("Invalid Event Name")
                    .withUserMessage(invalidEventUserMessage)
                    .build();
        }
    }
}
