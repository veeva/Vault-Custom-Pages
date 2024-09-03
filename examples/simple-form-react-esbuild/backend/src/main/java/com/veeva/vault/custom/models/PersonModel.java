package com.veeva.vault.custom.models;

import com.veeva.vault.sdk.api.core.UserDefinedModel;
import com.veeva.vault.sdk.api.core.UserDefinedModelInfo;
import com.veeva.vault.sdk.api.core.UserDefinedProperty;
import com.veeva.vault.sdk.api.core.UserDefinedPropertyInclude;

@UserDefinedModelInfo(include = UserDefinedPropertyInclude.NON_NULL)
public interface PersonModel extends UserDefinedModel {
    @UserDefinedProperty(name = "first_name__sys", aliases = {"firstName"})
    String getFirstName();
    void setFirstName(String firstName);

    @UserDefinedProperty(name = "last_name__sys", aliases = {"lastName"})
    String getLastName();
    void setLastName(String lastName);

    @UserDefinedProperty(name = "email__sys", aliases = {"email"})
    String getEmail();
    void setEmail(String email);
}
