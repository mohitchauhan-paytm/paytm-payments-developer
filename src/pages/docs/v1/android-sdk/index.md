---
path:  "/docs/v1/android-sdk/index.md"
title: "Paytm Android SDK: Accept payments in your Android mobile app"
---

import * as style from './android-sdk.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

# Collect online payments with our Android SDK

Paytm has created Android SDK over our powerful APIs, allowing you to take payments in minutes. With our SDK, we shoulder the burden of PCI compliance by eliminating the need to send card data directly to your server.
 
Our MavenCentral Based SDK is easy to integrate, featherlight & self updating. Hence If a bank launches a new series of cards or wallet, the same is provided to your customers without any new integration. Additionally our SDK auto reads the OTP sent by bank for account verification significantly improving the overall transaction success rates


## Demo of Paytm checkout flow in your app - 
---
<br/>

<img src='/assets/merchant-pg-android.gif' width="250" alt='' />

## Overview of payment processing via Paytm checkout
---

1. At click of the pay button by customer, order related payload is passed to your server by the APP 
2. This order payload is used to generate checksumhash by our server side utility & merchant key on your server. Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered
3. Your server passes the payload and checksumhash back to the APP which hands over these details to Paytm SDK    
4. SDK verifies payload and displays payment Paytm checkout page
5. Customer fills the payment details and completes the payment authentication. Once the payment is complete, response is posted back to your APP via callback
6. Verify checksumhash received in response on your server side. Utility for same is provided later 
7. Lastly, verify transaction status with Transaction Status API via server to server call. This protects you from scenarios where your account credentials are compromised or request/response has been tampered 

Find the detailed interaction of each system component in the flow chart below

<br/>
<img src='/assets/img-flow-android-ios-sdk.png' alt='' />

## Steps to start accepting payments via Android SDK
---

There are 6 steps to accept payment in your APP. First four steps are required to integrate SDK on your APP and last two needs to done on your server for checksumhash generation & verification


### Step 1: Installation & setup

#### Install SDK 
Install our Android SDK using Android Studio and IntelliJ. To add our SDK to your app, add the following dependency in your build.gradle:

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

Via below code, you get runtime permissions needed from user to read the OTP

```java
if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
	ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.READ_SMS, Manifest.permission.RECEIVE_SMS}, 101);
}
```

#### Progaurd Rules

If you're using proguard for your build, you need to add the following lines to your proguard file:
proguard-rules.pro

```java
-keepclassmembers class com.paytm.pgsdk.PaytmWebView$PaytmJavaScriptInterface {
   public *;
}
```

---
### Step 2: Initialization 
To initialize the Paytm SDK, use below classes

#### Object: Service
Service object is used to used to access PG services such to initiate or cancel transaction. This is different for staging and production and created with following snippet

**For  Staging service:**

```java
PaytmPGService Service = PaytmPGService.getStagingService();
```
**For Production service:**

```java
PaytmPGService Service = PaytmPGService.getProductionService();
```

#### Object: Order
Stores all order related information which are required to be passed by you to Paytm. Order object is created by following code snippet - 

```java
PaytmOrder Order = new PaytmOrder(paramMap);
Where paramap is a HASHMAP object that includes the order details in key value pair. Each parameter is explained in detail below -
Map<String, String> paramMap = new HashMap<String,String>();
paramMap.put( "MID" , "TEXXXXXXXXXXXXXXX913");
paramMap.put( "ORDER_ID" , "ord1");
paramMap.put( "CUST_ID" , "cust123");
paramMap.put( "CHANNEL_ID" , "WAP");
paramMap.put( "TXN_AMOUNT" , "100.12");
paramMap.put( "WEBSITE" , "PAYTM_WEBSITE");
paramMap.put( "CALLBACK_URL", "https://pg-staging.paytm.in/MerchantSite/bankResponse");
paramMap.put( "EMAIL" , "customer@gmail.com");
paramMap.put( "MOBILE_NO" , "9999999999");
paramMap.put( "CHECKSUMHASH" , "w2QDRMgp1234567JEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4=")
```

#### Description of Parameters used in hashmap objects:

| **Parameter Name**     |    **Description** |
| ------------- | ----- | ----- |
| **MID**  Alphanumeric(20)       | Available with your account details in dashboard. Different for staging and production
|**ORDER_ID** Alphanumeric(50)      | Merchant’s unique reference ID for a transaction   Special characters allowed in Order Id are: “@” “-” “_”  “.”.
|**CUST_ID** Alphanumeric(64)   | Merchant’s unique reference ID for every customer Special characters e.g @, ! ,_ $ are allowed
|**TXN_AMOUNT** Numeric(10)      | Amount in INR payable by customer. Should contain digits up to two decimal points. The amount should not include any separator like (“,”)
|**CHANNEL_ID** Alphanumeric(3)  | 1. WEB – for websites <br/> 2. WAP - for Mobile websites/App
|**WEBSITE** Alphanumeric(50)  | Staging Environment: <br/> 1. WEBSTAGING for websites <br/>2.APPSTAGING for Mobile websites/App Production environment: Will be provided with production credentials in dashboard
|**CHECKSUMHASH** Alphanumeric(108)  | Security parameter to avoid tampering. Generated using server side checksum utility provided by Paytm
|**MOBILE_NO** Numeric (15)  | Customer mobile number. Passing this enables faster login for customer into his/her Paytm account
|**EMAIL** Email(50)  | Customer email Id. Passing this enables faster login for customer into his/her mobile wallet.
|**CALLBACK_URL** URL(255)  | URL on which response of transaction request will be posted
| **MERC_UNQ_REF** Optional Alphanumeric (50) | An extra (optional) field that is passed by merchant in form POST, the values of this field passes through the system and returns to merchant along with other fields. This should be enabled by Paytm 

#### Object: Certificate (Optional to create)

Certificate object Stores client side SSL certificate related information and ensures secured handshake between your APP and Paytm server. Code snippet to create certificate object is below

```java
PaytmClientCertificate Certificate = new PaytmClientCertificate(String inPassword, String inFileName);
// inPassword is the password for client side certificate 
//inFileName is the file name of client side certificate
```

Note: 
* This file must be present in “raw” folder
* Pass filename without extension. **E.g if filename is “clientCert.cert” then pass only “clientCert”.**

---

### Step 3: Initiate Payments

#### Initialize Service: 

Parameters required  to  invoke [initialize method]() are Order and Certificate Objects. 

```java
Service.initialize(Order, Certificate);
```

In case you do not wish to pass the certificate, use the below code

```java
Service.initialize(Order, null);
```
Call start transaction method using service object 


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


Description of parameters used in `startPaymentTransaction` in order used are - 

* [contextofyourActivity]() is the activity context in where this method is called
* **A boolean variable (true/false)** to hide or show header bar.
* **A boolean variable (true/false)** to determine whether to send all checksum response parameters to PG server or not
* [inPaymentTransactionCallback]() is a [PaytmPaymentTransactionCallback]() instance to send callback messages back to your application. Details and description provided in next section

---

### Step 4: Handling of callbacks from PG


You need to implement the callback methods to handle the response upon payment completion or failures. Transaction callbacks can be listened via overriding methods of **PaytmPaymentTransactionCallback**


#### Completion of transaction:
Once the transaction is complete, you will get a response in the json format. Note that completion of transaction does not imply that payment is successful. Payment can be in successful or failed state which needs to be derived from JSON

```java
public void onTransactionResponse(Bundle inResponse) {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Payment Transaction response " + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```


#### UI Error: 
This may be due to initialization of views in payment gateway activity or initialization of webview

```java
public void someUIErrorOccurred(String inErrorMessage) {
	/*Display the error message as below */
	Toast.makeText(getApplicationContext(), "UI Error " + inErrorMessage , Toast.LENGTH_LONG).show();
}
```

#### Network Error: 
Due to weak or no internet connectivity

```java
public void networkNotAvailable() {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Network connection error: Check your internet connectivity", Toast.LENGTH_LONG).show();
}
```


####  Client authentication failure

Due to : 
1. Server error or downtime
2. Server unable to generate checksum or checksum response is not in proper format
3. Server failed to authenticate that client. That is value of payt_STATUS is 2. //


