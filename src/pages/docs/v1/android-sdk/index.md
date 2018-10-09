---
path:  "/docs/v1/android-sdk/index.md"
title: "Paytm Android SDK: Accept payments in your Android mobile app"
---

import * as style from './android-sdk.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

# Add payments to your Android app with Paytm SDK

Paytm Android SDK is a secure, PCI-compliant way to accept Debit/Credit card, Net-Banking, UPI and Paytm wallet payments from your customers in your Android app.


## Demo of Paytm checkout flow in your app - 
---
<br/>

<img src='/assets/merchant-pg-android.gif' width="250" alt='' />

## Overview of payment processing via Paytm Android SDK
---

1. At click of the pay button by customer, order related payload is passed to your server by the app 
2. This order payload is used to generate checksumhash by our server side utility and merchant key on your server (explain merchant key on your server better). Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered. Utility to generate checksumhash is available <a href="/docs/v1/android-sdk#code">here</a>
3. Your server passes the payload and checksumhash back to the app which hands over these details to Paytm SDK    
4. SDK verifies payload and displays payment Paytm checkout page
5. Customer fills the payment details and completes the payment authentication. Once the payment is complete, response is posted back to your app via callback
6. Verify checksumhash received in response on your server side. Utility to verify checksumhash is available <a href="/docs/v1/android-sdk#codes">here</a>
7. Lastly, verify transaction status with Transaction Status API via server to server call. This protects you from scenarios where your account credentials are compromised or request/response has been tampered 

Find the detailed interaction of each system component in the flow chart below

<br/>
<img src='/assets/img-flow-android-ios-sdk.png' alt='' />

## Steps to start accepting payments via Paytm Android SDK
---

### Step 1: SDK Installation and Setup

#### Install SDK 
Install Paytm Android SDK using Android Studio and IntelliJ. To add the SDK to your app, add the following dependency in your build.gradle:

```java
dependencies {
	compile('com.paytm:pgplussdk:1.2.3') {
		transitive = true; 
	}
}
```

#### SMS Permission
To allow SDK to autoread the OTP sent by bank during account verification, you need static and at runtime permissions

Add the following code to your AndroidManifest.xml to get static permission

```java
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.READ_SMS"/>
<uses-permission android:name="android.permission.RECEIVE_SMS"/>  
```

Using the code below, you can get runtime permissions needed from user to auto-read the OTP

```java
if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
	ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.READ_SMS, Manifest.permission.RECEIVE_SMS}, 101);
}
```

#### Proguard Rules

If you're using proguard for your build, you need to add the following lines to your proguard file (proguard-rules.pro):

```java
-keepclassmembers class com.paytm.pgsdk.PaytmWebView$PaytmJavaScriptInterface {
   public *;
}
```

---
### Step 2: Initialization 
To initialize the Paytm SDK, use below classes:

#### Object: Service

Service object is used to used to access PG services like initiating transaction, getting transaction callbacks etc. This is different for staging and production and created with following snippet:

**For Staging environment:**

```java
PaytmPGService Service = PaytmPGService.getStagingService();
```
**For Production environment:**

```java
PaytmPGService Service = PaytmPGService.getProductionService();
```

#### Object: Order
Stores all order related information which are required to be passed by you to Paytm. Order object is created by following code snippet - 

```java
Map<String, String> paramMap = new HashMap<String,String>();
paramMap.put( "MID" , "rxazcv89315285244163");
// Key in your staging and production MID available in your dashboard
paramMap.put( "ORDER_ID" , "order1");
paramMap.put( "CUST_ID" , "cust123");
paramMap.put( "MOBILE_NO" , "7777777777");
paramMap.put( "EMAIL" , "username@emailprovider.com");
paramMap.put( "CHANNEL_ID" , "WAP");
paramMap.put( "TXN_AMOUNT" , "100.12");
paramMap.put( "WEBSITE" , "APPSTAGING");
// This is the staging value. Production value is available in your dashboard
paramMap.put( "INDUSTRY_TYPE_ID" , "Retail");
// This is the staging value. Production value is available in your dashboard
paramMap.put( "CALLBACK_URL", "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1");
paramMap.put( "CHECKSUMHASH" , "w2QDRMgp1234567JEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4=")
PaytmOrder Order = new PaytmOrder(paramMap);
```

