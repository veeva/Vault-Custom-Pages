package com.veeva.vault.custom.services;

import com.veeva.vault.sdk.api.core.*;
import com.veeva.vault.sdk.api.json.JsonArrayBuilder;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;
import com.veeva.vault.sdk.api.json.JsonService;
import com.veeva.vault.sdk.api.query.Query;
import com.veeva.vault.sdk.api.query.QueryExecutionRequest;
import com.veeva.vault.sdk.api.query.QueryService;

import java.util.List;

@UserDefinedServiceInfo
public class UserDataGridServiceImpl implements UserDataGridService {

    /**
     * Queries Vault for the initiating user's timezone and locale admin key
     * @return JsonObjectBuilder containing the initiating user's timezone and locale admin key
     */
    public JsonObjectBuilder getInitiatingUserInfo() {
        LogService logService = ServiceLocator.locate(LogService.class);
        QueryService queryService = ServiceLocator.locate(QueryService.class);
        JsonService jsonService = ServiceLocator.locate(JsonService.class);

        boolean isDebugEnabled = logService.isDebugEnabled();
        if (isDebugEnabled) {
            logService.debug("entering: getInitiatingUserInfo");
        }

        JsonObjectBuilder initUserJsonBuilder = jsonService.newJsonObjectBuilder();
        Query initiatingUserQuery = queryService.newQueryBuilder()
                .withSelect(VaultCollections.asList("TOLABEL(timezone__sys)", "locale__sysr.admin_key__sys"))
                .withFrom("user__sys")
                .withWhere("id = " + RequestContext.get().getInitiatingUserId())
                .build();

        QueryExecutionRequest initiatingUserQueryExecutionRequest = queryService.newQueryExecutionRequestBuilder()
                .withQuery(initiatingUserQuery)
                .build();

        queryService.query(initiatingUserQueryExecutionRequest)
                .onSuccess(queryExecutionResponse -> {
                    queryExecutionResponse.streamResults().forEach(queryExecutionResult -> {
                        List<String> timezoneList = queryExecutionResult.getValue("timezone__sys", ValueType.PICKLIST_VALUES);
                        String timezone = "";
                        if (timezoneList != null && !timezoneList.isEmpty()) {
                            timezone = timezoneList.get(0);
                        }
                        String locale = queryExecutionResult.getValue("locale__sysr.admin_key__sys", ValueType.STRING);

                        if (isDebugEnabled) {
                            logService.debug("timezone : {}", timezone);
                            logService.debug("locale : {}", locale);
                        }

                        initUserJsonBuilder.setValue("timezone__sys", timezone);
                        initUserJsonBuilder.setValue("localeAdminKey", locale);
                    });
                })
                .onError(queryOperationError -> {
                    if (logService.isErrorEnabled()) {
                        logService.error("Failed to query records : {}", queryOperationError.getMessage());
                    }
                })
                .execute();

        return initUserJsonBuilder;
    }

    /**
     * Queries Vault for the all users (limit 1000)
     * @return JsonArrayBuilder containing the users
     */
    public JsonArrayBuilder getAllUsersInfo() {
        LogService logService = ServiceLocator.locate(LogService.class);
        QueryService queryService = ServiceLocator.locate(QueryService.class);
        JsonService jsonService = ServiceLocator.locate(JsonService.class);

        boolean isDebugEnabled = logService.isDebugEnabled();
        if (isDebugEnabled) {
            logService.debug("entering: getAllUsersInfo");
        }

        // Limit query results to 1,000. This approach is not for use with larger data sets.
        Query userQuery = queryService.newQueryBuilder()
                .withSelect(VaultCollections.asList("id", "username__sys", "TOLABEL(timezone__sys)", "created_date__v"))
                .withFrom("user__sys")
                .withMaxRows(1000)
                .build();

        QueryExecutionRequest queryExecutionRequest = queryService.newQueryExecutionRequestBuilder()
                .withQuery(userQuery)
                .build();

        JsonArrayBuilder userRecords = jsonService.newJsonArrayBuilder();
        queryService.query(queryExecutionRequest)
                .onSuccess(queryExecutionResponse -> {
                    queryExecutionResponse.streamResults().forEach(queryExecutionResult -> {
                        JsonObjectBuilder userRecordJsonBuilder = jsonService.newJsonObjectBuilder();

                        String id = queryExecutionResult.getValue("id", ValueType.STRING);
                        String username = queryExecutionResult.getValue("username__sys", ValueType.STRING);
                        List<String> timezoneList = queryExecutionResult.getValue("timezone__sys", ValueType.PICKLIST_VALUES);
                        String timezone = "";
                        if (timezoneList != null && !timezoneList.isEmpty()) {
                            timezone = timezoneList.get(0);
                        }
                        String createdDate = queryExecutionResult.getValue("created_date__v", ValueType.DATETIME).toString();

                        if (isDebugEnabled) {
                            logService.debug("id : {}", id);
                            logService.debug("username : {}", username);
                            logService.debug("timezone : {}", timezone);
                            logService.debug("createdDate : {}", createdDate);
                        }

                        userRecordJsonBuilder.setValue("id", id);
                        userRecordJsonBuilder.setValue("username__sys", username);
                        userRecordJsonBuilder.setValue("timezone__sys", timezone);
                        userRecordJsonBuilder.setValue("created_date__v", createdDate);

                        userRecords.add(userRecordJsonBuilder.build());
                    });
                })
                .onError(queryOperationError -> {
                    if (logService.isErrorEnabled()) {
                        logService.error("Failed to query records : {}", queryOperationError.getMessage());
                    }
                })
                .execute();

        return userRecords;
    }
}