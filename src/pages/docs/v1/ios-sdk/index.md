---
path:  "/docs/v1/ios-sdk/index.md"
---

import * as style from './ios-sdk.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Helmet } from "react-helmet";

<Helmet>
    <title>Paytm iOS SDK: Accept payments in your iOS mobile app</title>
</Helmet>

# Collect online payments with our iOS SDK

Paytm has created iOS SDK over our powerful APIs, allowing you to take payments in minutes. With our SDK, we shoulder the burden of PCI compliance by eliminating the need to send card data directly to your server.
 
Our iOS SDK is easy to integrate, featherlight & self updating. Hence If a bank launches a new series of cards or wallet, the same is provided to your customers without any new integration.


## Demo of Paytm checkout flow in your app -  

---

<br/>

<img src='/assets/merchant-pg.gif' width="250" alt='' />


## Overview of payment processing via Paytm checkout
---

1. At click of the pay button by customer, order related payload is passed to your server by the APP 
2. This order payload is used to generate checksumhash by our server side utility & merchant key on your server. Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered
3. Your server passes the payload and checksumhash back to the APP which hands over these details to Paytm SDK    
4. Paytm SDK connects with Paytm server to fetch the paymodes and render the payment page
5. Customer fills the payment details and completes the payment authentication. Once the payment is complete, response is posted back to your APP via callback
6. Verify checksumhash received in response on your server side 
7. Lastly, verify transaction status with Transaction Status API via server to server call. This protects you from scenarios where your account credentials are compromised or request/response has been tampered 

Find the detailed interaction of each system component in the flow chart below

<br/>

<img src='/assets/img-flow-android-ios-sdk.png' alt='' />

## Steps to start accepting payments via iOS SDK

---


### Step 1:  Importing the library

Follow the below steps to download import the library in your project


#### For Swift:
* Download the sdk from here. You have an option to download bitcode enabled and disabled SDK 
* Open your project in XCode and from File menu, select Add files to "yourproject" 
* Select Paytm.framework in the directory you just unzipped
* Make sure 'Copy items if needed' is checked and Click 'Add'
* Under "Link Binary With Libraries" in the "Build Phases" tab of your project settings, add SystemConfiguration.framework
* Check PaytmSDK.framework is added in both “Link Binary With Libraries” and “Embedded Binaries”. If not add by clicking on plus icon

---

#### For Objective C:
* Download the sdk from here. You have an option to download bitcode enabled and disabled SDK 
* Open the existing project in XCode 
* Go to the Build Phases tab, expand the Link Binary With Libraries section, click the "+" button
* In the newly appeared “Choose items to add” window, click the “Add Other..” button. and specify the path to libPaymentsSDK.a library file and click the Open button
* In the Link Frameworks and Libraries section, click the "+" button again, find the  SystemConfiguration.framework. in the list, and click the Add button.

---

### Step 2: Initiate Payment

Begin the transaction by calling the below method.

1. Choose the PG server based on the environment you need to connect with. <br/>
For staging - Create an instance of the `PGServerEnvironment` and set the `serverType` to `eServerTypeStaging` <br/>
For Production - Create an instance of the `PGServerEnvironment` and set the `serverType` to `eServerTypeProduction` 
2. Create an `PGOrder` instance with the mandatory parameters as given below in the code snippet. In addition to this, you may add other optional parameters as needed. Parameters with their detailed meaning is provided after the code snippet

3. Create an instance of `PGTransactionViewController` by calling `initTransactionForOrder` and pass the `PGOrder` instance as parameter. 

4. Push the `PGTransactionViewController` as given below in the code snippet.


<div className={`${style.iosCodeWrapper}`}>

<Tabs defaultTab="swift">
	<TabList>
            <Tab tabFor="swift">Swift</Tab>
            <Tab tabFor="c">Objective C</Tab>
    </TabList>
    <TabPanel tabId="swift">
