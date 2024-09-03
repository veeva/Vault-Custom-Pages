package com.veeva.vault.custom.pages;

import com.veeva.vault.custom.services.UserDataGridService;
import com.veeva.vault.sdk.api.core.LogService;
import com.veeva.vault.sdk.api.core.ServiceLocator;
import com.veeva.vault.sdk.api.executeas.ExecuteAs;
import com.veeva.vault.sdk.api.executeas.ExecuteAsUser;
import com.veeva.vault.sdk.api.json.JsonArrayBuilder;
import com.veeva.vault.sdk.api.json.JsonObject;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;
import com.veeva.vault.sdk.api.json.JsonService;
import com.veeva.vault.sdk.api.page.PageController;
import com.veeva.vault.sdk.api.page.PageControllerInfo;
import com.veeva.vault.sdk.api.page.PageLoadContext;
import com.veeva.vault.sdk.api.page.PageLoadResponse;

@PageControllerInfo
@ExecuteAs(ExecuteAsUser.REQUEST_OWNER)
public class DataGridController implements PageController {

    public PageLoadResponse onLoad(PageLoadContext context) {
        LogService logService = ServiceLocator.locate(LogService.class);
        JsonService jsonService = ServiceLocator.locate(JsonService.class);
        UserDataGridService userDataGridService = ServiceLocator.locate(UserDataGridService.class);

        boolean isDebugEnabled = logService.isDebugEnabled();
        if (isDebugEnabled) {
            logService.debug("DataGridController onLoad");
        }

        JsonObjectBuilder jsonObjectBuilder = jsonService.newJsonObjectBuilder();

        JsonObjectBuilder initUserJsonBuilder = userDataGridService.getInitiatingUserInfo();
        jsonObjectBuilder.setValue("initiatingUser", initUserJsonBuilder.build());

        JsonArrayBuilder allUsersJsonBuilder = userDataGridService.getAllUsersInfo();
        jsonObjectBuilder.setValue("userRecords", allUsersJsonBuilder.build());

        JsonObject json = jsonObjectBuilder.build();

        return context.newLoadResponseBuilder()
                .withData(json)
                .build();
    }
}
