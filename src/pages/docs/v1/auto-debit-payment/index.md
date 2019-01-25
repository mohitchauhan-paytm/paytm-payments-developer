---
path:  "/docs/v1/auto-debit-payment/index.md"
title: "Paytm Auto Debit Payment: Accept Payments on your website"
---

import * as style from './auto-debit-payment.module.scss';


# Paytm Auto-Debit Payment

Auto-debit is a one-click payment experience for your website or mobile app enabling payments via Paytm Wallet and Paytm Postpaid. Your customers need to authorize and link their Paytm account with your application once and enjoy superfast checkout every time after that. Auto-debit also enables adding money to user’s Paytm account within your application itself ensuring higher payment success rates.

#### Please note: Paytm Auto-Debit is only available to select enterprise customers with high transaction volumes and established businesses. [Get in touch]() to request access to Paytm Auto-Debit payment solution.

## Demo of Paytm Auto-Debit


insert a GIF here

## Overview of payment processing via Paytm Auto-Debit

1. User visits your website or mobile application
2. You ask the user to link her Paytm account for seamless payments
3. You initiate the account linking process using [Send OTP API](), [Validate OTP API]()
4. Once user account is successfully linked, Paytm shares the user SSO_TOKEN with you
5. User adds goods/services into the shopping/order cart
6. You calculate the total amount and call the Paytm [check balance API]()
7. Paytm returns if the user has sufficient balance for the transaction. If not, you initiate the [add money process]() with  the differential amount 
8. Call the [withdraw API]() to withdraw the money from user paytm account 
9. Call the [Transaction Status API]() to verify the transaction response
10. Notify the payment status to user and proceed with the order/service fulfillment 

need a flow diagram here


## Steps in processing payments via Paytm Auto-Debit

### STEP 1: Get your authentication keys

##### Please note: Paytm Auto-Debit is only available to select enterprise customers with high transaction volumes and established businesses. Get in touch to request access to Paytm Auto-Debit payment solution

1. Client ID: a unique alphanumeric identifier issued by Paytm for your account
2. Client Secret: a unique alphanumeric key issued by Paytm for your account 
3. MID: A unique merchant identifier issued by Paytm for your account
4. Merchant Key: A 16-digit unique identifier issued by Paytm for your account

Note: ```Client Secret``` and ```Merchant Key``` are secret keys used for encryption so never share these with anyone

### STEP 2: Link a user’s Paytm account with your application

Use the following APIs to link a paytm account, validate the linked account and remove linked account

--- Need flow diagram here for account linking ---

* Link user’s Paytm Account
    * [Send OTP API](): Send user’s email ID or 10-digit mobile number to Paytm. We will send an OTP to the user’s mobile number to continue with authorization
    * [Verify OTP API](): Accept the OTP entered by user, verify it and receive the ```user token```. The validity of the token will always be verified by your Paytm ```Client ID``` that is provided by Paytm
* Validate account linking
    * [Validate Token API](): Validate and fetch user information 
* Remove account linking
    * [Revoke Access API](): Used for expiring user’s token. This is required when a customer deletes/delink his/her account or logs in with a new mobile number in your application


#### Send OTP API

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### URLs:

###### Testing: [https://accounts-uat.paytm.com/signin/otp]()
###### Production: [https://accounts.paytm.com/signin/otp]()

##### Request - This will be in JSON format in request body.

| Parameter  | Mandatory    | Example Value | Description |
| ------------- | ----- | ----- | ---- |
| Email | No | abc@gmail.com | Email id of end user |
| Phone | Yes | 5558889990 | Phone number of end user |
|clientId | Yes |merchant-ABC|Merchant’s client id shared by Paytm|
| Scope | Yes | Wallet ,Paytm |Name of the resource for which token is required(will be shared by Paytm)|
| responseType | Yes | Token |Oauth 2 token |

##### Sample Request:

```json
{
  "email":"example@example.com",
  "phone":"5558889990",
  "clientId":"merchant-ABC",
  "scope":"wallet",
  "responseType":"token"
}

```

##### Response- This will be in json format in response body.

##### Success:


|Parameter|Example Value|Description|
|-----|----|----|
|Status|SUCCESS/FAILURE|Request status|
|responseCode|01 / 02 (Note: 01-login, 02-Register)|Response code|
|state|65cb6680-29f6-11e4-aad2-3c970ea8b87f|Reference guid to be used while submitting otp|


##### Sample response:

```json
{  
  "status":"SUCCESS",
  "responseCode":"01",
  "state":"65cb6680-29f6-11e4-aad2-3c970ea8b87f"
}
```

##### Error Responses:


|Parameter|Example Value|Description|
|-----|----|----|
|Status|FAILURE|Response status|
|responseCode|434|Response code|
|Message|"Bad Request"|Error reason|


##### Sample response:

```json
{
  "status":"FAILURE",
  "responseCode":"434",
  "message":"Bad Request"
}
```



#### ERROR CODES


| | |
|---| -----|
|430|Invalid Authorization|
|431|Invalid Mobile|
|432|Login Failed|
|433|Account Blocked|
|434|Bad Request|
|465|Invalid Email|