#### Description of parameters used in hashmap object:

| Parameter Name    |    Description |
| ------------- | ----- | ----- |
| **MID**  String(20)      Mandatory | This is a unique identifier provided to every merchant by Paytm. MID is part of your account credentials and is different on staging and production environment. Your staging MID is available <a href="https://dashboard.paytm.com/next/apikeys?src=dev" target="_blank">here</a> and production MID will be available once your onboaring is complete
|**ORDER_ID** String(50)  Mandatory | Unique reference ID for a transaction which is generated by merchant Special characters allowed in Order ID are: “@” “-” “_” “.”.
|**CUST_ID** String(64)  Mandatory | Unique reference ID for every customer which is generated by merchant Special characters allowed in Cust\_ID are @, ! ,_ $
|**TXN_AMOUNT** String(10)    Mandatory  | Amount in INR payable by customer. Should contain digits up to two decimal points. The amount should not include any separator like (“,”)
|**CHANNEL_ID** String(3) Mandatory  | This parameter is used to control the theme of the payment page. Based on the channel passed, Paytm will render the layout suitable for that specific platform<br/>For App, the value is WAP
|**WEBSITE** String(30) Mandatory | For staging environment: <br/>APPSTAGING for App <br/>For production environment: Will be available <a href="https://dashboard.paytm.com/next/apikeys?src=dev" target="_blank">here</a> once your onboarding is complete
|**INDUSTRY_TYPE_ID** String(20) Mandatory | For staging environment: "Retail"<br/>For production environment: Will be available <a href="https://dashboard.paytm.com/next/apikeys?src=dev" target="_blank">here</a> once your onboarding is complete
|**CHECKSUMHASH** String(108) Mandatory | Security parameter to avoid tampering. Generated using server side checksum utility provided by Paytm.  Utilitities to generate checksumhash is available <a href="/docs/v1/android-sdk#codes">here</a>
|**MOBILE_NO** Optional String(15)  Mandatory| Customer mobile number. Passing this enables faster login for customer into his/her Paytm account
|**EMAIL** Optional String(50) Mandatory | Customer email ID. Passing this enables faster login for customer into his/her mobile wallet.
|**CALLBACK_URL** String(255) Mandatory | Staging Environment: <br/> "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>" <br/> Production Environment: <br/> "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>"


#### Object: Certificate (optional)

Certificate object stores client-side SSL certificate related information and ensures secured handshake between your app and Paytm. Use this code snippet to create certificate object:

```java
PaytmClientCertificate Certificate = new PaytmClientCertificate(String inPassword, String inFileName);
// inPassword is the password for client side certificate 
//inFileName is the file name of client side certificate
```

Note: 
* Client Certificate must be present in “raw” folder
* Pass filename without extension.  For e.g if filename is “clientCert.cert” then pass only “clientCert”.

---

### Step 3: Initiate Payment

#### Initialize Service 

Parameters required to invoke initialize method are Order and Certificate Objects:
```java
Service.initialize(Order, Certificate);
```

In case you do not wish to pass the certificate, pass NULL:

```java
Service.initialize(Order, null);
```
Call start transaction method using service object:


```java
 Service.startPaymentTransaction(this, true, true, new PaytmPaymentTransactionCallback() {
	/*Call Backs*/
                       public void someUIErrorOccurred(String inErrorMessage) {}
                       public void onTransactionResponse(Bundle inResponse) {}
                       public void networkNotAvailable() {}
                       public void clientAuthenticationFailed(String inErrorMessage) {}
                       public void onErrorLoadingWebPage(int iniErrorCode, String inErrorMessage, String inFailingUrl) {}
                       public void onBackPressedCancelTransaction() {}
                       public void onTransactionCancel(String inErrorMessage, Bundle inResponse) {}
     });
```


Parameters used in `startPaymentTransaction` in order are -

* contextofyourActivity is the activity context in where this method is called
* **A boolean variable (true/false)** to hide or show header bar.
* **A boolean variable (true/false)** to determine whether to send all checksum response parameters to PG server or not
* [inPaymentTransactionCallback]() is a [PaytmPaymentTransactionCallback]() instance to send callback messages back to your application. Details and description provided in next section

---

### Step 4: Handling callback from Paytm