<span dangerouslySetInnerHTML={{
            __html: `
<pre><code class="hljs language-swift"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">beginPayment</span><span class="hljs-params">()</span></span>
&#123;
serv = serv.createProductionEnvironment()
<span class="hljs-keyword">let</span> type :<span class="hljs-type">ServerType</span> = .eServerTypeProduction
<span class="hljs-keyword">let</span> order = <span class="hljs-type">PGOrder</span>(orderID: <span class="hljs-string">""</span>, customerID: <span class="hljs-string">""</span>, amount: <span class="hljs-string">""</span>, eMail: <span class="hljs-string">""</span>, mobile: <span class="hljs-string">""</span>)
order.params = [<span class="hljs-string">"MID"</span>: <span class="hljs-string">"TESTRZ75000326065913"</span>,
<span class="hljs-string">"ORDER_ID"</span>: <span class="hljs-string">"ord1"</span>,
<span class="hljs-string">"CUST_ID"</span>: <span class="hljs-string">"cust123"</span>,
<span class="hljs-string">"CHANNEL_ID"</span>: <span class="hljs-string">"WAP"</span>,
<span class="hljs-string">"WEBSITE"</span>: <span class="hljs-string">"TECHweb"</span>,
<span class="hljs-string">"TXN_AMOUNT"</span>: <span class="hljs-string">"100.12"</span>,
<span class="hljs-string">"CHECKSUMHASH"</span>: <span class="hljs-string">"oCDBVF+hvVb68JvzbKI40TOtcxlNjMdixi9FnRSh80Ub7XfjvgNr9NrfrOCPLmt65UhStCkrDnlYkclz1qE0uBMOrmuKLGlybuErulbLYSQ="</span>,
<span class="hljs-string">"CALLBACK_URL"</span>: <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>]
<span class="hljs-keyword">self</span>.txnController =  <span class="hljs-keyword">self</span>.txnController.initTransaction(<span class="hljs-keyword">for</span>: order) <span class="hljs-keyword">as</span>?<span class="hljs-type">PGTransactionViewController</span>
<span class="hljs-keyword">self</span>.txnController.title = <span class="hljs-string">"Paytm Payments"</span>
<span class="hljs-keyword">self</span>.txnController.setLoggingEnabled(<span class="hljs-literal">true</span>)
<span class="hljs-keyword">if</span>(type != <span class="hljs-type">ServerType</span>.eServerTypeNone)
&#123;
<span class="hljs-keyword">self</span>.txnController.serverType = type;
&#125;
<span class="hljs-keyword">else</span>
&#123;
<span class="hljs-keyword">return</span>
&#125;
<span class="hljs-keyword">self</span>.txnController.merchant = <span class="hljs-type">PGMerchantConfiguration</span>.defaultConfiguration()
<span class="hljs-keyword">self</span>.txnController.delegate = <span class="hljs-keyword">self</span>
<span class="hljs-keyword">self</span>.navigationController?.pushViewController(<span class="hljs-keyword">self</span>.txnController
, animated: <span class="hljs-literal">true</span>)
&#125;
</code></pre>`}}></span>
    </TabPanel>
    <TabPanel tabId="c">
<span dangerouslySetInnerHTML={{
            __html:  `
<pre><code class="hljs language-objectivec">- (<span class="hljs-keyword">void</span>)beginPayment&#123;
PGOrder *order = [PGOrder orderForOrderID:<span class="hljs-string">@""</span>
customerID:<span class="hljs-string">@""</span>
amount:<span class="hljs-string">@""</span>
customerMail:<span class="hljs-string">@""</span>
customerMobile:<span class="hljs-string">@""</span>];
order.params =   @&#123;<span class="hljs-string">@"MID"</span> : <span class="hljs-string">@"TESTRZ75000326065913"</span>,
<span class="hljs-string">@"ORDER_ID"</span>: <span class="hljs-string">@"ord1"</span>,
<span class="hljs-string">@"CUST_ID"</span> : <span class="hljs-string">@"cust123"</span>,
<span class="hljs-string">@"CHANNEL_ID"</span>: <span class="hljs-string">@"WAP"</span>,
<span class="hljs-string">@"WEBSITE"</span>: <span class="hljs-string">@"TECHweb"</span>,
<span class="hljs-string">@"TXN_AMOUNT"</span>: <span class="hljs-string">@"100.12"</span>,
<span class="hljs-string">@"CHECKSUMHASH"</span>:<span class="hljs-string">@"Bzk47IMatCI7T3b21iB403MsRBNhJ9DWHeK79iD+dli6GUg5w+JKDk6gk6roSjuKrtFzDiXwuUsfgVz30Xa2+W+kgwnNQaZXJTSfKPy6gU4="</span>,
<span class="hljs-string">@"CALLBACK_URL"</span>:<span class="hljs-string">@"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>
&#125;
PGTransactionViewController *txnController = [[PGTransactionViewController alloc] initTransactionForOrder:order];
txnController.loggingEnabled = <span class="hljs-literal">YES</span>;
<span class="hljs-keyword">if</span> (type != eServerTypeNone)
txnController.serverType = type;
<span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span>;
txnController.merchant = [PGMerchantConfiguration defaultConfiguration];
txnController.delegate = <span class="hljs-keyword">self</span>;
[<span class="hljs-keyword">self</span>.navigationController pushViewController:txnController animated:<span class="hljs-literal">YES</span>];
&#125;
</code></pre>`}}></span>
</TabPanel>
</Tabs>