##### CURLs Command

```bash
CURLs -X POST -H "Content-Type: application/json" -d'{"email":"example@example.com","phone":"5558889990","clientId":"merchant-ABC","scope":"wallet","responseType":"token" }' '<OauthURLs>/signin/otp
```


#### Verify OTP API

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### URLs:

###### Testing: [https://accounts-uat.Paytm.com/signin/validate/otp]()
###### Production: [https://accounts.Paytm.com/signin/validate/otp]()

##### Request -

##### Header:


<!-- |Parameter|Mandatory|Example Value|Description|
|----|---|----|---|
|Authorization|Yes|Basic dGVzdGNsaWVudDplODY3MDlkOS1iMjM4LTQ4MjMtODVkYi05zZhMTY5YjMyNTg=|This is a base64 encoded string of “clientId:clientSecret”| -->

<table><thead><tr><th>Parameter</th><th>Mandatory</th><th>Example Value</th><th>Description</th></tr></thead><tbody><tr><td>Authorization</td><td>Yes</td><td className={`${style.bsc}`}>Basic dGVzdGNsaWVudDplODY3MDlkOS1iMjM4LTQ4MjMtODVkYi05zZhMTY5YjMyNTg=</td><td>This is a base64 encoded string of “clientId:clientSecret”</td></tr></tbody></table>

##### Body- This will be in json format in request body.



|Parameter|Mandatory|Example Value|Description|
|----|-----|----|----|
|Otp|Yes|123456|otp sent to user|
|State|Yes|65cb6680-29f6-11e4-aad2-3c970ea8b87f|State guid returned in the “send otp” needs to be passed here|


##### Sample request:

```json
{  
  "otp":"324569",
  "state":"65cb6680-29f6-11e4-aad2-3c970ea8b87f"
}
```

##### Response - Success


|Parameter|Example Value|Description|
|----|----|----|
|access_token|003d34901c47-3217-4e92-a291-5ef84a00de1e|access token for the user to be used in all further calls|
|Expires|1429175369162|Epoch expiry time of token|
|Scope|Wallet|Name of the resource for which token is required|
|resourceOwnerId|123456|customer id of Paytm|


##### Sample response:


```json
{  
"access_token":"c748d624-d92a-4599-b954-5c6274e01552",
"expires":1415880416918,
"scope":"wallet",
"resourceOwnerId":"123456"
}
```

##### Error Responses -


|Parameter|Example Value|Description|
|----|----|----|
|Status|FAILURE|Response status|
|responseCode|434|Response code|
|Message|"Bad Request"|Error reason|

##### Sample response:

```json
{
  "status":"FAILURE",
  "responseCode":"403",
  "message":"Invalid Otp"
}
```

#### Error Code:

|  |  |
|----|----|
|430|Invalid Authorization|
|434|Bad Request|
|403|Invalid OTP|
|513|Invalid Code|
|432|Login Failed|

##### CURLs Command –

```bash
cURLs -X POST -H "Authorization: Basic dGVzdGNsaWVudDplODY3MDlkOS1iMjM4LTQ4MjMtODVkYi05zZhMTY5YjMyNTg=" -H "Content-Type: application/json" -d'{     "otp":"324569",   "state":"65cb6680-29f6-11e4-aad2-3c970ea8b87f" }' '<OauthURLs>/signin/validate/otp'
```

#### Validate Token API

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### URLs:

###### Testing: [https://accounts-uat.Paytm.com/user/details]()
###### Production: [https://accounts.Paytm.com/user/details]()

##### Request -

##### Header:


|Parameter|Mandatory|Example Value|Description|
|-----|------|----|-----|
|session_token|Yes|003d34901c47-3217-4e92-a291-5ef84a00de1e|This is the user’s access token|


##### Response - Success


|Parameter|Example Value|Description|
|----|-----|-----|
|Id|123456|customer id|
|Email|example@gmail.com|user’s email address|
|Mobile|5558889990|user’s phone number|
|Expires|1429175369162|Epoch expiry time of token|


##### Sample response:

```json
{
"id":”123456”,
"email":"example@gmail.com",
"mobile":5558889990,
"expires":"1429175369162" ,
}
```

##### Error Responses


|Parameter Name|Example Value|Description|
|-----|----|----|
|Status|FAILURE|Response status|
|responseCode|530|Response code|
|Message|"Invalid Token"|Error reason|


##### Sample response:

```json
{
  "status":"FAILURE",
  "responseCode":"530",
  "message":"Invalid Token"
}
```

##### Error Code:

| | |
|----|----|
|530|Invalid Token|
|434|Bad Request|

##### CURLs Command –

```bash
CURLs -H "session_token: 003d34901c47-3217-4e92-a291-5ef84a00de1e" '<OauthURLs>/user/details'
```

The token issued can expire due to any of the following reasons -
* Token expires as per its validity date
* User revokes access for particular merchant by logging in on Paytm.com
* User changes her password by clicking “forgot password” on Paytm.com
* User “signs out from all active sessions..