You need to implement callback methods to handle payment response. This will provide the payment status and reason for transaction failures. Based on the reasons for failures, hadnling can be built at your end. Transaction callbacks can be listened via overriding methods of **PaytmPaymentTransactionCallback**


#### After transaction is complete:
Once the transaction is complete, you will get a JSON response. Note that completion of transaction does not imply that payment is successful. Payment can be in successful or failed state which needs to be derived from JSON.

```java
public void onTransactionResponse(Bundle inResponse) {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Payment Transaction response " + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```


#### UI Error: User interface error
This is caused when SDK is unable to load the payment page in webview. This might happen in case SDK is not able to parse the transaction payload received from the app

```java
public void someUIErrorOccurred(String inErrorMessage) {
	/*Display the error message as below */
	Toast.makeText(getApplicationContext(), "UI Error " + inErrorMessage , Toast.LENGTH_LONG).show();
}
```

#### Network Error: 
Due to weak or no internet connectivity on customer's device.

```java
public void networkNotAvailable() {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Network connection error: Check your internet connectivity", Toast.LENGTH_LONG).show();
}
```


#### Client authentication failure -

This can happen due to multiple reason -

1. Paytm services are not available due to a downtime
2. Server unable to generate checksum or checksum response is not in proper format (which server?)
3. Server failed to authenticate the client. That is value of payt_STATUS is 2. //  payt_STATUS hasn't been defined anywhere


```java
public void clientAuthenticationFailed(String inErrorMessage)  {
        /*Display the message as below */
        Toast.makeText(getApplicationContext(), "Authentication failed: Server error" + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```


#### Error in loading web page 

This is caused when SDK is unable to load the payment page in webview. This might happen due to server unavailability at Paytm's end or due to handshaking error with Paytm gateway

```java
public void onErrorLoadingWebPage(int iniErrorCode, String inErrorMessage, String inFailingUrl)  {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Unable to load webpage " + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```

#### On press of back button

This is caused when user presses a back button on the payment page. Followed by pressing the back button, there is a reconfirmation taken from the customer to leave the payment page

```java
public void onBackPressedCancelTransaction(){
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Transaction cancelled" , Toast.LENGTH_LONG).show();
}
```

#### On transaction cancelled - 

This is caused when a transaction gets cancelled. In case user presses a back or cancel button and confirms to leave the page, this callback is triggered

```java
public void onTransactionCancel(String inErrorMessage, Bundle inResponse)
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Transaction Cancelled" + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```

---

### Step 5: Checksum Generation and Verification

#### Checksumhash Generation 

All requests sent to Paytm via SDK needs to have a checksumhash. Checksumhash is signature used by Paytm to ensure that request has not been tampered. All the request parameters needs to be sent to the server where merchant key is available. Server will use our server side utility and merchant key to generate checksumhash. Code snippet and Checksum library for its generation and verification are provided below


<div className={`${style.checkoutWrapper}`}>
    
