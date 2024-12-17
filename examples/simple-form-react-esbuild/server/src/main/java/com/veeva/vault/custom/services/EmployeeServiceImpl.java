/*
 * --------------------------------------------------------------------
 * UserDefinedService:	EmployeeServiceImpl
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
package com.veeva.vault.custom.services;

import com.veeva.vault.custom.models.EmployeeModel;
import com.veeva.vault.sdk.api.core.*;
import com.veeva.vault.sdk.api.data.Record;
import com.veeva.vault.sdk.api.data.RecordBatchSaveRequest;
import com.veeva.vault.sdk.api.data.RecordService;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;
import com.veeva.vault.sdk.api.json.JsonService;

import java.util.List;

@UserDefinedServiceInfo
public class EmployeeServiceImpl implements EmployeeService {

    public static final String EMPLOYEE__C = "employee__c";
    public static final String NAME__V = "name__v";
    public static final String FIRST_NAME__C = "first_name__c";
    public static final String LAST_NAME__C = "last_name__c";
    public static final String EMAIL__C = "email__c";

    /**
     * Accepts an employee model and creates an employee__c record based on that model
     * @param employeeModel
     * @return JsonObjectBuilder containing the created record id or an error message
     */
    public JsonObjectBuilder createEmployee(EmployeeModel employeeModel) {
        LogService logService = ServiceLocator.locate(LogService.class);
        boolean isDebugEnabled = logService.isDebugEnabled();

        JsonService jsonService = ServiceLocator.locate(JsonService.class);
        JsonObjectBuilder createEmployeeResponseBuilder = jsonService.newJsonObjectBuilder();

        RecordService recordService = ServiceLocator.locate(RecordService.class);
        Record record = recordService.newRecord(EMPLOYEE__C);
        record.setValue(NAME__V, employeeModel.getName());
        record.setValue(FIRST_NAME__C, employeeModel.getFirstName());
        record.setValue(LAST_NAME__C, employeeModel.getLastName());
        record.setValue(EMAIL__C, employeeModel.getEmail());
        List<Record> records = VaultCollections.asList(record);

        RecordBatchSaveRequest saveRequest = recordService.newRecordBatchSaveRequestBuilder()
                .withRecords(records)
                .build();

        recordService.batchSaveRecords(saveRequest)
                .onSuccesses(batchOperationSuccess -> {
                    batchOperationSuccess.forEach(success -> {
                        if (isDebugEnabled) {
                            logService.debug("Created {} record with id: {}", EMPLOYEE__C, success.getRecordId());
                        }

                        createEmployeeResponseBuilder.setValue("id", success.getRecordId());
                    });
                })
                .onErrors(batchOperationErrors -> {
                    batchOperationErrors.stream().findFirst().ifPresent(error -> {
                        String errorMessage = String.format("Unable to create %s record: %s", EMPLOYEE__C, error.getError().getMessage());
                        if (isDebugEnabled) {
                            logService.debug(errorMessage);
                        }

                        createEmployeeResponseBuilder.setValue("error", errorMessage);
                    });
                })
                .execute();

        return createEmployeeResponseBuilder;
    }
}