```java
public void clientAuthenticationFailed(String inErrorMessage)  {
        /*Display the message as below */
        Toast.makeText(getApplicationContext(), "Authentication failed: Server error" + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```


#### Error in loading web page 

```java
public void onErrorLoadingWebPage(int iniErrorCode, String inErrorMessage, String inFailingUrl)  {
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Unable to load webpage " + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```

#### On press of back button

```java
public void onBackPressedCancelTransaction(){
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Transaction cancelled" , Toast.LENGTH_LONG).show();
}
```

`
#### On transaction cancelled - 

```java
public void onTransactionCancel(String inErrorMessage, Bundle inResponse)
	/*Display the message as below */
	Toast.makeText(getApplicationContext(), "Transaction Cancelled" + inResponse.toString(), Toast.LENGTH_LONG).show();
}
```

---

### Step 5: Checksum generation & verification

#### Checksumhash Generation -

All requests sent to Paytm via SDK and APIs need to have checksumhash. Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered. All the parameters which are being sent in the request need to be sent to the server. Server will use our server side utility code to generate checkssum. 
Use the code below to generate 


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
<pre><code class="hljs language-java">TreeMap&lt;String, String&gt; parameters = <span class="hljs-keyword">new</span> TreeMap();
parameters.put(<span class="hljs-string">"MID"</span>,<span class="hljs-string">"TESXXXXXXXXXXXXXXX13"</span>);
parameters.put(<span class="hljs-string">"ORDER_ID"</span>,<span class="hljs-string">"ord1"</span>);
parameters.put(<span class="hljs-string">"CHANNEL_ID"</span>,<span class="hljs-string">"WEB"</span>);
parameters.put(<span class="hljs-string">"CUST_ID"</span>,<span class="hljs-string">"cust123"</span>);
parameters.put(<span class="hljs-string">"TXN_AMOUNT"</span>,<span class="hljs-string">"100.12"</span>);
parameters.put(<span class="hljs-string">"WEBSITE"</span>,<span class="hljs-string">"WEBSTAGING"</span>);
parameters.put(<span class="hljs-string">"MOBILE_NO"</span>,<span class="hljs-string">"9999999999"</span>);
parameters.put(<span class="hljs-string">"EMAIL"</span>,<span class="hljs-string">"customer@gmail.com"</span>);
parameters.put(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>);
String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">"WaXXXXXXXXXX18CP@"</span>, parameters);</code></pre>
            `}}></span>
    </TabPanel>
	<TabPanel tabId="net">
        <span dangerouslySetInnerHTML={{
        __html:  ` 
<pre><code class="hljs language-cs">Dictionary parameters = <span class="hljs-keyword">new</span> Dictionary();
String Merchant_key=<span class="hljs-string">"IXXXXXXXXXXXXX4z"</span>;
String MID=<span class="hljs-string">"TEXXXXXXXXXXXXXXXXX13"</span>;
String Website=<span class="hljs-string">"WEBSTAGING"</span>;
parameters.Add(<span class="hljs-string">"MID"</span>, MID);
parameters.Add(<span class="hljs-string">"REQUEST_TYPE"</span>, <span class="hljs-string">"DEFAULT"</span>);
parameters.Add(<span class="hljs-string">"CHANNEL_ID"</span>, <span class="hljs-string">"WEB"</span>);
parameters.Add(<span class="hljs-string">"WEBSITE"</span>, Website);
<span class="hljs-keyword">string</span> custId = <span class="hljs-string">"customer@gmail.com"</span>;
<span class="hljs-keyword">string</span> paytmURL = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;
parameters.Add(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>);
parameters.Add(<span class="hljs-string">"CUST_ID"</span>, <span class="hljs-string">"cust123"</span>);
parameters.Add(<span class="hljs-string">"ORDER_ID"</span>, <span class="hljs-string">"ord1"</span>);
parameters.Add(<span class="hljs-string">"TXN_AMOUNT"</span>, <span class="hljs-string">"100.12"</span>);
<span class="hljs-keyword">string</span> checksum = paytm.CheckSum.generateCheckSum(Merchant_key, parameters);</code></pre>
        `}}></span>
    </TabPanel>
    <TabPanel tabId="php">
    <span dangerouslySetInnerHTML={
        {__html: `
<pre><code class="hljs language-php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">// following files need to be included</span>
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"encdec_paytm.php"</span>);<br/>
define(<span class="hljs-string">"PAYTM_MERCHANT_MID"</span>, <span class="hljs-string">""</span>);
define(<span class="hljs-string">"PAYTM_MERCHANT_KEY"</span>, <span class="hljs-string">""</span>);<br/>
<span class="hljs-comment">// Create an array having all required parameters for creating checksum.</span>
$paramList = <span class="hljs-keyword">array</span>();
$paramList[<span class="hljs-string">"REQUEST_TYPE"</span>] = <span class="hljs-string">"DEFAULT"</span>;
$paramList[<span class="hljs-string">"MID"</span>] = PAYTM_MERCHANT_MID;
$paramList[<span class="hljs-string">"ORDER_ID"</span>] = <span class="hljs-string">"ord1"</span>;
$paramList[<span class="hljs-string">"CUST_ID"</span>] = <span class="hljs-string">"cust123"</span>;
$paramList[<span class="hljs-string">"CHANNEL_ID"</span>] = <span class="hljs-string">"WEB"</span>;
$paramList[<span class="hljs-string">"TXN_AMOUNT"</span>] = <span class="hljs-string">"100.12"</span>;
$paramList[<span class="hljs-string">"WEBSITE"</span>] = <span class="hljs-string">"Website"</span>;
$paramList[<span class="hljs-string">"CALLBACK_URL"</span>] = <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>;
$paramList[<span class="hljs-string">"MOBILE_NO"</span>] = <span class="hljs-string">'9999999999'</span>;
$paramList[<span class="hljs-string">"EMAIL"</span>] = <span class="hljs-string">'customer@gmail.com'</span>;<br/>
<span class="hljs-comment">// here checksum string will return by getChecksumFromArray() function</span>
$checkSum = getChecksumFromArray($paramList, PAYTM_MERCHANT_KEY);
<span class="hljs-meta">?&gt;</span></code></pre>`}}></span>
</TabPanel>
</Tabs>
</div>