<Tabs defaultTab="java">
	<TabList>
            <Tab tabFor="java">JAVA</Tab>
            <Tab tabFor="net">.NET</Tab>
            <Tab tabFor="php">PHP</Tab>
    </TabList>
	<TabPanel tabId="java">
        <span dangerouslySetInnerHTML={{
            __html: `
<pre><code class="hljs language-java">String merchantMid = <span class="hljs-string">"rxazcv89315285244163"</span>;
<span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
<span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
String orderId = <span class="hljs-string">"order1"</span>;
String channelId = <span class="hljs-string">"WAP"</span>;
String custId = <span class="hljs-string">"cust123"</span>;
String mobileNo = <span class="hljs-string">"7777777777"</span>;
String email = <span class="hljs-string">"username@emailprovider.com"</span>;
String txnAmount = <span class="hljs-string">"100.12"</span>;
String website = <span class="hljs-string">"APPSTAGING"</span>;
<span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
String industryTypeId = <span class="hljs-string">"Retail"</span>;
<span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
String callbackUrl = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1"</span>;
TreeMap&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span> TreeMap&lt;String, String&gt;();
paytmParams.put(<span class="hljs-string">"MID"</span>,merchantMid);
paytmParams.put(<span class="hljs-string">"ORDER_ID"</span>,orderId);
paytmParams.put(<span class="hljs-string">"CHANNEL_ID"</span>,channelId);
paytmParams.put(<span class="hljs-string">"CUST_ID"</span>,custId);
paytmParams.put(<span class="hljs-string">"MOBILE_NO"</span>,mobileNo);
paytmParams.put(<span class="hljs-string">"EMAIL"</span>,email);
paytmParams.put(<span class="hljs-string">"TXN_AMOUNT"</span>,txnAmount);
paytmParams.put(<span class="hljs-string">"WEBSITE"</span>,website);
paytmParams.put(<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>,industryTypeId);
paytmParams.put(<span class="hljs-string">"CALLBACK_URL"</span>, callbackUrl);
String paytmChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(merchantKey, paytmParams);</code></pre>
            `}}></span>
    </TabPanel>
	<TabPanel tabId="net">
        <span dangerouslySetInnerHTML={{
        __html:  ` 
<pre><code class="hljs language-cs">Dictionary&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span> Dictionary&lt;String, String&gt;();
String merchantMid = <span class="hljs-string">"rxazcv89315285244163"</span>;
<span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
<span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
String orderId = <span class="hljs-string">"order1"</span>;
String channelId = <span class="hljs-string">"WAP"</span>;
String custId = <span class="hljs-string">"cust123"</span>;
String mobileNo = <span class="hljs-string">"7777777777"</span>;
String email = <span class="hljs-string">"username@emailprovider.com"</span>;
String txnAmount = <span class="hljs-string">"100.12"</span>;
String website = <span class="hljs-string">"APPSTAGING"</span>;
<span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
String industryTypeId = <span class="hljs-string">"Retail"</span>;
<span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
String callbackUrl = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1"</span>;
paytmParams.Add(<span class="hljs-string">"MID"</span>, merchantMid);
paytmParams.Add(<span class="hljs-string">"CHANNEL_ID"</span>, channelId);
paytmParams.Add(<span class="hljs-string">"WEBSITE"</span>, website);
paytmParams.Add(<span class="hljs-string">"CALLBACK_URL"</span>, callbackUrl);
paytmParams.Add(<span class="hljs-string">"CUST_ID"</span>, custId);
paytmParams.Add(<span class="hljs-string">"MOBILE_NO"</span>, mobileNo);
paytmParams.Add(<span class="hljs-string">"EMAIL"</span>, email);
paytmParams.Add(<span class="hljs-string">"ORDER_ID"</span>, orderId);
paytmParams.Add(<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>, industryTypeId);
paytmParams.Add(<span class="hljs-string">"TXN_AMOUNT"</span>, txnAmount);
String paytmChecksum = paytm.CheckSum.generateCheckSum(merchantKey, paytmParams);</code></pre>
        `}}></span>
    </TabPanel>
    <TabPanel tabId="php">
    <span dangerouslySetInnerHTML={
        {__html: `
<pre><code class="hljs language-php"><span class="hljs-meta">&lt;?php</span>
    <span class="hljs-keyword">require_once</span>(<span class="hljs-string">"encdec_paytm.php"</span>);
    define(<span class="hljs-string">"merchantMid"</span>, <span class="hljs-string">"rxazcv89315285244163"</span>);
    <span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
    define(<span class="hljs-string">"merchantKey"</span>, <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>);
    <span class="hljs-comment">// Key in your staging and production MID available in your dashboard</span>
    define(<span class="hljs-string">"orderId"</span>, <span class="hljs-string">"order1"</span>);
    define(<span class="hljs-string">"channelId"</span>, <span class="hljs-string">"WAP"</span>);
    define(<span class="hljs-string">"custId"</span>, <span class="hljs-string">"cust123"</span>);
    define(<span class="hljs-string">"mobileNo"</span>, <span class="hljs-string">"7777777777"</span>);
    define(<span class="hljs-string">"email"</span>, <span class="hljs-string">"username@emailprovider.com"</span>);
    define(<span class="hljs-string">"txnAmount"</span>, <span class="hljs-string">"100.12"</span>);
    define(<span class="hljs-string">"website"</span>, <span class="hljs-string">"APPSTAGING"</span>);
    <span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
    define(<span class="hljs-string">"industryTypeId"</span>, <span class="hljs-string">"Retail"</span>);
    <span class="hljs-comment">// This is the staging value. Production value is available in your dashboard</span>
    define(<span class="hljs-string">"callbackUrl"</span>, <span class="hljs-string">"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1"</span>);
    $paytmParams = <span class="hljs-keyword">array</span>();
    $paytmParams[<span class="hljs-string">"MID"</span>] = merchantMid;
    $paytmParams[<span class="hljs-string">"ORDER_ID"</span>] = orderId;
    $paytmParams[<span class="hljs-string">"CUST_ID"</span>] = custId;
    $paytmParams[<span class="hljs-string">"MOBILE_NO"</span>] = mobileNo;
    $paytmParams[<span class="hljs-string">"EMAIL"</span>] = email;
    $paytmParams[<span class="hljs-string">"CHANNEL_ID"</span>] = channelId;
    $paytmParams[<span class="hljs-string">"TXN_AMOUNT"</span>] = txnAmount;
    $paytmParams[<span class="hljs-string">"WEBSITE"</span>] = website;
    $paytmParams[<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>] = industryTypeId;
    $paytmParams[<span class="hljs-string">"CALLBACK_URL"</span>] = callbackUrl;
    $paytmChecksum = getChecksumFromArray($paytmParams, merchantKey);
<span class="hljs-meta">?&gt;</span></code></pre>`}}></span>
</TabPanel>
</Tabs>
</div>