</div>

### Description of Parameters:

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

---

### STEP 3: Handle error and success responses
To handle success/errors on completion of payment, implement `didFinishedResponse`, `didCancelTrasaction`, `errorMisssingParameter` methods of the `PGTransactionDelegate`. Code snippet provided below


<div className={`${style.iosCodeWrapper}`}>

<Tabs defaultTab="swift">
	<TabList>
            <Tab tabFor="swift">Swift</Tab>
            <Tab tabFor="c">Objective C</Tab>
    </TabList>
    <TabPanel tabId="swift">
<span dangerouslySetInnerHTML={{
                     __html: `
<pre><code class="hljs language-swift"><span class="hljs-comment">//this function triggers when transaction gets finished
</span><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didFinishedResponse</span><span class="hljs-params">(<span class="hljs-number">_</span> controller: PGTransactionViewController, response responseString: String)</span></span>
&#123;
<span class="hljs-keyword">let</span> msg : <span class="hljs-type">String</span> = responseString
<span class="hljs-keyword">var</span> titlemsg : <span class="hljs-type">String</span> = <span class="hljs-string">""</span>
<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> data = responseString.data(using: <span class="hljs-type">String</span>.<span class="hljs-type">Encoding</span>.utf8) &#123;
<span class="hljs-keyword">do</span> &#123;
<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> jsonresponse = <span class="hljs-keyword">try</span> <span class="hljs-type">JSONSerialization</span>.jsonObject(with: data, options: .mutableContainers) <span class="hljs-keyword">as</span>? [<span class="hljs-type">String</span>:<span class="hljs-type">Any</span>] , jsonresponse.<span class="hljs-built_in">count</span> &gt; <span class="hljs-number">0</span>&#123;
titlemsg = jsonresponse[<span class="hljs-string">"STATUS"</span>] <span class="hljs-keyword">as</span>? <span class="hljs-type">String</span> ?? <span class="hljs-string">""</span>
&#125;
&#125; <span class="hljs-keyword">catch</span> &#123;
<span class="hljs-built_in">print</span>(<span class="hljs-string">"Something went wrong"</span>)
&#125;
&#125;
<span class="hljs-keyword">let</span> actionSheetController: <span class="hljs-type">UIAlertController</span> = <span class="hljs-type">UIAlertController</span>(title: titlemsg , message: msg, preferredStyle: .alert)
<span class="hljs-keyword">let</span> cancelAction : <span class="hljs-type">UIAlertAction</span> = <span class="hljs-type">UIAlertAction</span>(title: <span class="hljs-string">"OK"</span>, style: .cancel) &#123; action -&gt; <span class="hljs-type">Void</span> <span class="hljs-keyword">in</span>
controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
&#125;
actionSheetController.addAction(cancelAction)
<span class="hljs-keyword">self</span>.present(actionSheetController, animated: <span class="hljs-literal">true</span>, completion: <span class="hljs-literal">nil</span>)
&#125;  
<span class="hljs-comment">//this function triggers when transaction gets cancelled</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didCancelTrasaction</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController)</span></span>
&#123;
controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
&#125;
<span class="hljs-comment">//Called when a required parameter is missing.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">errorMisssingParameter</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController, error : NSError?)</span></span> &#123;
controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
&#125;</code></pre>`}}></span>
</TabPanel>
<TabPanel tabId="c">
<span dangerouslySetInnerHTML={{
        __html: `
<pre><code class="hljs language-objectivec"><span class="hljs-comment">//this function triggers when transaction gets finished</span>
-(<span class="hljs-keyword">void</span>)didFinishedResponse:(PGTransactionViewController *)controller response:(<span class="hljs-built_in">NSString</span> *)responseString &#123;
[controller.navigationController popViewControllerAnimated:<span class="hljs-literal">YES</span>];
&#125;
<span class="hljs-comment">//this function triggers when transaction gets cancelled</span>
-(<span class="hljs-keyword">void</span>)didCancelTrasaction:(PGTransactionViewController *)controller &#123;
[_statusTimer invalidate];
<span class="hljs-built_in">NSString</span> *msg = [<span class="hljs-built_in">NSString</span> stringWithFormat:<span class="hljs-string">@"UnSuccessful"</span>];    
[[[<span class="hljs-built_in">UIAlertView</span> alloc] initWithTitle:<span class="hljs-string">@"Transaction Cancel"</span> message:msg delegate:<span class="hljs-literal">nil</span> cancelButtonTitle:<span class="hljs-string">@"OK"</span> otherButtonTitles:<span class="hljs-literal">nil</span>] show];
[controller.navigationController popViewControllerAnimated:<span class="hljs-literal">YES</span>];
&#125;
<span class="hljs-comment">//Called when a required parameter is missing.</span>
-(<span class="hljs-keyword">void</span>)errorMisssingParameter:(PGTransactionViewController *)controller error:(<span class="hljs-built_in">NSError</span> *) error &#123;
[controller.navigationController popViewControllerAnimated:<span class="hljs-literal">YES</span>];
&#125;
</code></pre>`}}></span>
</TabPanel>
</Tabs>