#### Revoke Access API

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### URLS:

###### Testing: [https://accounts-uat.Paytm.com/oauth2/accessToken/<session_token>]()
###### Production: [https://accounts.Paytm.com/oauth2/accessToken/<session_token>]()

##### Request:

##### URLs Parameter:


|Parameter|Mandatory|Description|Example Value|
|-----|-----|-----|----|
|session_token|Yes|This is the user’s access token.|003d34901c47-3217-4e92-a291-5ef84a00de1e|


##### Header:



|Parameter|Mandatory|Description|Example Value|
|-----|-----|------|----|
|Authorization|Yes|This is a base64 encoded string of “clientId:clientSecret”|Basic dGVzdGNsaWVudDplODY3MDlkOS1iMjM4LTQ4MjMtODVkYi05zZhMTY5YjMyNTg=|

##### Body - Request body is not required for this API.


##### Response- It should be handled on HTTP response codes only.


|HTTP Code|Description|
|-----|-----|
|200|Access token successfully deleted.|
|404|Access token not found.|
|401|Authorization header invalid.|

##### CURLs Command –

```bash
cURLs -X DELETE '<OauthURLs>/oauth2/accessToken/003d34901c47-3217-4e92-a291-5ef84a00de1e'
```

### STEP 3: Check Balance and Add Money

You must ensure user has enough balance to pay for the order by calling the [CheckBalance API]().

Need flow diagram here for check balance and add money


1. Call the check balance API with the amount required for the order
2. Paytm validates if given amount exists in any Paytm proprietary payment instrument (Paytm Balance and Paytm Postpaid)
3. If any of the proprietary payment instruments don’t have sufficient balance then API returns the differential Amount. 
For example 
if User wallet have 100 Rs and postpaid have 150 Rs and transaction amount is 220 Rs then any of the instrument didn’t have the sufficient funds so in this case this API returns the differential amount of transaction amount and wallet amount (220 - 100 = 120), so you can ask use to do the add money of differential amount ( 120 Rs ) in his/her wallet 
4. In case user needs to add money to pay for an order, you call the Paytm [Add Money API]()

#### Check Balance API

##### URLS:

###### Production: [https://securegw.paytm.in/paymentservices/pay/consult]()
###### Staging: [https://securegw-stage.paytm.in/paymentservices/pay/consult]()

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### REQUEST PARAMS:

##### Head

|S.NO|NAME|DESCRIPTION|TYPE|REQUIRED|SAMPLE|
|----|----|----|----|----|
|1|clientId|api client id|String|M|"C11"|
|2|version|api version|String|M|V1|
|3|requestTimestamp|request timestamp|String|M|1507207412152|
|4|channelId|request channel|String|M|WEB|
|5|signature|checksum value|String|M|CHECKSUMHASH|


##### Body


|S.NO|NAME|DESCRIPTION|TYPE|REQUIRED|REMARK|
|----|----|----|----|----|---|
|1|userToken|Patym token issued for user|String|C|One of user token or user mobile number is mandatory|
|2|totalAmount|proposed transaction amount, in case of preauth it will be preauth amount|Decimal|M|
|3|amountDetails|amount breakup in case amount is of specific category|Json|O|
|4|Mid|merchant identifier|String|M|
 

##### Amount Details Object


|S.NO|NAME|DESCRIPTION|TYPE|REQUIRED|REMARK|
|----|---|----|---|---|---|
|1|{amount category}|specific category for which amount is to be deducted eg. "food" : 100.00|Decimal|C|Atleast one of the amount is mandatory|


##### SAMPLE REQUEST

```json
{
    "head": {
                "clientId": "C11",
                "version": "v1",
                "requestTimestamp": "1507207312139",
                "channelId": "WEB",
                "signature": "<CHECKSUMHASH>"
    },
    "body": {
                "userToken": "c4235943-30c3-47f7-acbc-979dd11ccc7d",
                "totalAmount": "500.00",
                "amountDetails": {
                            "food": "100.00"
                }
    }
}
```

##### RESPONSE PARAMS


##### Head:


|S.NO|NAME|DESCRIPTION|TYPE|REQUIRED|SAMPLE|
|---|----|---|---|----|----|
|1|clientId|api client id|String|M|C11|
|2|version|api version|String|M|V1|
|3|requestTimestamp|request timestamp|String|M|1507207412152|
|4|channelId|request channel|String|M|WEB|
|5|signature|checksum value|String|M|CHECKSUMHASH|

##### Body:


|S.NO|NAME|DESCRIPTION|TYPE|
|----|----|----|----|
|1|fundsSufficient|if transaction can be done via Paytm without adding money.|Boolean|
|2|addMoneyAllowed|if add money can be done to complete the transaction true in case funds are not sufficient but transaction can be completed by doing add money false otherwise|Boolean|
|3|deficitAmount|Amount that needs to be added for completing the transaction|Decimal|
|4|resultInfo|json for result info|Json|

##### ResultInfo


