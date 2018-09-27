---
path:  "/docs/v1/ios-sdk/index.md"
title: "Paytm iOS SDK: Accept payments in your iOS mobile app"
---

import * as style from './ios-sdk.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';


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
<pre><code class="hljs language-swift"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">beginPayment</span><span class="hljs-params">()</span></span> {
	serv = serv.createProductionEnvironment()
	<span class="hljs-keyword">let</span> type :<span class="hljs-type">ServerType</span> = .eServerTypeProduction
	<span class="hljs-keyword">let</span> order = <span class="hljs-type">PGOrder</span>(orderID: <span class="hljs-string">""</span>, customerID: <span class="hljs-string">""</span>, amount: <span class="hljs-string">""</span>, eMail: <span class="hljs-string">""</span>, mobile: <span class="hljs-string">""</span>)
	order.params = [<span class="hljs-string">"MID"</span>: <span class="hljs-string">"rxazcv89315285244163"</span>,
		<span class="hljs-string">"ORDER_ID"</span>: <span class="hljs-string">"order1"</span>,
		<span class="hljs-string">"CUST_ID"</span>: <span class="hljs-string">"cust123"</span>,
		<span class="hljs-string">"MOBILE_NO"</span>: <span class="hljs-string">"7777777777"</span>,
		<span class="hljs-string">"EMAIL"</span>: <span class="hljs-string">"username@emailprovider.com"</span>,
		<span class="hljs-string">"CHANNEL_ID"</span>: <span class="hljs-string">"WAP"</span>,
		<span class="hljs-string">"WEBSITE"</span>: <span class="hljs-string">"APPSTAGING"</span>,
		<span class="hljs-string">"TXN_AMOUNT"</span>: <span class="hljs-string">"100.12"</span>,
		<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>: <span class="hljs-string">"Retail"</span>,
		<span class="hljs-string">"CHECKSUMHASH"</span>: <span class="hljs-string">"oCDBVF+hvVb68JvzbKI40TOtcxlNjMdixi9FnRSh80Ub7XfjvgNr9NrfrOCPLmt65UhStCkrDnlYkclz1qE0uBMOrmuKLGlybuErulbLYSQ="</span>,
		<span class="hljs-string">"CALLBACK_URL"</span>: <span class="hljs-string">"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1"</span>]
	<span class="hljs-keyword">self</span>.txnController =  <span class="hljs-keyword">self</span>.txnController.initTransaction(<span class="hljs-keyword">for</span>: order) <span class="hljs-keyword">as</span>?<span class="hljs-type">PGTransactionViewController</span>
	<span class="hljs-keyword">self</span>.txnController.title = <span class="hljs-string">"Paytm Payments"</span>
	<span class="hljs-keyword">self</span>.txnController.setLoggingEnabled(<span class="hljs-literal">true</span>)
	<span class="hljs-keyword">if</span>(type != <span class="hljs-type">ServerType</span>.eServerTypeNone) {
		<span class="hljs-keyword">self</span>.txnController.serverType = type;
	} <span class="hljs-keyword">else</span> {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-keyword">self</span>.txnController.merchant = <span class="hljs-type">PGMerchantConfiguration</span>.defaultConfiguration()
	<span class="hljs-keyword">self</span>.txnController.delegate = <span class="hljs-keyword">self</span>
	<span class="hljs-keyword">self</span>.navigationController?.pushViewController(<span class="hljs-keyword">self</span>.txnController, animated: <span class="hljs-literal">true</span>)
}</code></pre>`}}></span>
    </TabPanel>
    <TabPanel tabId="c">
<span dangerouslySetInnerHTML={{
            __html:  `
