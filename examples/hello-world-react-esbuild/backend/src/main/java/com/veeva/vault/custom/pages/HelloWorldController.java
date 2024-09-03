package com.veeva.vault.custom.pages;

import com.veeva.vault.sdk.api.core.RequestContext;
import com.veeva.vault.sdk.api.core.ServiceLocator;
import com.veeva.vault.sdk.api.executeas.ExecuteAs;
import com.veeva.vault.sdk.api.executeas.ExecuteAsUser;
import com.veeva.vault.sdk.api.json.JsonObject;
import com.veeva.vault.sdk.api.json.JsonService;
import com.veeva.vault.sdk.api.page.PageController;
import com.veeva.vault.sdk.api.page.PageControllerInfo;
import com.veeva.vault.sdk.api.page.PageLoadContext;
import com.veeva.vault.sdk.api.page.PageLoadResponse;

@PageControllerInfo
@ExecuteAs(ExecuteAsUser.REQUEST_OWNER)
public class HelloWorldController implements PageController {

    @Override
    public PageLoadResponse onLoad(PageLoadContext context) {
        JsonService jsonService = ServiceLocator.locate(JsonService.class);

        JsonObject json = jsonService.newJsonObjectBuilder()
            .setValue("userId", RequestContext.get().getInitiatingUserId())
            .build();

        return context.newLoadResponseBuilder()
            .withData(json)
            .build();
    }
}