|S.NO|NAME|DESCRIPTION|TYPE|
|----|---|-----|----|
|1|resultStatus|Staus : SUCESS/FAILURE|String|
|2|resultCode|Status code in case of sucess/failure|String|
|3|resultMsg|Status message in case of sucess/failure|String|


##### Status Codes

|   |   |
|---|---|
|CS_0000|Request served successfully.
|CS_0001|Invalid request/ requestBody received.
|CS_0002|Invalid userToken received.
|CS_0004|Invalid amount received.
|CS_0005|Neither User token nor AgreementId was in the request.
|AGM_0006|Agreement does not exists.
|AGM_0007|Agreement status is invalid.
|GE_0003|We could not get the requested details. Please try again.
|GE_0001|Unknown Error
|GE_1|Unauthorized Access
|GE_2|Bad request
|GE_1026|We can not process your request. Please try later.
|GE_1027|User doesn't exist.
|GE_1043|Merchant does not exist
|GE_1035|Merchant is in inactive state.
|RWL_2001|You will exceed allowed debit transaction amount in wallet.


##### Sample Response

* Sufficient balance with wallet


```json
{
    "head": {
                "clientId": "C11",
                "version": "v1",
                "responseTimestamp": "1507207412152",
                "signature": "<CHECKSUMHASH>"
    },
    "body": {
                "fundsSufficient": true,
                "addMoneyRequired": false,
                "deficitAmount": "0",
                "resultInfo": {
                            "resultCode": "00023424/234234234",
                            "resultStatus": "Sucesss",
                            "resultMsg": "Sucess"
                }
    }
}
```


*  Sufficient balance with Postpaid

```json
{
    "head": {
                "clientId": "C11",
                "version": "v1",
                "responseTimestamp": "1507207412152",
                "signature": "<CHECKSUMHASH>"
    },
    "body": {
                "fundsSufficient": true,
                "addMoneyRequired": false,
                "deficitAmount": "0",
                "resultInfo": {
                            "resultCode": "00023424/234234234",
                            "resultStatus": "Sucesss",
                            "resultMsg": "Sucess"
                }
    }
}
```

* Insufficient balance Add Money allowed

```json
{
    "head": {
                "clientId": "C11",
                "version": "v1",
                "responseTimestamp": "1507207412152",
                "signature": "<CHECKSUMHASH>"
    },
    "body": {
                "fundsSufficient": false,
                "addMoneyRequired": true,
                "deficitAmount": "100.00",
                "resultInfo": {
                            "resultCode": "00023424/234234234",
                            "resultStatus": "Sucesss",
                            "resultMsg": "Sucess"
                }
    }
}
```


* Insufficient balance & Add Money not allowed

```json
{
    "head": {
                "clientId": "C11",
                "version": "v1",
                "responseTimestamp": "1507207412152",
                "signature": "<CHECKSUMHASH>"
    },
    "body": {
                "fundsSufficient": false,
                "addMoneyRequired": false,
                "deficitAmount": "100.00",
                "resultInfo": {
                            "resultCode": "00023424/234234234",
                            "resultStatus": "Success",
                            "resultMsg": "Success"
                }
    }
}
```


#### Add Money API


Create an HTML form and redirect user to Paytm for add money request

<div>
<span><img src='/assets/tag-post.svg'/></span>
</div>

##### URLs

###### Production: [https://securegw.Paytm.in/theia/processTransaction]()
###### Testing: [https://securegw-staging.Paytm.in/theia/processTransaction]()

##### Mandatory Parameters:

|Parameter Name|Description|Type|Length|
|----|----|----|----|
|REQUEST_TYPE|Transaction Type: ADD_MONEY|Alpha|50|
|MID|This is the “Merchant Identifier” that is issued by Paytm to the Merchant. This is unique for each merchant that integrates with Paytm|Alphanumeric|50|
|ORDER_ID|The “Order ID” is the Merchant’s Transaction ID which should be unique for every transaction. Duplicate order id will be rejected by the Paytm gateway|Alphanumeric|50|
|CUST_ID|The “Customer ID” is the customer identifier. This could be a unique user Id that the Merchant has assigned to its customers. This parameter is required for correlating the user to a transaction. Multiple transactions can have the same Application User Name if the same customer is performing multiple transactions. The Application User Name is used by Paytm’s fraud prevention engine for detecting fraudulent transactions/users. Special characters e.g @, ! ,_ $ are allowed|Alphanumeric|50|
|TXN_AMOUNT|This is the “Transaction Amount” that is to be charged the customer’s credit card /debit card /bank account / Paytm Wallet. Only numeric values are allowed. Please ensure  that  the amount is in the same currency as defined for the Merchant ID being used.
|Numeric|50|
|CHANNEL_ID|Channel IDs need to pass in this parameter. Ex: <br/>1. WEB – for desktop websites<br/>2. WAP – for mobile websites|Alphanumeric|50|
|INDUSTRY_TYPE_ID|Industry type should pass here. This will be provided by Paytm. Ex: “Retail1”|Alphanumeric|50|
|WEBSITE|WEBSITE Name should passed here This will be provided by Paytm|Alphanumeric|50|
|CHECKSUMHASH|Checksum calculated based on pre-defined logic. Checksum is used to ensure data is not tempered when request is posted on the Paytm URLS. In case of checksum mismatch due to data tempering Paytm will reject the transaction.|Alphanumeric|
|SSO_TOKEN|SSO_TOKEN of user|Alphanumeric|15|


