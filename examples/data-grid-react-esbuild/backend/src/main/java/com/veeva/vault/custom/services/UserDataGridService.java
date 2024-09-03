
package com.veeva.vault.custom.services;

import com.veeva.vault.sdk.api.core.UserDefinedService;
import com.veeva.vault.sdk.api.core.UserDefinedServiceInfo;
import com.veeva.vault.sdk.api.json.JsonArrayBuilder;
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;

@UserDefinedServiceInfo
public interface UserDataGridService extends UserDefinedService {

    JsonObjectBuilder getInitiatingUserInfo();
    JsonArrayBuilder getAllUsersInfo();
}