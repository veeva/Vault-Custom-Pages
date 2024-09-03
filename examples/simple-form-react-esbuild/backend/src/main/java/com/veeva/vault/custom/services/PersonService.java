/*
 * --------------------------------------------------------------------
 * UserDefinedService:	PersonService
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
import com.veeva.vault.sdk.api.json.JsonObjectBuilder;

@UserDefinedServiceInfo
public interface PersonService extends UserDefinedService {

    JsonObjectBuilder createPerson(PersonModel person);
}