##### Response Sent by Paytm



|Parameter|Description|Type|Mandatory|
|----|-----|----|-----|
|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation|Alphanumeric|Yes|
|TXNID|This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the merchant.|Numeric (length: upto 64 digits, datatype: long)|Yes|
|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|Yes|
|BANKTXNID|The transaction Id sent by the bank/wallet (NULL or empty string if the transaction doesn't reaches to the bank).|Alphanumeric|Yes|
|TXNAMOUNT|The amount of the transaction.|Numeric|Yes|
|CURRENCY|Currency used for transaction.<br/>INR<br/>USD|Alphanumeric|Yes|
|STATUS|This contains the transaction status and has only three values:<br/>TXN_SUCCESS<br/>TXN_FAILURE<br/>TXN_PENDING|Alphanumeric|Yes|
|RESPCODE|This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list.|Alphanumeric|Yes|
|RESPMSG|This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure.|Alphanumeric|Yes|
|TXNDATE|Date of transaction.|DateTime|Yes|
|GATEWAYNAME|Gateway used by Paytm (ICICI/CITI/WALLET etc)|Alphanumeric|Yes|
|BANKNAME|Bank name of the card issuing bank.|Alphanumeric|Yes|
|PAYMENTMODE|The payment mode used for transaction.|Alphanumeric|Yes|
|CHECKSUMHASH|Checksum calculated based on pre-defined logic|Alphanumeric|Yes|


### STEP 4: Debit amount from user’s Paytm account and confirm transaction

Now that you have ensured that your customer has enough balance to pay for the order, you can debit the amount using the [Withdraw API]() and confirm the transaction using transaction status API

Need flow diagram here for withdraw and transaction status

#### Withdraw API


##### Checksum required: YES

##### URLS:

###### Testing: [https://securegw-staging.paytm.in/order/directPay]()
 
###### Production: [https://securegw.paytm.in/order/directPay]()



|S. NO|NAME|DESCRIPTION|LENGTH/TYPE|Required|
|----|---|----|----|----|
|1|MID|Merchant unique Identifier provided by Paytm|String, 20 char|yes|
|2|ReqType|Value is always “WITHDRAW”|String|yes|
|3|TxnAmount|Transaction amount, total amount including subwallet amounts|Float, 2 decimal|yes|
|4|AppIP|Ip of the device by which call is initiated|String<br/>127.0.0.1|yes|
|5|OrderId|Unique identification order id (this value must be unique for every request)|String/64 char, Alphanumeric no special character except “-”,”_”,”@”  |yes|
|6|DeviceId|Unique identification no the Device|String,16 char|yes|
|7|Currency|Currency in which transaction in initiated by default INR|  |yes|
|8|SSOToken|Paytm user SSO_TOKEN for the identification of user|GUIDguid|yes|
|9|PaymentMode|The payment mode used for transaction. PPI for Wallet txn|Value is always PPI in case of deduct from wallet|String|yes|
|10|CustId|Unique customer identification no for merchant user|String,32 char|yes|
|11|IndustryType|Industry type is provided by Paytm|String, 16 char|yes|
|12|Channel|Channel by which transaction is initiated<br/>WEB or WAP|String|yes|
|13|AuthMode|Possible values of this parameter:<br/>3D – Credit/Debit card & Operator Billing payment mode<br/>USRPWD – for Net banking/Wallet payment mode.|String|yes|
|14|checkSum|CheckSum generated as per some logic by Paytm. This needs to be verified by the merchant.|String, 256 char|yes|
|15|MercUnqRef|User defined parameter|String, 128 char, alphanumeric no special character except “-”,”_”,”@”  |no|
|16|PROMO_CAMP_ID|This parameter is required to pass when merchant is running any promotional campaign and it is configured at paytm payment gateway.Merchant will get in contact with Paytm to launch any promocode campaign|String|no|
|17|subwalletAmount|This parameter is required to limit the maximum amount that could be deducted from a particular subwallet.|Map<UserSubWalletType, BigDecimal><br/>"subwalletAmount": {"FOOD": "2"}<br/>Possible keys: FOOD, GIFT, MULTI_PURPOSE_GIF,TOLL, FUEL, CASHBACK, GIFT_VOUCHER|no|



##### Sample Request:

```bash
https://securegw.paytm.in/order/directPay?JsonData ={ "OrderId": "268732d",” PREAUTH_ID”:” “, "ReqType": " SEAMLESS_SCW ",  "MID": "ABCt17066662636799", "AppIP": "127.0.0.1", "TxnAmount": "1", "Currency": "INR", "DeviceId": "9999999999", "SSOToken": "22f895f2-f970-45ad-8c24-42eef6f4c54f",  "PaymentMode": "PPI",  "CustId": "20235", "IndustryType": "Retail", "Channel": "WAP", "AuthMode": "USRPWD",” CheckSum":""}
```


##### RESPONSE:


|S.NO|NAME|DESCRIPTION|LENGTH/TYPE|
|----|----|---|-----|
|1|TxnId|A unique ID generated by Paytm for each txn.|Numeric (Length: 64 digit, Datatype: long)|
|2|MID|This is a unique “Merchant Identifier” that is issued by Paytm to the Merchant| |
|3|OrderId|The   “Order   ID”   is   the   Merchant’s Transaction ID which should be unique for every transaction. Duplicate order id will be rejected by the Paytm gateway.|   |
|4|TxnAmount|The amount that the Merchant needs to withdraw.|Numeric|
|5|BankTxnId|A unique ID generated for each txn by the Paytm Wallet|Numeric(eg, 01)|
|6|ResponseCode|A numeric description of the status of the txn| |
|7|ResponseMessage|A description of the status of the txn|Character(eg, Txn Successful)|
|8|Status|The current status of the txn. TXN_SUCCESS/TXN_FAILURE|Character(eg,TXN_SUCCESS)|
|9|PaymentMode|The PaymentMode that was used for this txn|Character(eg, PPI)|
|10|PROMO_CAMP_ID|This parameter will come in response only if merchant  is  running  any  promotional campaign and have passed the required parameters in transaction request. Promo should be configured at Paytm payment gateway.Optional if merchant has not requested for any promo campaign.|AlphaNumeric|
|11|PROMO_STATUS|This  paremeter  will  indicate if Promo is successfully  applied  or  failed.  Below are values which may return in this parameter. PROMO_SUCCESS,PROMO_FAILURE|Optional (if merchant has not requested for any promo campaign)|AlphaNumeric|
|12|PROMO_RESPCODE|This  is  a  numeric  response  code.  “01” implies promo applied successfully. All other codes refer that promo code has not been applied. Each code representing a different reason for failures. Optional if merchant has not requested for any promo campaign.|AlphaNumeric|
|13|checkSum|CheckSum generated as per some logic by Paytm. This needs to be verified by the merchant.|AlphaNumeric|
|14|MercUnqRef|If merchant send the parameter request then need to return the same value in response|AlphaNumeric|
|15|BankName|The bank that was used for this txn|Character(eg, Wallet)|
|16|CustId|The unique ID of each customer that was received from the Merchant|AlphaNumeric|
|17|MBID|A unique ID generated by the bank for each merchant.|AlphaNumeric|
|18|StatusCode|status of the Txn; not mandatorarily present all the time.|String|



##### Sample Response:


```json
{
	"TxnId": 1000000654,
	"MID": "bmcust17066662636799",
	"OrderId": "268732d",
	"TxnAmount": 1,
	"BankTxnId": "C3727C22090D1A22",
	"ResponseCode": "01",
	"ResponseMessage": "Txn Successful.",
	"Status": "TXN_SUCCESS",
	"PaymentMode": "PPI",
	"BankName": "WALLET",
	"CheckSum": "",
	"CustId": "",
        "MBID": "3624e4c0-1262-11e4-993f-0016364efa11"
}
```


##### CURLs Command-

```bash
cURLs -g  "https://securegw.Paytm.in/pgplus-paymentservices/HANDLER_FF/withdrawScw" --data-URLsencode 'JsonData={"ReqType":"?","MId":"?",“PREAUTH_ID”:”?”,"AppIP":"","TxnAmount":"?","OrderId":"?","Currency":"?","DeviceId":"","SSOToken":"?","PaymentMode":"?","CustomerId":"?","IndustryType":"?","Channel":"?","AuthMode":"?","CheckSum":""}'
```

#### Transaction Status API


As a standard security best practice, before marking a transaction as success in your system on receiving success response from Paytm, you should re-verify transaction status and order amount by calling [Transaction Status API]().

[Transaction Status API]() returns the ORDERID, TXNAMOUNT, STATUS and some additional parameters for a given order.

If ORDERID and TXNAMOUNT parameters do not match with the order data at your end or STATUS is not TXN_SUCCESS, you should not fulfill/deliver the order.

There are two more scenarios where status query will come in handy –

* Paytm returns pending status in response. It happens when bank does not provide the final response to Paytm
* Due to network drop or Internet issue, merchant does not get the response from Paytm


For these two scenarios you can call the [Transaction Status API]() 10 times over a period of 3 days until you get the status as success or failure.


##### URLs

###### Production URLs - [https://securegw.Paytm.in/merchant-status/getTxnStatus]() 
###### Testing URLs - [https://securegw-stage.Paytm.in/merchant-status/getTxnStatus]()


##### Request Parameters
##### (Should be passed as JSON string in “JsonData” parameter name)



|Parameter Name|Description|Type|Length|Mandatory|
|-----|-----|----|----|----|
|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric| |Yes
|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|50|Yes|
|TXN_TYPE|The type of transaction whose status needs to be checked by merchant<br/>Possible value:<br/>WITHDRAW|Alpha|NO|
|CHECKSUMHASH|URLsencoded Checksum is created as per the checksum logic define above|Alphanumeric|108|Yes|


##### Sample Request:

```bash
https://securegw.Paytm.in/theia/HANDLER_INTERNAL/getTxnStatus?JsonData={"MID":"Paytm  MID" , "ORDERID":"Mercahnat order id",”CHECKSUMHASH”:” Checksum hash”}
```


##### Response Parameters

##### (Response will come as JSON string)

|Parameter Name|Description|Type|Mandatory|
|----|---|------|----|
|TXNID|This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the |merchant.|Numeric|Yes|
|BANKTXNID|The transaction Id sent by the bank (NULL or empty string if the transaction doesn't reaches to the bank).|Alphanumeric|Yes|
|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|Yes|
|TXNAMOUNT|Amount of transaction.|Numeric|Yes|
|STATUS|This contains the transaction status and has only two values:<br/>TXN_SUCCESS<br/>TXN_FAILURE|Alphanumeric|Yes|
|TXNTYPE|Type of transaction|Alphanumeric|Yes|
|GATEWAYNAME|The gateway used by Paytm (ICICI/CITI/WALLET etc).|Alphanumeric|Yes|
|RESPCODE|This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list.|Alphanumeric|Yes|
|RESPMSG|This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure.|Alphanumeric|Yes|
|BANKNAME|Bank name of the card issuing bank.|Alphanumeric|Yes|
|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric|Yes|
|PAYMENTMODE|Mode of Payment.<br/>●      CC<br/>●      DC<br/>●      NB<br/>●      IMPS<br/>●      PPI|Alphanumeric|Yes|
|REFUNDAMT|Total amount refunded till now if merchant has raised any requests.|Numeric|Yes|
|TXNDATE|Date of transaction.|DateTime|Yes|


##### Response JSON String:


```json
{
    "TXNID": "62284943",
    "BANKTXNID": "099172",
    "ORDERID": "Test87984",
    "TXNAMOUNT": "1",
    "STATUS": "TXN_SUCCESS",
    "TXNTYPE": "SALE",
    "GATEWAYNAME": "CITI",
    "RESPCODE": "01",
    "RESPMSG": "Txn Successfull.",
    "BANKNAME": "HDFC",
    "MID": "xxxxx34213145601111",
    "PAYMENTMODE": "CC",
    "REFUNDAMT": "1",
    "TXNDATE": "2012-11-09 02:10:29.742447"
}
```

### STEP 5: Managing Refunds


If you need to cancel or refund a successful transaction, you can do so by simply sending a [Refund API]() request and ensuring success using the [Refund Status API]().

#### Refund API 

##### URLs

###### Production URLs- [https://securegw.Paytm.in/refund/HANDLER_INTERNAL/REFUND]() 
###### Testing URLs- [https://securegw-stage.Paytm.in/refund/HANDLER_INTERNAL/REFUND]()


##### Request Parameters  
##### (Should be passed as JSON string in “JsonData” parameter name)


|S.no|Parameter Name|Description|Type|Mandatory|
|-----|-----|-----|----|-----|
|1|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric|Yes|
|2|TXNID|This is an unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the merchant.|Numeric|Yes|
|3|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|Yes|
|4|REFUNDAMOUNT|Amount to be refunded.|Numeric|Yes|
|5|TXNTYPE|Any one of below values:<br/>REFUND<br/>CANCEL|Alphanumeric|Yes|
|6|COMMENTS|Any comments can be given here.|Alphanumeric|No|
|7|REFID|Unique ID for every refund request sent by merchant to Paytm|Alphanumeric|Yes|
|8|CHECKSUM|Checksum calculated based on pre-defined logic. Checksum is used to ensure data is not tempered when request is posted on the Paytm URLS. In case of checksum mismatch due to data tempering Paytm will reject the transaction.|Alphanumeric|Yes|


##### Response Parameters
##### (Response will come as JSON string)



|S.no|Parameter Name|Description|Type|Mandatory|
|----|----|----|-----|----|
|1|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric|Yes|
|2|TXNID|This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the merchant.|Numeric|Yes|
|3|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|Yes|
|4|TXNAMOUNT|Amount of transaction.|Numeric|Yes|
|5|REFUNDAMOUNT|Amount to be refunded.|Numeric|Yes|
|6|TXNDATE|Date of transaction.|DateTime|Yes|
|7|RESPCODE|This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list.|Alphanumeric|Yes|
|8|RESPMSG|This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure.|Alphanumeric|Yes|
|9|STATUS|This contains the transaction status and has only two values:<br/>•  TXN_SUCCESS<br/>•  TXN_FAILURE|Alphanumeric|Yes
|10|REFID|Unique ID for every refund request sent by merchant to Paytm|Alphanumeric|Yes|
|11|REFUNDID|Unique ID for every successful refund sent by Paytm in response to refund request|Alphanumeric|No|




#### Refund Status API


##### URLs


###### Production URLs [https://securegw.Paytm.in/refund/HANDLER_INTERNAL/getRefundStatus]()
###### Testing URLs [https://securegw-stage.Paytm.in/refund/HANDLER_INTERNAL/getRefundStatus]()  

##### Request Parameters
##### (Should be passed as JSON string in “JsonData” parameter name)



|S.no|Parameter Name|Description|Type|Length|Mandatory|
|----|----|----|----|----|---|
|1|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric| ||Yes
|2|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|50|Yes|
|3|REFID|This is reference ID shared while raising Refund.|Alphanumeric|50|Yes|
|4|CHECKSUMHASH|URLsencoded Checksum is created as per the checksum logic define above|Alphanumeric|108|yes|



##### Response Parameters
##### (Response will come as JSON string)



|S.no|Parameter Name|Description|Type|
|----|-----|----|----|
|1|TXNID|This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the |merchant.|Numeric|
|2|BANKTXNID|The transaction Id sent by the bank (NULL or empty string if the transaction doesn't reaches to the bank).|Alphanumeric|
|3|ORDERID|This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request.|Alphanumeric|
|4|TXNAMOUNT|Amount of transaction.|Numeric|
|5|STATUS|This contains the transaction status and has only two values:<br/>•  TXN_SUCCESS<br/>•  TXN_FAILURE|Alphanumeric|
|7|GATEWAY|The gateway used by Paytm (ICICI/CITI/WALLET etc).|Alphanumeric
|8|RESPCODE|This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list.|Alphanumeric
|9|RESPMSG|This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure.|Alphanumeric
|10|MID|This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation.|Alphanumeric
|11|PAYMENTMODE|Mode of Payment.<br/>1. 	CC<br/>2. 	DC<br/>3. 	NB<br/>4. 	IMPS<br/>5. 	PPI|Alphanumeric
|12|REFUNDAMOUNT|Refund amount as received in the request|Numeric
|13|TOTALREFUNDAMT|Total amount refunded till now if merchant has raised any requests.|Numeric
|14|TXNDATE|Date of transaction.|DateTime
|15|REFUNDDATE|Date of refund|DateTime
|16|REFUNDTYPE|Type of Refund Issued|Alphanumeric
|17|REFID|This is reference ID shared while raising Refund.|Alphanumeric
|18|REFUNDID|Unique refund id generated at Paytm end|Alphanumeric






### STEP 6: Verifying Checksum 
 
#### Generate Checksum

#### Validating Checksum based API response








#### On completion of your integration 



### Frequently Asked Questions (FAQs)
 
**1. How to use the integration details and the checksum utility (plugins) shared with us?**

Integration details like Merchant Id, WEBSITE Name, Channel_ID need to be passed with other parameters. Paytm PG needs CHECKSUMHASH String which can be generated with the standard CHECKSUMHASH method using Merchant Key. All parameters passed in the API needs to be included in the CHECKSUMHASH).

**2. How to generate and verify the checksum?**

Paytm provides standard utility based on merchant platform to generate and verify the checksum.

**3. Are the Merchant Id and merchant key same?**

No, Merchant Id is the unique merchant id to identify the merchant and merchant key use to generate and verify checksum.

**4. What is the usage of merchant key? Will it also be passed as parameter for the checksum generation?**

Merchant key (Secret Key) is used to generate and verify checksum only and cannot be sent as parameter to PG (payment gateway).

**5. What are these response codes and the meaning of the same?**

Response code helps to understand the status of the transaction. List is provided in annexure.

**6. What is a settled transaction?**

Paytm does reconciliation with the bank next day and after reconciliation successful transactions are marked as settled. For settled transactions payout is done. For unsettled transactions reconciliation team follows up with the bank to resolve the issue.

**7. Can we use the URLS mentioned in the SDK doc by the Paytm for the checksum generation/verification function Staging and production server?**

No, the URLS should be hosted on merchant site.

**8. Is partial refund possible? If yes, then time taken for the same?**

Partial refund is possible. In case of Paytm wallet, the refund is instant.

**9. What will happen in case of invalid/null SSO token?**

Paytm will give “Authorization failed” error response in case of invalid/null SSO token in request.

**10. Why does “Authorization Error” response mean?**

In case such response is received against a transaction request, it means the user’s SSO token has expired. The merchant will need to get a fresh SSO token for that user and same flow needs to be followed which was followed to get the previous token (using Oauth APIs).

**11. How does user’s SSO token expire?**

User’s SSO token has validity of certain period from the date of issue. Once the expiry date has crossed, token becomes invalid. Other ways in which token becomes invalid are: user changes the Paytm account password, user signs out from all session on Paytm website, user revokes access of merchant at Paytm website.

**12. Is Client Id and Merchant Id different?**

Yes, Merchant Id and Client Id are different. Merchant Id is used for transaction request while Client Id is required for request of user’s SSO token.

**13. Does SSO token remain same for a particular user?**

No, once a SSO token expires, new SSO token will be issued. It will not be same as previously issued SSO token.

**14. Does user need to login to Paytm Wallet if he is logged in merchant app?**

No, if the user is logged in to merchant app, he need not be logged in to Paytm wallet app.