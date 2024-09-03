package com.veeva.vault.custom.pages;

import com.veeva.vault.custom.models.PersonModel;
import com.veeva.vault.custom.services.PersonService;
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

    public static final String CREATE_PERSON_RECORD_EVENT = "createPersonRecord";

    public PageEventResponse onEvent(PageEventContext context) {
        LogService logService = ServiceLocator.locate(LogService.class);
        JsonService jsonService = ServiceLocator.locate(JsonService.class);

        boolean isDebugEnabled = logService.isDebugEnabled();

        if (context.getEventName().equals(CREATE_PERSON_RECORD_EVENT)) {
            if (isDebugEnabled) {
                logService.debug("Entering: createPersonRecord event");
            }

            PersonModel personModel = jsonService.convertToUserDefinedModel(context.getData(), PersonModel.class);
            if (personModel.getFirstName() == null || personModel.getLastName() == null || personModel.getEmail() == null) {
                if (isDebugEnabled) {
                    logService.debug("Missing required parameters");
                }

                JsonObject jsonObject = jsonService.newJsonObjectBuilder()
                        .setValue("error", "Missing required parameters")
                        .build();

                // In the future will use newEventErrorResponseBuilder
                return context.newEventResponseBuilder()
                        .withData(jsonObject)
                        .build();
            } else {
                PersonService personService = ServiceLocator.locate(PersonService.class);
                JsonObjectBuilder jsonObjectBuilder = personService.createPerson(personModel);

                JsonObject json = jsonObjectBuilder.build();

                return context.newEventResponseBuilder()
                        .withData(json)
                        .build();
            }
        } else {
            JsonObject jsonObject = jsonService.newJsonObjectBuilder()
                    .setValue("error", "Failed to match on an event")
                    .build();

            // In the future will use newEventErrorResponseBuilder
            return context.newEventResponseBuilder()
                    .withData(jsonObject)
                    .build();
        }
    }
}