</div>

---

### Step 4: Checksum generation & verification

#### Checksumhash Generation -

All requests sent to Paytm via SDK and APIs need to have checksumhash. Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered. All the parameters which are being sent in the request need to be sent to the server. Server will use our server side utility code to generate checksum. 
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
parameters.put(<span class="hljs-string">"MID"</span>,<span class="hljs-string">"TESTRZ75000326065913"</span>);
parameters.put(<span class="hljs-string">"ORDER_ID"</span>,<span class="hljs-string">"ord1"</span>);
parameters.put(<span class="hljs-string">"CHANNEL_ID"</span>,<span class="hljs-string">"WEB"</span>);
parameters.put(<span class="hljs-string">"CUST_ID"</span>,<span class="hljs-string">"cust123"</span>);
parameters.put(<span class="hljs-string">"TXN_AMOUNT"</span>,<span class="hljs-string">"100.12"</span>);
parameters.put(<span class="hljs-string">"WEBSITE"</span>,<span class="hljs-string">"WEBSTAGING"</span>);
parameters.put(<span class="hljs-string">"MOBILE_NO"</span>,<span class="hljs-string">"9999999999"</span>);
parameters.put(<span class="hljs-string">"EMAIL"</span>,<span class="hljs-string">"customer@gmail.com"</span>);
parameters.put(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>);
String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">"WavZ_VTwsM018CP@"</span>, parameters);</code></pre>
            `}}></span>
    </TabPanel>
	<TabPanel tabId="net">
        <span dangerouslySetInnerHTML={{
        __html:  ` 
<pre><code class="hljs language-cs">Dictionary parameters = <span class="hljs-keyword">new</span> Dictionary();
String Merchant_key=<span class="hljs-string">"I%VyKUMWdwEDyh4z"</span>;
String MID=<span class="hljs-string">"TESTRZ75000326065913"</span>;
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
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">checksumVerification</span> </span>&#123;
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> String MercahntKey = <span class="hljs-string">"XXXXXXXXXXX"</span>;
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] a)</span></span>&#123;
String paytmChecksum = <span class="hljs-string">""</span>;
Map&lt;String, String&gt; mapData = <span class="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();
TreeMap&lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span>  TreeMap&lt;String,String&gt;();
<span class="hljs-keyword">for</span> (Map.Entry&lt;String, String&gt; entry : mapData.entrySet())
&#123;
<span class="hljs-keyword">if</span>(entry.getKey().equals(<span class="hljs-string">"CHECKSUMHASH"</span>))&#123;
paytmChecksum = entry.getKey();
&#125;<span class="hljs-keyword">else</span>&#123;
paytmParams.put(entry.getKey(), entry.getValue());
&#125;
&#125;
<span class="hljs-keyword">boolean</span> isValideChecksum = <span class="hljs-keyword">false</span>;
<span class="hljs-keyword">try</span>&#123;
isValideChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().
verifycheckSum(MercahntKey, paytmParams, paytmChecksum);	
System.out.println(isValideChecksum);
<span class="hljs-comment">// if checksum is validated Kindly verify the amount and status </span><span class="hljs-comment">// if transaction is successful </span><span class="hljs-comment">// kindly call Paytm Transaction Status API and verify the transaction amount and status.</span><span class="hljs-comment">// If everything is fine then mark that transaction as successful into your DB.</span>
&#125;<span class="hljs-keyword">catch</span>(Exception e)&#123;
e.printStackTrace();
&#125;
&#125;
&#125;</code></pre>
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