<pre><code class="hljs language-objectivec">- (<span class="hljs-keyword">void</span>)beginPayment{
	PGOrder *order = [PGOrder orderForOrderID:<span class="hljs-string">@""</span>
		customerID:<span class="hljs-string">@""</span>
		amount:<span class="hljs-string">@""</span>
		customerMail:<span class="hljs-string">@""</span>
		customerMobile:<span class="hljs-string">@""</span>];
	order.params =   @{<span class="hljs-string">@"MID"</span> : <span class="hljs-string">@"rxazcv89315285244163"</span>,
		<span class="hljs-string">@"ORDER_ID"</span>: <span class="hljs-string">@"order1"</span>,
		<span class="hljs-string">@"CUST_ID"</span> : <span class="hljs-string">@"cust123"</span>,
		<span class="hljs-string">@"MOBILE_NO"</span> : <span class="hljs-string">@"7777777777"</span>,
		<span class="hljs-string">@"EMAIL"</span> : <span class="hljs-string">@"username@emailprovider.com"</span>,
		<span class="hljs-string">@"CHANNEL_ID"</span>: <span class="hljs-string">@"WAP"</span>,
		<span class="hljs-string">@"WEBSITE"</span>: <span class="hljs-string">@"APPSTAGING"</span>,
		<span class="hljs-string">@"TXN_AMOUNT"</span>: <span class="hljs-string">@"100.12"</span>,
		<span class="hljs-string">@"INDUSTRY_TYPE_ID"</span>: <span class="hljs-string">@"Retail"</span>,
		<span class="hljs-string">@"CHECKSUMHASH"</span>:<span class="hljs-string">@"Bzk47IMatCI7T3b21iB403MsRBNhJ9DWHeK79iD+dli6GUg5w+JKDk6gk6roSjuKrtFzDiXwuUsfgVz30Xa2+W+kgwnNQaZXJTSfKPy6gU4="</span>,
		<span class="hljs-string">@"CALLBACK_URL"</span>:<span class="hljs-string">@"https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=order1"</span>
	}
	PGTransactionViewController *txnController = [[PGTransactionViewController alloc] initTransactionForOrder:order];
	txnController.loggingEnabled = <span class="hljs-literal">YES</span>;
	
	<span class="hljs-keyword">if</span> (type != eServerTypeNone)
		txnController.serverType = type;
	<span class="hljs-keyword">else</span> 
		<span class="hljs-keyword">return</span>;
	txnController.merchant = [PGMerchantConfiguration defaultConfiguration];
	txnController.delegate = <span class="hljs-keyword">self</span>;
	[<span class="hljs-keyword">self</span>.navigationController pushViewController:txnController animated:<span class="hljs-literal">YES</span>];
}</code></pre>`}}></span>
</TabPanel>
</Tabs>

</div>

### Description of Parameters:

| Parameter Name  |   Description |
| ------------- | ----- | ----- |
| **MID**  String(20)       | Available with your account details in dashboard. Different for staging and production
|**ORDER_ID** String(50)      | Merchant’s unique reference ID for a transaction   Special characters allowed in Order Id are: “@” “-” “_”  “.”.
|**CUST_ID** String(64)   | Merchant’s unique reference ID for every customer Special characters e.g @, ! ,_ $ are allowed
|**TXN_AMOUNT** String(10)      | Amount in INR payable by customer. Should contain digits up to two decimal points. The amount should not include any separator like (“,”)
|**CHANNEL_ID** String(3)  | WAP
|**WEBSITE** String(30)  | Staging Environment: APPSTAGING <br/> Production environment: Will be provided with production credentials in dashboard
|**INDUSTRY_TYPE_ID** String(20)  | Staging Environment "Retail"
|**CHECKSUMHASH** String(108)  | Security parameter to avoid tampering. Generated using server side checksum utility provided by Paytm
|**MOBILE_NO** String(15)  | Customer mobile number. Passing this enables faster login for customer into his/her Paytm account
|**EMAIL** String(50)  | Customer email Id. Passing this enables faster login for customer into his/her mobile wallet.
|**CALLBACK_URL** String(255)  | Staging Environment: <br/> "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>" <br/> Production Environment: <br/> "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>"
 

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
<pre><code class="hljs language-swift"><span class="hljs-comment">//this function triggers when transaction gets finished</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didFinishedResponse</span><span class="hljs-params">(<span class="hljs-number">_</span> controller: PGTransactionViewController, response responseString: String)</span></span> {
	<span class="hljs-keyword">let</span> msg : <span class="hljs-type">String</span> = responseString
	<span class="hljs-keyword">var</span> titlemsg : <span class="hljs-type">String</span> = <span class="hljs-string">""</span>
	<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> data = responseString.data(using: <span class="hljs-type">String</span>.<span class="hljs-type">Encoding</span>.utf8) {
		<span class="hljs-keyword">do</span> {
			<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> jsonresponse = <span class="hljs-keyword">try</span> <span class="hljs-type">JSONSerialization</span>.jsonObject(with: data, options: .mutableContainers) <span class="hljs-keyword">as</span>? [<span class="hljs-type">String</span>:<span class="hljs-type">Any</span>] , jsonresponse.<span class="hljs-built_in">count</span> &gt; <span class="hljs-number">0</span>{
				titlemsg = jsonresponse[<span class="hljs-string">"STATUS"</span>] <span class="hljs-keyword">as</span>? <span class="hljs-type">String</span> ?? <span class="hljs-string">""</span>
			}
		} <span class="hljs-keyword">catch</span> {
			<span class="hljs-built_in">print</span>(<span class="hljs-string">"Something went wrong"</span>)
		}
	}
	<span class="hljs-keyword">let</span> actionSheetController: <span class="hljs-type">UIAlertController</span> = <span class="hljs-type">UIAlertController</span>(title: titlemsg , message: msg, preferredStyle: .alert)
	<span class="hljs-keyword">let</span> cancelAction : <span class="hljs-type">UIAlertAction</span> = <span class="hljs-type">UIAlertAction</span>(title: <span class="hljs-string">"OK"</span>, style: .cancel) { 
		action -&gt; <span class="hljs-type">Void</span> <span class="hljs-keyword">in</span>
		controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
	}
	actionSheetController.addAction(cancelAction)
	<span class="hljs-keyword">self</span>.present(actionSheetController, animated: <span class="hljs-literal">true</span>, completion: <span class="hljs-literal">nil</span>)
}  

<span class="hljs-comment">//this function triggers when transaction gets cancelled</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didCancelTrasaction</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController)</span></span> {
	controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
}

<span class="hljs-comment">//Called when a required parameter is missing.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">errorMisssingParameter</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController, error : NSError?)</span></span> {
	controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
}</code></pre>`}}></span>
</TabPanel>
<TabPanel tabId="c">
<span dangerouslySetInnerHTML={{
        __html: `
<pre><code class="hljs language-swift"><span class="hljs-comment">//this function triggers when transaction gets finished</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didFinishedResponse</span><span class="hljs-params">(<span class="hljs-number">_</span> controller: PGTransactionViewController, response responseString: String)</span></span> {
	<span class="hljs-keyword">let</span> msg : <span class="hljs-type">String</span> = responseString
	<span class="hljs-keyword">var</span> titlemsg : <span class="hljs-type">String</span> = <span class="hljs-string">""</span>
	<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> data = responseString.data(using: <span class="hljs-type">String</span>.<span class="hljs-type">Encoding</span>.utf8) {
		<span class="hljs-keyword">do</span> {
			<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> jsonresponse = <span class="hljs-keyword">try</span> <span class="hljs-type">JSONSerialization</span>.jsonObject(with: data, options: .mutableContainers) <span class="hljs-keyword">as</span>? [<span class="hljs-type">String</span>:<span class="hljs-type">Any</span>] , jsonresponse.<span class="hljs-built_in">count</span> &gt; <span class="hljs-number">0</span>{
				titlemsg = jsonresponse[<span class="hljs-string">"STATUS"</span>] <span class="hljs-keyword">as</span>? <span class="hljs-type">String</span> ?? <span class="hljs-string">""</span>
			}
		} <span class="hljs-keyword">catch</span> {
			<span class="hljs-built_in">print</span>(<span class="hljs-string">"Something went wrong"</span>)
		}
	}
	<span class="hljs-keyword">let</span> actionSheetController: <span class="hljs-type">UIAlertController</span> = <span class="hljs-type">UIAlertController</span>(title: titlemsg , message: msg, preferredStyle: .alert)
	<span class="hljs-keyword">let</span> cancelAction : <span class="hljs-type">UIAlertAction</span> = <span class="hljs-type">UIAlertAction</span>(title: <span class="hljs-string">"OK"</span>, style: .cancel) { 
		action -&gt; <span class="hljs-type">Void</span> <span class="hljs-keyword">in</span>
		controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
	}
	actionSheetController.addAction(cancelAction)
	<span class="hljs-keyword">self</span>.present(actionSheetController, animated: <span class="hljs-literal">true</span>, completion: <span class="hljs-literal">nil</span>)
}  

<span class="hljs-comment">//this function triggers when transaction gets cancelled</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">didCancelTrasaction</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController)</span></span> {
	controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
}

<span class="hljs-comment">//Called when a required parameter is missing.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">errorMisssingParameter</span><span class="hljs-params">(<span class="hljs-number">_</span> controller : PGTransactionViewController, error : NSError?)</span></span> {
	controller.navigationController?.popViewController(animated: <span class="hljs-literal">true</span>)
}</code></pre>`}}></span>
</TabPanel>
</Tabs>