#### Checksumhash Verification-


All responses sent by Paytm consists checksumhash. This checksumhash needs to be verified to ensure that response have not been tampered. Checksum verification is done using our server by server side utility. Code snippets and github link provided below


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
<pre><code class="hljs language-java">Package com.paytm.pg.checksumKit;
<span class="hljs-keyword">import</span> com.paytm.pg.merchant.*;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.TreeMap;
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">checksumVerification</span> </span>{
	<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> String MercahntKey = <span class="hljs-string">"XXXXXXXXXXX"</span>;
	<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] a)</span></span>{
		String paytmChecksum = <span class="hljs-string">""</span>;
		Map&lt;String, String&gt; mapData = <span class="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();
		TreeMap&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();
		<span class="hljs-keyword">for</span> (Map.Entry&lt;String, String&gt; entry : mapData.entrySet()) {
			<span class="hljs-keyword">if</span>(entry.getKey().equals(<span class="hljs-string">"CHECKSUMHASH"</span>)){
				paytmChecksum = entry.getKey();
			}<span class="hljs-keyword">else</span>{
				paytmParams.put(entry.getKey(), entry.getValue());
			}
		}
		<span class="hljs-keyword">boolean</span> isValideChecksum = <span class="hljs-keyword">false</span>;
		<span class="hljs-keyword">try</span>{
			isValideChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().verifycheckSum(MercahntKey, paytmParams, paytmChecksum); 
			System.out.println(isValideChecksum);
			
			<span class="hljs-comment">// if checksum is validated Kindly verify the amount and status </span>
			<span class="hljs-comment">// if transaction is successful // kindly call Paytm Transaction Status API and verify the transaction amount and status.</span>
			<span class="hljs-comment">// If everything is fine then mark that transaction as successful into your DB.</span>
		}<span class="hljs-keyword">catch</span>(Exception e){
			e.printStackTrace();
		}
	}
}</code></pre>
        `}}></span>
    </TabPanel>
	<TabPanel tabId="net">
    <span dangerouslySetInnerHTML={
        {__html: `
