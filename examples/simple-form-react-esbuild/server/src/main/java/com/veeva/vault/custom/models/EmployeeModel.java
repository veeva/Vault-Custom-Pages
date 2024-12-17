/*
 * --------------------------------------------------------------------
 * UserDefinedService:	EmployeeModel
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

package com.veeva.vault.custom.models;

import com.veeva.vault.sdk.api.core.UserDefinedModel;
import com.veeva.vault.sdk.api.core.UserDefinedModelInfo;
import com.veeva.vault.sdk.api.core.UserDefinedProperty;
import com.veeva.vault.sdk.api.core.UserDefinedPropertyInclude;

@UserDefinedModelInfo(include = UserDefinedPropertyInclude.NON_NULL)
public interface EmployeeModel extends UserDefinedModel {

    @UserDefinedProperty(name = "first_name__c")
    String getFirstName();
    void setFirstName(String first_name__c);

    @UserDefinedProperty(name = "last_name__c")
    String getLastName();
    void setLastName(String last_name__c);

    @UserDefinedProperty(name = "name__v")
    String getName();
    void setName(String name__v);

    @UserDefinedProperty(name = "email__c")
    String getEmail();
    void setEmail(String email__c);
}