</div>

---

### Step 4: Checksum generation & verification

#### Checksumhash Generation -

All requests sent to Paytm via SDK and APIs need to have checksumhash. Checksumhash is an encrypted payload used by Paytm to ensure that request has not been tampered. All the parameters which are being sent in the request need to be sent to the server. Server will use our server side utility code to generate checksum. 
Use the code below to generate 

<div className={`${style.dscrption}`}>
    <h4>Note:</h4>
    - Number of parameter used in checksum generation should be equal to number of request parameter. <br/>
    - Parameter value should be same for checksum generation and parameter passed to payment gateway. 
</div>

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
String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
String orderId = <span class="hljs-string">"order1"</span>;
String channelId = <span class="hljs-string">"WAP"</span>;
String custId = <span class="hljs-string">"cust123"</span>;
String mobileNo = <span class="hljs-string">"7777777777"</span>;
String email = <span class="hljs-string">"username@emailprovider.com"</span>;
String txnAmount = <span class="hljs-string">"100.12"</span>;
String website = <span class="hljs-string">"APPSTAGING"</span>;
String industryTypeId = <span class="hljs-string">"Retail"</span>;
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
String merchantKey = <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>;
String orderId = <span class="hljs-string">"order1"</span>;
String channelId = <span class="hljs-string">"WAP"</span>;
String custId = <span class="hljs-string">"cust123"</span>;
String mobileNo = <span class="hljs-string">"9999999999"</span>;
String email = <span class="hljs-string">"cust123"</span>;
String txnAmount = <span class="hljs-string">"100.12"</span>;
String website = <span class="hljs-string">"APPSTAGING"</span>;
String industryTypeId = <span class="hljs-string">"Retail"</span>;
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
    define(<span class="hljs-string">"merchantKey"</span>, <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>);
    define(<span class="hljs-string">"orderId"</span>, <span class="hljs-string">"order1"</span>);
    define(<span class="hljs-string">"channelId"</span>, <span class="hljs-string">"WAP"</span>);
    define(<span class="hljs-string">"custId"</span>, <span class="hljs-string">"cust123"</span>);
    define(<span class="hljs-string">"mobileNo"</span>, <span class="hljs-string">"7777777777"</span>);
    define(<span class="hljs-string">"email"</span>, <span class="hljs-string">"username@emailprovider.com"</span>);
    define(<span class="hljs-string">"txnAmount"</span>, <span class="hljs-string">"100.12"</span>);
    define(<span class="hljs-string">"website"</span>, <span class="hljs-string">"APPSTAGING"</span>);
    define(<span class="hljs-string">"industryTypeId"</span>, <span class="hljs-string">"Retail"</span>);
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