<pre><code class="hljs language-cs">String merchantKey = “merchantKey <span class="hljs-keyword">value</span>” ;
<span class="hljs-comment">// Replace the with the Merchant Key provided by Paytm at the time of registration.</span>
Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt; parameters = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt;();
<span class="hljs-keyword">string</span> paytmChecksum = <span class="hljs-string">""</span>;
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> Request.Form.Keys)
&#123;
    parameters.Add(key.Trim(), Request.Form[key].Trim());
&#125;
<span class="hljs-keyword">if</span> (parameters.ContainsKey(<span class="hljs-string">"CHECKSUMHASH"</span>))
&#123;
    paytmChecksum = parameters[<span class="hljs-string">"CHECKSUMHASH"</span>];
    parameters.Remove(<span class="hljs-string">"CHECKSUMHASH"</span>);
&#125;
<span class="hljs-keyword">if</span> (CheckSum.verifyCheckSum(merchantKey, parameters, paytmChecksum))
&#123;
    Response.Write(<span class="hljs-string">"Checksum Matched"</span>);
&#125;
<span class="hljs-keyword">else</span>
&#123;
    Response.Write(<span class="hljs-string">"Checksum MisMatch"</span>);
&#125;</code></pre>`}}></span>
       </TabPanel>
		<TabPanel tabId="php">
        <span dangerouslySetInnerHTML={
            {__html: `
<pre><code class="hljs language-php">$paytmChecksum = <span class="hljs-string">""</span>;
$paramList = <span class="hljs-keyword">array</span>();
$isValidChecksum = <span class="hljs-string">"FALSE"</span>;
$paramList = $_POST;
$paytmChecksum = <span class="hljs-keyword">isset</span>($_POST[<span class="hljs-string">"CHECKSUMHASH"</span>]) ? $_POST[<span class="hljs-string">"CHECKSUMHASH"</span>] : <span class="hljs-string">""</span>;
$isValidChecksum = verifychecksum_e($paramList, <span class="hljs-string">"PAYTM_MERCHANT_KEY_HERE"</span>, $paytmChecksum);
<span class="hljs-keyword">if</span>($isValidChecksum == <span class="hljs-string">"TRUE"</span>) &#123;
<span class="hljs-keyword">echo</span>&nbsp;<span class="hljs-string">"&lt;b&gt;Checksum matched.&lt;/b&gt;"</span>;
&#125; <span class="hljs-keyword">else</span> &#123;
<span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;b&gt;Checksum mismatched!!!&lt;/b&gt;"</span>;
&#125;
</code></pre>`}}></span>
    </TabPanel>
</Tabs>
</div>

For further details & codes in multiple languages, click below links - 

**For App:**



<div className={`${style.ecomPlatform} grid justify-start`}>
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
                <a href='https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_Python' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-python.png' alt=''/>
                        <label>Python</label>
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

Post completion of integration on your staging environment, do a complete transaction from order summary page/cart on your website/APP 

1. Attempt a test transaction using <a href="https://developer.paytm.com/docs/testing-integration">test paymodes credentials</a>
2. Ensure you re-verify transaction response with [Transaction Status API](https://developer.paytm.com/docs/transaction-status-api) via server to server call in payment flow and not separately as a one time activity    
3. See the transaction details in “Test Data” mode on your <a href="https://dashboard.paytm.com/next/transactions" target="_blank">dashboard</a>


Once the test transaction is complete, move your code to live environment with production account details. Note that production accounts details are available after you have <a href='https://dashboard.paytm.com/next/activate' target="_blank">activate your account </a> on the dashboard

Additionally to better manage payments on your platform, kindly though [Refund Management](https://developer.paytm.com/docs/refund-management) and [Late Notification](https://developer.paytm.com/docs/late-notification)

In case of any issues, please search or post your query on our <a href="http://paywithpaytm.com/developer/discussion/" target="_blank">Developer Forum</a> or send your queries to devsupport@paytm.com