<a name="code"></a>

<div className={`${style.dscrption}`}>
Endpoints: <br/>
Staging: https://securegw-stage.paytm.in/theia/processTransaction<br/>
Production: https://securegw.paytm.in/theia/processTransaction
</div>




<div className={`${style.ecomPlatform} grid justify-start`}>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_JAVA' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/java.png' alt=''/>
                        <label>Java</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_DotNet' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-dotnet.png' alt=''/>
                        <label>ASP.Net</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_PHP' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-php.png' alt=''/>
                        <label>PHP</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_NodeJs' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-nodejs.png' alt=''/>
                        <label>Node.js</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_Ruby' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-ruby-on-rails.png' alt=''/>
                        <label>Ruby on rails</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_Python' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-python.png' alt=''/>
                        <label>Python</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Google_App_Engine_Kit' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-google-app-engine.png' alt=''/>
                        <label>Google App Engine</label>
                    </span>
                </a>
            </div>
</div>

#### Checksumhash Verification


All responses sent by Paytm consists checksumhash. This checksumhash needs to be verified to ensure that response have not been tampered. Checksum verification is done using our server side utility. Code snippets and Github links for the utility in your language of choice are provided below.


<div className={`${style.checkoutWrapper}`}>


<Tabs defaultTab="java">
	<TabList>
            <Tab tabFor="java">JAVA</Tab>
            <Tab tabFor="net">.NET</Tab>
            <Tab tabFor="php">PHP</Tab>
    </TabList>
	<TabPanel tabId="java">
    <span dangerouslySetInnerHTML={{
        __html: `
<pre><code class="hljs language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">final</span> String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
<span class="hljs-keyword">private</span> String paytmChecksum = <span class="hljs-keyword">null</span>;
<span class="hljs-comment">// Create a tree map from the form post param</span>
TreeMap&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span> TreeMap&lt;String, String&gt;();
<span class="hljs-comment">// Request is HttpServletRequest</span>
<span class="hljs-keyword">for</span> (Entry&lt;String, String[]&gt; requestParamsEntry : request.getParameterMap().entrySet()) {
    <span class="hljs-keyword">if</span> (<span class="hljs-string">"CHECKSUMHASH"</span>.equalsIgnoreCase(requestParamsEntry.getKey())){
        paytmChecksum = requestParamsEntry.getValue()[<span class="hljs-number">0</span>];
    } <span class="hljs-keyword">else</span> {
        paytmParams.put(requestParamsEntry.getKey(), requestParamsEntry.getValue()[<span class="hljs-number">0</span>]);
    }
}
<span class="hljs-comment">// Call the method for verification</span>
<span class="hljs-keyword">boolean</span> isValidChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().verifycheckSum(merchantKey, paytmParams, paytmChecksum);
<span class="hljs-comment">// If isValidChecksum is false, then checksum is not valid</span>
<span class="hljs-keyword">if</span>(isValidChecksum){
    System.out.append(<span class="hljs-string">"Checksum Matched"</span>);
}<span class="hljs-keyword">else</span>{
    System.out.append(<span class="hljs-string">"Checksum MisMatch"</span>);
}</code></pre>
        `}}></span>
    </TabPanel>
    <TabPanel tabId="net">
    <span dangerouslySetInnerHTML={
        {__html: `
<pre><code class="hljs language-cs">String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span> ;
Dictionary&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span> Dictionary&lt;String, String&gt;();
<span class="hljs-keyword">string</span> paytmChecksum = <span class="hljs-string">""</span>;
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> Request.Form.Keys) {
    paytmParams.Add(key.Trim(), Request.Form[key].Trim());
}
<span class="hljs-keyword">if</span> (paytmParams.ContainsKey(<span class="hljs-string">"CHECKSUMHASH"</span>)) {
    paytmChecksum = paytmParams[<span class="hljs-string">"CHECKSUMHASH"</span>];
    paytmParams.Remove(<span class="hljs-string">"CHECKSUMHASH"</span>);
}
<span class="hljs-keyword">bool</span> isValidChecksum=CheckSum.verifyCheckSum(merchantKey, paytmParams, paytmChecksum);
<span class="hljs-keyword">if</span> (isValidChecksum) {
    Response.Write(<span class="hljs-string">"Checksum Matched"</span>);
} <span class="hljs-keyword">else</span> {
    Response.Write(<span class="hljs-string">"Checksum MisMatch"</span>);
}</code></pre>`}}></span>
       </TabPanel>
		<TabPanel tabId="php">
        <span dangerouslySetInnerHTML={
            {__html: `
<pre><code class="hljs language-php"><span class="hljs-meta">&lt;?php</span>
    $paytmParams = $_POST;
    $merchantKey=<span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
    $paytmChecksum = <span class="hljs-keyword">isset</span>($_POST[<span class="hljs-string">"CHECKSUMHASH"</span>]) ? $_POST[<span class="hljs-string">"CHECKSUMHASH"</span>] : <span class="hljs-string">""</span>;
    $isValidChecksum = verifychecksum_e($paytmParams, $merchantKey, $paytmChecksum);
    <span class="hljs-keyword">if</span>($isValidChecksum == <span class="hljs-string">"TRUE"</span>) {
        <span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;b&gt;Checksum Matched&lt;/b&gt;"</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;b&gt;Checksum MisMatch&lt;/b&gt;"</span>;
    }
<span class="hljs-meta">?&gt;</span></code></pre>`}}></span>
    </TabPanel>
