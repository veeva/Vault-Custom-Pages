/*
 * --------------------------------------------------------------------
 * UserDefinedService:	PersonServiceImpl
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

import com.veeva.vault.custom.models.PersonModel;
import com.veeva.vault.sdk.api.core.*;
import com.veeva.vault.sdk.api.data.Record;
import com.veeva.vault.sdk.api.data.RecordBatchSaveRequest;
import com.veeva.vault.sdk.api.data.RecordService;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;
import com.veeva.vault.sdk.api.json.JsonService;

import java.util.List;

@UserDefinedServiceInfo
public class PersonServiceImpl implements PersonService {
    public static final String PERSON__SYS = "person__sys";
    public static final String FIRST_NAME__SYS = "first_name__sys";
    public static final String LAST_NAME__SYS = "last_name__sys";
    public static final String EMAIL__SYS = "email__sys";

    /**
     * Accepts a person model and creates a person__sys record based on that model
     * @param personModel
     * @return JsonObjectBuilder containing the created record id or an error message
     */
    public JsonObjectBuilder createPerson(PersonModel personModel) {
        LogService logService = ServiceLocator.locate(LogService.class);
        boolean isDebugEnabled = logService.isDebugEnabled();

        JsonService jsonService = ServiceLocator.locate(JsonService.class);
        JsonObjectBuilder jsonObjectBuilder = jsonService.newJsonObjectBuilder();

        RecordService recordService = ServiceLocator.locate(RecordService.class);
        Record record = recordService.newRecord(PERSON__SYS);
        record.setValue(FIRST_NAME__SYS, personModel.getFirstName());
        record.setValue(LAST_NAME__SYS, personModel.getLastName());
        record.setValue(EMAIL__SYS, personModel.getEmail());
        List<Record> records = VaultCollections.asList(record);

        RecordBatchSaveRequest saveRequest = recordService.newRecordBatchSaveRequestBuilder()
                .withRecords(records)
                .build();

        recordService.batchSaveRecords(saveRequest)
                .onSuccesses(batchOperationSuccess -> {
                    batchOperationSuccess.forEach(success -> {
                        if (isDebugEnabled) {
                            logService.debug("Created {} record with id: {}", PERSON__SYS, success.getRecordId());
                        }

                        jsonObjectBuilder.setValue("id", success.getRecordId());
                    });
                })
                .onErrors(batchOperationErrors -> {
                    batchOperationErrors.stream().findFirst().ifPresent(error -> {
                        String errorMessage = String.format("Unable to create %s record: %s", PERSON__SYS, error.getError().getMessage());
                        if (isDebugEnabled) {
                            logService.debug(errorMessage);
                        }

                        jsonObjectBuilder.setValue("error", errorMessage);
                    });
                })
                .execute();

        return jsonObjectBuilder;
    }
}