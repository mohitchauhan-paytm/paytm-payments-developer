import * as style from './android-sdk.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import CenterLayout from '../../../../components/center-layout';
import Layout from './../../../../components/layout';

export default ({children,location}) => (
        <Layout>
            <CenterLayout>
                {children}
            </CenterLayout>
        </Layout>
)

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

There are 6 steps to accept payment your APP. First four steps are are required to integrate SDK on your APP and last two needs to done on your server for checksumhash generation & verification


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
paramMap.put( "MID" , "PAYTM_MERCHANT_ID");
paramMap.put( "ORDER_ID" , "ORDER0000000001");
paramMap.put( "CUST_ID" , "10000988111");
paramMap.put( "INDUSTRY_TYPE_ID" , "PAYTM_INDUSTRY_TYPE_ID");
paramMap.put( "CHANNEL_ID" , "WAP");
paramMap.put( "TXN_AMOUNT" , "1.00");
paramMap.put( "WEBSITE" , "PAYTM_WEBSITE");
paramMap.put( "CALLBACK_URL", "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=ORDER0000000001");
paramMap.put( "EMAIL" , "abc@gmail.com");
paramMap.put( "MOBILE_NO" , "9999999999");
paramMap.put( "CHECKSUMHASH" , "w2QDRMgp1234567JEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4=")
```

#### Description of Parameters used in hashmap objects:

| **Parameter Name**     |    **Description** |
| ------------- | ----- | ----- |
| **MID**  Alphanumeric(50)       | Available with your account details in dashboard. Different for staging and production
|**ORDER_ID** Alphanumeric(50)      | Merchant’s unique reference ID for a transaction   Special characters allowed in Order Id are: “@” “-” “_”  “.”.
|**CUST_ID** Alphanumeric(50)   | Merchant’s unique reference ID for every customer Special characters e.g @, ! ,_ $ are allowed
|**TXN_AMOUNT** Numeric(50)      | Amount in INR payable by customer. Should contain digits up to two decimal points. The amount should not include any separator like (“,”)
|**CHANNEL_ID** Alphanumeric(50)  | 1. WEB – for websites <br/> 2. WAP - for Mobile websites/App
|**INDUSTRY_TYPE_ID** Alphanumeric(50)    | Staging Environment: Retail Production environment: Will be provided with production credentials in the dashboard
|**WEBSITE** Alphanumeric(50)  | Staging Environment: <br/> 1. WEBSTAGING for websites <br/>2.APPSTAGING for Mobile websites/App Production environment: Will be provided with production credentials in dashboard
|**CHECKSUMHASH** Alphanumeric(500)  | Security parameter to avoid tampering. Generated using server side checksum utility provided by Paytm
|**MOBILE_NO** Numeric (15)  | Customer mobile number. Passing this enables faster login for customer into his/her Paytm account
|**EMAIL** Email(50)  | Customer email Id. Passing this enables faster login for customer into his/her mobile wallet.
|**CALLBACK_URL** URL(255)  | URL on which response of transaction request will be posted 

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
<pre><code className="hljs language-java">&lt;%@ page language=<span className="hljs-string">"java"</span> contentType=<span className="hljs-string">"text/html; charset=ISO-8859-1"</span> pageEncoding=<span className="hljs-string">"ISO-8859-1"</span>%&gt;<br/>
&lt;%@ page <span className="hljs-keyword">import</span>=<span className="hljs-string">"java.util.*,com.paytm.merchant.CheckSumServiceHelper"</span>%&gt; 
&lt;%<br/>
TreeMap parameters = <span className="hljs-keyword">new</span> TreeMap();<br/>
parameters.put(<span className="hljs-string">"MID"</span>,<span className="hljs-string">"PaytXXXX829682567544"</span>);<br/>
parameters.put(<span className="hljs-string">"ORDER_ID"</span>,<span className="hljs-string">"23456df78"</span>);<br/>
parameters.put(<span className="hljs-string">"CHANNEL_ID"</span>,<span className="hljs-string">"WEB"</span>);<br/>
parameters.put(<span className="hljs-string">"INDUSTRY_TYPE_ID"</span>,<span className="hljs-string">"Retail"</span>);<br/>
parameters.put(<span className="hljs-string">"CUST_ID"</span>,<span className="hljs-string">"cust123"</span>);<br/>
parameters.put(<span className="hljs-string">"TXN_AMOUNT"</span>,<span className="hljs-string">"1"</span>);<br/>
parameters.put(<span className="hljs-string">"WEBSITE"</span>,<span className="hljs-string">"WEBSTAGING"</span>);<br/>
parameters.put(<span className="hljs-string">"MOBILE_NO"</span>,<span className="hljs-string">"9876543210"</span>);<br/>
parameters.put(<span className="hljs-string">"EMAIL"</span>,<span className="hljs-string">"test@gmail.com"</span>);<br/>
parameters.put(<span className="hljs-string">"CALLBACK_URL"</span>, <span className="hljs-string">"http://localhost:8080/paytm_java/pgResponse.jsp"</span>);<br/>
String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span className="hljs-string">"WavZ_VTwsM018CP@"</span>, parameters);<br/>
StringBuilder outputHtml = <span className="hljs-keyword">new</span> StringBuilder();<br/>
outputHtml.append(<span className="hljs-string">"&lt;!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;html&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;head&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/title&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/head&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;body&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;form method='post' action='https://securegw-stage.paytm.in/theia/processTransaction' name='f1'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;table border='1'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;tbody&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='MID' value='LABBAA02020548079335'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='CHANNEL_ID' value='WEB'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='INDUSTRY_TYPE_ID' value='Retail'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='WEBSITE' value='WEBSTAGING'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='TXN_AMOUNT' value='1'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='ORDER_ID' value='ranjeet12345678'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='MOBILE_NO' value='9876543210'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='CUST_ID' value='cust123'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='EMAIL' value='test@gmail.com'&gt;"</span>);	<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='CALLBACK_URL' value='http://localhost:8080/paytm_java/pgResponse.jsp'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span>+checkSum+<span className="hljs-string">"'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/tbody&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/table&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;script type='text/javascript'&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"document.f1.submit();"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/script&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/form&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/body&gt;"</span>);<br/>
outputHtml.append(<span className="hljs-string">"&lt;/html&gt;"</span>);</code></pre>
    </TabPanel>
		<TabPanel tabId="net">
<pre><code className="hljs language-cs">Dictionary parameters = <span className="hljs-keyword">new</span> Dictionary();<br/>
String Merchant_key=<span className="hljs-string">"I%VyKUMWdwEDyh4z"</span>;<br/>
String MID=<span className="hljs-string">"PaytXXXX829682567544"</span>;<br/>
String Website=<span className="hljs-string">"WEBSTAGING"</span>;<br/>
parameters.Add(<span className="hljs-string">"MID"</span>, MID);<br/>
parameters.Add(<span className="hljs-string">"REQUEST_TYPE"</span>, <span className="hljs-string">"DEFAULT"</span>);<br/>
parameters.Add(<span className="hljs-string">"CHANNEL_ID"</span>, <span className="hljs-string">"WEB"</span>);<br/>
parameters.Add(<span className="hljs-string">"INDUSTRY_TYPE_ID"</span>, <span className="hljs-string">"Retail"</span>);<br/>
parameters.Add(<span className="hljs-string">"WEBSITE"</span>, Website);<br/>
<span className="hljs-keyword">string</span> custId = <span className="hljs-string">"gaurav3.sharma@paytm.com"</span>;<br/>
<span className="hljs-keyword">string</span> paytmURL = <span className="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;<br/>
parameters.Add(<span className="hljs-string">"CALLBACK_URL"</span>, <span className="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>);<br/>
parameters.Add(<span className="hljs-string">"CUST_ID"</span>, <span className="hljs-string">"4567fghhn"</span>);<br/>
parameters.Add(<span className="hljs-string">"ORDER_ID"</span>, <span className="hljs-string">"value1334231"</span>);<br/>
parameters.Add(<span className="hljs-string">"TXN_AMOUNT"</span>, <span className="hljs-string">"1"</span>);<br/>
<span className="hljs-keyword">try 	</span><br/>
&#123;<br/>
<span className="hljs-keyword">string</span> checksum = paytm.CheckSum.generateCheckSum(Merchant_key, parameters);<br/>
<span className="hljs-keyword">string</span> outputHTML = <span className="hljs-string">"&lt;htm&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;hea&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/titl&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/hea&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;bod&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/cente&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;form method='post' action='"</span> + paytmURL + <span className="hljs-string">"' name='f1&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;table border='1&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;tbod&gt;"</span>;<br/>
<span className="hljs-keyword">foreach</span> (<span className="hljs-keyword">string</span> key <span className="hljs-keyword">in</span> parameters.Keys)<br/>
&#123;<br/>
outputHTML += <span className="hljs-string">"&lt;input type='hidden' name='"</span> + key + <span className="hljs-string">"' value='"</span> + parameters[key] + <span className="hljs-string">"'&gt;'"</span>;<br/>
	&#125;<br/>
outputHTML += <span className="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span> + checksum + <span className="hljs-string">"&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/tbod&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/tabl&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;script type='text/javascript&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"document.f1.submit();"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/scrip&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/for&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/bod&gt;"</span>;<br/>
outputHTML += <span className="hljs-string">"&lt;/htm&gt;"</span>;<br/>
Response.Write(outputHTML);<br/>
&#125;<br/>
<span className="hljs-keyword">catch</span> (Exception ex)<br/>
Response.Write(<span className="hljs-string">"Exception message: "</span> + ex.Message.ToString());<br/>
</code></pre>
    </TabPanel>
		<TabPanel tabId="php">
<pre><code className="hljs language-php"><span className="hljs-meta">&lt;?php</span><br/>
header(<span className="hljs-string">"Pragma: no-cache"</span>);<br/>
header(<span className="hljs-string">"Cache-Control: no-cache"</span>);<br/>
header(<span className="hljs-string">"Expires: 0"</span>);<br/>
<span className="hljs-comment">// following files need to be included</span><span className="hljs-keyword"><br/>
require_once</span>(<span className="hljs-string">"./lib/config_paytm.php"</span>);<br/>
<span className="hljs-keyword">require_once</span>(<span className="hljs-string">"./lib/encdec_paytm.php"</span>);<br/>
$checkSum = <span className="hljs-string">""</span>;<br/>
$paramList = <span className="hljs-keyword">array</span>();<br/>
$ORDER_ID = $_POST[<span className="hljs-string">"ORDER_ID"</span>];<br/>
$CUST_ID = $_POST[<span className="hljs-string">"CUST_ID"</span>];<br/>
$INDUSTRY_TYPE_ID = $_POST[<span className="hljs-string">"INDUSTRY_TYPE_ID"</span>];<br/>
$CHANNEL_ID = $_POST[<span className="hljs-string">"CHANNEL_ID"</span>];<br/>
$TXN_AMOUNT = $_POST[<span className="hljs-string">"TXN_AMOUNT"</span>];<br/>
<span className="hljs-comment">// Create an array having all required parameters for creating checksum.</span><br/>
$paramList[<span className="hljs-string">"MID"</span>] = PAYTM_MERCHANT_MID;<br/>
$paramList[<span className="hljs-string">"ORDER_ID"</span>] = $ORDER_ID;<br/>
$paramList[<span className="hljs-string">"CUST_ID"</span>] = $CUST_ID;<br/>
$paramList[<span className="hljs-string">"INDUSTRY_TYPE_ID"</span>] = $INDUSTRY_TYPE_ID;<br/>
$paramList[<span className="hljs-string">"CHANNEL_ID"</span>] = $CHANNEL_ID;<br/>
$paramList[<span className="hljs-string">"TXN_AMOUNT"</span>] = $TXN_AMOUNT;<br/>
$paramList[<span className="hljs-string">"WEBSITE"</span>] = PAYTM_MERCHANT_WEBSITE;<br/>
$paramList[<span className="hljs-string">"CALLBACK_URL"</span>] = <span className="hljs-string">"http://localhost/Projects/Paytm_Web_Sample_Kit_PHP-masterr/PaytmKit/pgResponse.php"</span>;<br/>
$paramList[<span className="hljs-string">"MOBILE_NO"</span>] = <span className="hljs-string">'9999999999'</span>;<br/>
$paramList[<span className="hljs-string">"EMAIL"</span>] = <span className="hljs-string">'test@gmail.com'</span>;<br/>
<span className="hljs-comment">//Here checksum string will return by getChecksumFromArray() function.</span><br/>
$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);<br/>
&lt;title&gt;Merchant Check Out Page $value) &#123;<br/>
<span className="hljs-comment">//echo $checkSum;</span><span className="hljs-comment">//echo $data_string;</span><span className="hljs-meta">?&gt;</span><br/>
&lt;html&gt;<br/>
&lt;head&gt;<br/>
&lt;title&gt;Merchant Check Out Page $value) &#123;<br/>
<span className="hljs-keyword">echo</span> <span className="hljs-string">'&lt;input type="hidden" name="'</span> . $name .<span className="hljs-string">'" value="'</span> . $value . <span className="hljs-string">'"&gt;'</span>;<br/>
&#125;<br/>
<span className="hljs-meta">?&gt;</span><br/>
&lt;input type=<span className="hljs-string">"hidden"</span> name=<span className="hljs-string">"CHECKSUMHASH"</span> value=<span className="hljs-string">"&lt;?php echo $checkSum ?&gt;"</span>&gt;<br/>
&lt;/tbody&gt;<br/>
&lt;/table&gt;<br/>
&lt;script type=<span className="hljs-string">"text/javascript"</span>&gt;<br/>
document.f1.submit();<br/>
&lt;/script&gt;<br/>
&lt;/form&gt;<br/>
<span className="hljs-meta">&lt;?php</span><span className="hljs-meta">?&gt;</span><br/>
&lt;/body&gt;<br/>
&lt;/html&gt;</code></pre>
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
<pre><code className="hljs language-java">Package com.paytm.pg.checksumKit;<br/>
<span className="hljs-keyword">import</span> com.paytm.pg.merchant.*;<br/>
<span className="hljs-keyword">import</span> java.util.Map;<br/>
<span className="hljs-keyword">import</span> java.util.TreeMap;<br/>
<span className="hljs-keyword">public</span> <span className="hljs-className"><span className="hljs-keyword">className</span> <span className="hljs-title">checksumVerification</span> </span>&#123;<br/>
<span className="hljs-keyword">public</span> <span className="hljs-keyword">static</span> String MercahntKey = <span className="hljs-string">"XXXXXXXXXXX"</span>;<br/>
<span className="hljs-function"><span className="hljs-keyword">public</span> <span className="hljs-keyword">static</span> <span className="hljs-keyword">void</span> <span className="hljs-title">main</span><span className="hljs-params">(String[] a)</span></span>&#123;<br/>
String paytmChecksum = <span className="hljs-string">""</span>;<br/>
Map&lt;String, String&gt; mapData = <span className="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();<br/>
TreeMap&lt;String, String&gt; paytmParams = <span className="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();<br/>
<span className="hljs-keyword">for</span> (Map.Entry&lt;String, String&gt; entry : mapData.entrySet())<br/>
&#123;<br/>
<span className="hljs-keyword">if</span>(entry.getKey().equals(<span className="hljs-string">"CHECKSUMHASH"</span>))&#123;<br/>
paytmChecksum = entry.getKey();<br/>
&#125;<span className="hljs-keyword">else</span>&#123;<br/><br/>
paytmParams.put(entry.getKey(), entry.getValue());<br/>
&#125;<br/>
&#125;<br/>
<span className="hljs-keyword">boolean</span> isValideChecksum = <span className="hljs-keyword">false</span>;<br/>
<span className="hljs-keyword">try</span>&#123;<br/>
isValideChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().<br/>
verifycheckSum(MercahntKey, paytmParams, paytmChecksum);	<br/>
System.out.println(isValideChecksum);<br/>
<span className="hljs-comment">// if checksum is validated Kindly verify the amount and status </span><br/><span className="hljs-comment">// if transaction is successful </span><br/><span className="hljs-comment">// kindly call Paytm Transaction Status API and verify the transaction amount and status.</span><br/><span className="hljs-comment">// If everything is fine then mark that transaction as successful into your DB.</span><br/>
&#125;<span className="hljs-keyword">catch</span>(Exception e)&#123;<br/>
e.printStackTrace();<br/>
&#125;<br/>
&#125;<br/>
&#125;</code></pre>
    </TabPanel>
	<TabPanel tabId="net">
<pre><code className="hljs language-cs">String merchantKey = “merchantKey <span className="hljs-keyword">value</span>” ;<br/>
<span className="hljs-comment">// Replace the with the Merchant Key provided by Paytm at the time of registration.</span><br/>
Dictionary&lt;<span className="hljs-keyword">string</span>, <span className="hljs-keyword">string</span>&gt; parameters = <span className="hljs-keyword">new</span> Dictionary&lt;<span className="hljs-keyword">string</span>, <span className="hljs-keyword">string</span>&gt;();<br/>
<span className="hljs-keyword">string</span> paytmChecksum = <span className="hljs-string">""</span>;<br/>
<span className="hljs-keyword">foreach</span> (<span className="hljs-keyword">string</span> key <span className="hljs-keyword">in</span> Request.Form.Keys)<br/>
&#123;<br/>
    parameters.Add(key.Trim(), Request.Form[key].Trim());<br/>
&#125;<br/>
<span className="hljs-keyword">if</span> (parameters.ContainsKey(<span className="hljs-string">"CHECKSUMHASH"</span>))<br/>
&#123;<br/>
    paytmChecksum = parameters[<span className="hljs-string">"CHECKSUMHASH"</span>];<br/>
    parameters.Remove(<span className="hljs-string">"CHECKSUMHASH"</span>);<br/>
&#125;<br/>
<span className="hljs-keyword">if</span> (CheckSum.verifyCheckSum(merchantKey, parameters, paytmChecksum))<br/>
&#123;<br/>
    Response.Write(<span className="hljs-string">"Checksum Matched"</span>);<br/>
&#125;<br/>
<span className="hljs-keyword">else</span><br/>
&#123;<br/>
    Response.Write(<span className="hljs-string">"Checksum MisMatch"</span>);<br/>
&#125;</code></pre>
    </TabPanel>
		<TabPanel tabId="php">
<pre><code className="hljs language-php">$paytmChecksum = <span className="hljs-string">""</span>;<br/>
$paramList = <span className="hljs-keyword">array</span>();<br/>
$isValidChecksum = <span className="hljs-string">"FALSE"</span>;<br/>
$paramList = $_POST;<br/>
$paytmChecksum = <span className="hljs-keyword">isset</span>($_POST[<span className="hljs-string">"CHECKSUMHASH"</span>]) ? $_POST[<span className="hljs-string">"CHECKSUMHASH"</span>] : <span className="hljs-string">""</span>;<br/>
$isValidChecksum = verifychecksum_e($paramList, <span className="hljs-string">"PAYTM_MERCHANT_KEY_HERE"</span>, $paytmChecksum);<br/>
<span className="hljs-keyword">if</span>($isValidChecksum == <span className="hljs-string">"TRUE"</span>) &#123;<br/>
<span className="hljs-keyword">echo</span>&nbsp;<span className="hljs-string">"&lt;b&gt;Checksum matched.&lt;/b&gt;"</span>;<br/>
&#125; <span className="hljs-keyword">else</span> &#123;<br/>
<span className="hljs-keyword">echo</span> <span className="hljs-string">"&lt;b&gt;Checksum mismatched!!!&lt;/b&gt;"</span>;<br/>
&#125;</code></pre>
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


import { Helmet } from "react-helmet";

<Helmet>
    <title>Paytm Android SDK: Accept payments in your Android mobile app</title>
</Helmet>