</Tabs>
</div>

<a name="codes"></a>

Get the sample code for a language of your choice - 





<div className={`${style.ecomPlatform} grid justify-start`}>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_JAVA' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/java.png' alt=''/>
                        <label>Java</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_DotNet' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-dotnet.png' alt=''/>
                        <label>ASP.Net</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_PHP' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-php.png' alt=''/>
                        <label>PHP</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_NodeJs' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-nodejs.png' alt=''/>
                        <label>Node.js</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_Ruby' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-ruby-on-rails.png' alt=''/>
                        <label>Ruby on rails</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_Python' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-python.png' alt=''/>
                        <label>Python</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Google_App_Engine_Kit' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-google-app-engine.png' alt=''/>
                        <label>Google App Engine</label>
                    </span>
                </a>
            </div>
</div>

## On completion of your integration -

---

Post completion of integration on your staging environment, do a complete transaction from order summary page   on your website or mobile app 

1. Attempt a test transaction using <a href="/docs/testing-integration" >test paymodes credentials</a>
2. Ensure you re-verify transaction response with [Transaction Status API](https://developer.paytm.com/docs/transaction-status-api) via server to server call in payment flow and not separately as a one time activity    
3. See the transaction details in “Test Data” mode on your <a href="https://dashboard.paytm.com/next/transactions" target="_blank">dashboard</a>


Once the test transaction is complete, move your code to live environment with production account details. Note that production accounts details are available after you have <a href='https://dashboard.paytm.com/next/activate?src=dev' target="_blank">activated your account </a> on the dashboard

Lastly, it's recommended that you read about <a  href="/docs/refund-management">Managing Refunds</a> and <a href="/docs/late-notification"> late payment notifications</a>

In case of any issues, please search or post your query on our <a href="http://paywithpaytm.com/developer/discussion/" target="_blank">Developer Forum</a> or send your queries to devsupport@paytm.com



