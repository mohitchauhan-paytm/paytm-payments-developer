---
path:  "/docs/v1/payment-gateway/index.md"
title: "Paytm Checkout: Accept Payments on your website"
---


import * as style from './payment-gateway.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';


# Collect online payments with pre-built Paytm Checkout

Paytm Checkout provides a secure, PCI-compliant way to accept Debit/Credit card, Net-Banking, UPI and Paytm wallet payments from your customers.

## Demo for Paytm checkout

---
<br/>

<img src='/assets/merchant-pg-webflow.gif' alt=''/>


## Overview of payment processing via Paytm checkout
---

Process of payments starts at the click of pay button on merchant order summary page. On this click, you have to:  

1. Create an order payload to generate checksumhash at your server end
2. Post the payload and checksumhash via HTML form post on Paytm's server. This redirects the customer to Paytm's payment page
3. Customer fills the payment details and completes the payment authentication. Once the payment is complete, response is posted in HTML form post on your callback URL
4. Verify checksumhash received in response to ensure that it has not been tampered
5. Lastly, verify transaction status with [Transaction Status API](https://developer.paytm.com/docs/transaction-status-api) via server to server call. This protects you from scenarios where your account credentials are compromised or request/response has been tampered 

Find the detailed interaction of each system component in the flow chart below
<br/>

<img src='/assets/img-flow-paytm-checkout.png' alt='' />

## Steps in processing payments via Paytm checkout 

---
### Step 1 :

At the click of payment button by customer,create the required payload for checksum generation. Parameters of payload are provided below - 


| Attributes    |     |
| ------------- | ----- | ----- |
| **MID**  String(20)   | Available with your account details in dashboard. Different for staging and production
|**ORDER_ID** String(50)   | Merchant’s unique reference ID for a transaction   Special characters allowed in Order Id are: “@” “-” “_”  “.”.
|**CUST_ID** String(64)   | Merchant’s unique reference ID for every customer Special characters e.g @, ! ,_ $ are allowed
|**TXN_AMOUNT** String(10)      | Amount in INR payable by customer. Should contain digits up to two decimal points. The amount should not include any separator like (“,”)
|**CHANNEL_ID** String(3)  | 1. WEB – for websites <br/> 2. WAP - for Mobile websites/App
|**WEBSITE** String(30)  | Staging Environment: <br/> 1. WEBSTAGING for websites <br/>2.APPSTAGING for Mobile websites/App Production environment: Will be provided with production credentials in dashboard
|**CHECKSUMHASH** String(108)  | Security parameter to avoid tampering. Generated using server side checksum utility provided by Paytm
|**MOBILE_NO** String(15)  | Customer mobile number. Passing this enables faster login for customer into his/her Paytm account
|**EMAIL** String(50)  | Customer email Id. Passing this enables faster login for customer into his/her mobile wallet.
|**CALLBACK_URL** String(255)  | URL on which response of transaction request will be posted side. Like Promocode specific to ICICI bank or promo code specfic to a BIN NUmber
| **PAYMENT_MODE_ONLY** String(10)   | If merchant wants to allow payment mode selection on his website, the value to be passed is “Yes”
| **AUTH_MODE** String(10)  | Required If PAYMENT_MODE_ONLY = Yes, then <br/>For Credit/Debit card - 3D <br/>For Wallet, Net Banking – USRPWD
| **PAYMENT_TYPE_ID** String(10)   | Required If PAYMENT_MODE_ONLY = Yes, then<br/>Credit card payment mode – CC <br/> Debit card payment mode - DC <br/> Net banking payment mode - NB <br/> Paytm wallet – PPI <br/> Saved Card - SC
| **CARD_TYPE** String(50)   | Required If PAYMENT_MODE_ONLY = Yes & AUTH_MODE = 3D Possible values of this parameter depending upon the card type - VISA/MASTER/AMEX
| **BANK_CODE** String(50)  | Required If PAYMENT_MODE_ONLY = Yes<br/>PAYMENT_TYPE_ID = NB <br/>List of Bank Codes provided in PDF below
| **MERC_UNQ_REF** Optional String (50) | An extra (optional) field that is passed by merchant in form POST, the values of this field passes through the system and returns to merchant along with other fields. This should be enabled by Paytm


<div className={`${style.commonMargin}`}></div>

### Step 2:

Generate checksumhash using Paytm library with parameters in key value pairs. Using the payload and checksumhash make an HTML form post and redirect customer to Paytm server. Code snippets provided below


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
<pre><code class="hljs language-java">
String MID = "<span class="hljs-string">rxazcv89315285244163</span>";
String KEY = "<span class="hljs-string">gKpu7IKaLSbkchFS</span>";
TreeMap&lt;String, String&gt; parameters = <span class="hljs-keyword">new</span> TreeMap();
parameters.put(<span class="hljs-string">"MID"</span>,<span class="hljs-string">MID</span>);
parameters.put(<span class="hljs-string">"ORDER_ID"</span>,<span class="hljs-string">"ord1"</span>);
parameters.put(<span class="hljs-string">"CHANNEL_ID"</span>,<span class="hljs-string">"WEB"</span>);
parameters.put(<span class="hljs-string">"CUST_ID"</span>,<span class="hljs-string">"cust123"</span>);
parameters.put(<span class="hljs-string">"TXN_AMOUNT"</span>,<span class="hljs-string">"100.12"</span>);
parameters.put(<span class="hljs-string">"WEBSITE"</span>,<span class="hljs-string">"WEBSTAGING"</span>);
parameters.put(<span class="hljs-string">"MOBILE_NO"</span>,<span class="hljs-string">"9999999999"</span>);
parameters.put(<span class="hljs-string">"EMAIL"</span>,<span class="hljs-string">"customer@gmail.com"</span>);
parameters.put(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">&lt;Merchant Response Url&gt;</span>);
String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">KEY</span>, parameters);
StringBuilder outputHtml = <span class="hljs-keyword">new</span> StringBuilder();
outputHtml.append(<span class="hljs-string">"&lt;!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;html&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;title&gt;Merchant Checkout Page&lt;/title&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>);
<span class="hljs-comment">// use "https://securegw.paytm.in/theia/processTransaction" for production</span>
outputHtml.append(<span class="hljs-string">"&lt;form method='post' action='https://securegw-stage.paytm.in/theia/processTransaction' name='f1'&gt;"</span>);
<span class="hljs-keyword">for</span>(Map.Entry&lt;String,String&gt; entry : parameters.entrySet()) {
    outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='"</span>+entry.getKey()+<span class="hljs-string">"' value='"</span>+entry.getValue()+<span class="hljs-string">"'&gt;"</span>);
}
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span>+checkSum+<span class="hljs-string">"'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/form&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;script type='text/javascript'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"document.f1.submit();"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/script&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/html&gt;"</span>);</code></pre>
            `}}></span>
    </TabPanel>
	<TabPanel tabId="net">
        <span dangerouslySetInnerHTML={{
        __html:  ` 
<pre><code class="hljs language-cs">Dictionary parameters = <span class="hljs-keyword">new</span> Dictionary();
String Merchant_key=<span class="hljs-string">"I%XXXXXXXXXXDyh4z"</span>;
String MID=<span class="hljs-string">"TESXXXXXXXXXXXXXXX13"</span>;
String Website=<span class="hljs-string">"WEBSTAGING"</span>;
parameters.Add(<span class="hljs-string">"MID"</span>, MID);
parameters.Add(<span class="hljs-string">"CHANNEL_ID"</span>, <span class="hljs-string">"WEB"</span>);
parameters.Add(<span class="hljs-string">"WEBSITE"</span>, Website);
parameters.Add(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>);
parameters.Add(<span class="hljs-string">"CUST_ID"</span>, <span class="hljs-string">"cust123"</span>);
parameters.Add(<span class="hljs-string">"ORDER_ID"</span>, <span class="hljs-string">"ord1"</span>);
parameters.Add(<span class="hljs-string">"TXN_AMOUNT"</span>, <span class="hljs-string">"100.12"</span>);
<span class="hljs-comment">// string paytmTxnURL = "https://securegw.paytm.in/theia/processTransaction"; </span>
<span class="hljs-comment">// for production </span>
<span class="hljs-keyword">string</span> paytmTxnURL = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;
<span class="hljs-keyword">try</span> {
	<span class="hljs-keyword">string</span> checksum = paytm.CheckSum.generateCheckSum(Merchant_key, parameters);
	<span class="hljs-keyword">string</span> outputHTML = <span class="hljs-string">"&lt;html&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;head&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;title&gt;Merchant Checkout Page&lt;/titl&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;/head&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;body&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/cente&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;form method='post' action='"</span> + paytmTxnURL + <span class="hljs-string">"' name='f1&gt;"</span>;
	<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> parameters.Keys) {
		outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='"</span> + key + <span class="hljs-string">"' value='"</span> + parameters[key] + <span class="hljs-string">"'&gt;'"</span>;
	}
	outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span> + checksum + <span class="hljs-string">"&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;script type='text/javascript&gt;"</span>;
	outputHTML += <span class="hljs-string">"document.f1.submit();"</span>;
	outputHTML += <span class="hljs-string">"&lt;/script&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;/form&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;/body&gt;"</span>;
	outputHTML += <span class="hljs-string">"&lt;/html&gt;"</span>;
	Response.Write(outputHTML);
} <span class="hljs-keyword">catch</span> (Exception ex) {
	Response.Write(<span class="hljs-string">"Exception message: "</span> + ex.Message.ToString());
}</code></pre>`}}></span>
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
$paramList[<span class="hljs-string">"MID"</span>] = PAYTM_MERCHANT_MID;
$paramList[<span class="hljs-string">"ORDER_ID"</span>] = <span class="hljs-string">"ord1"</span>;
$paramList[<span class="hljs-string">"CUST_ID"</span>] = <span class="hljs-string">"cust123"</span>;
$paramList[<span class="hljs-string">"CHANNEL_ID"</span>] = <span class="hljs-string">"WEB"</span>;
$paramList[<span class="hljs-string">"TXN_AMOUNT"</span>] = <span class="hljs-string">"100.12"</span>;
$paramList[<span class="hljs-string">"WEBSITE"</span>] = <span class="hljs-string">"Website"</span>;
$paramList[<span class="hljs-string">"CALLBACK_URL"</span>] = <span class="hljs-string">"https://pg-staging.paytm.in/MerchantSite/bankResponse"</span>;
$paramList[<span class="hljs-string">"MOBILE_NO"</span>] = <span class="hljs-string">'9999999999'</span>;
$paramList[<span class="hljs-string">"EMAIL"</span>] = <span class="hljs-string">'customer@gmail.com'</span>;
<span class="hljs-comment">// here checksum string will return by getChecksumFromArray() function</span>
$checkSum = getChecksumFromArray($paramList, PAYTM_MERCHANT_KEY);
<span class="hljs-comment">// $paytmTxnURL = "https://securegw.paytm.in/theia/processTransaction"; // for production</span>
$paytmTxnURL = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;
<span class="hljs-meta">?&gt;</span>
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Merchant Checkout Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;center&gt;&lt;h1&gt;Please <span class="hljs-keyword">do</span> not refresh this page...&lt;/h1&gt;&lt;/center&gt;
&lt;form method=<span class="hljs-string">'post'</span> action=<span class="hljs-string">'&lt;?php echo $paytmTxnURL; ?&gt;'</span> name=<span class="hljs-string">'f1'</span>&gt;
<span class="hljs-meta">&lt;?php</span>
<span class="hljs-keyword">foreach</span>($paramList <span class="hljs-keyword">as</span> $name =&gt; $value) {
	<span class="hljs-keyword">echo</span> <span class="hljs-string">'&lt;input type="hidden" name="'</span> . $name .<span class="hljs-string">'" value="'</span> . $value . <span class="hljs-string">'"&gt;'</span>;
}
<span class="hljs-meta">?&gt;</span>
&lt;input type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"CHECKSUMHASH"</span> value=<span class="hljs-string">"&lt;?php echo $checkSum ?&gt;"</span>&gt;
&lt;/form&gt;
&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
document.f1.submit();
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>`}}></span>
</TabPanel>
</Tabs>
</div>

For further details and codes in multiple languages, click below links - 

**For Web:**

<div className={`${style.ecomPlatform} grid  justify-start`}>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Perl' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-perl.png' alt=''/>
                        <label>Perl</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_PHP' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-php.png' alt=''/>
                        <label>PHP</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_NodeJs' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-nodejs.png' alt=''/>
                        <label>Node.js</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Java' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/java.png' alt=''/>
                        <label>Java</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_dotNet' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-dotnet.png' alt=''/>
                        <label>ASP.Net</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Python' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-python.png' alt=''/>
                        <label>Python</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Ruby' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
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
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_NodeJs_Express_Project  ' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-express.png' alt=''/>
                        <label>Express</label>
                    </span>
                </a>
            </div>
</div>

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

**HTML Form Post**

```html
<html>
    <head>
        <title>Merchant Check Out Page</title>
    </head>
    <body>
        <center><h1>Please do not refresh this page...</h1></center>
        <form method="post" action="https://securegw-stage.paytm.in/theia/processTransaction?ORDER_ID=RHL69679_20180821151119" name="f1">
            <table border="1">
                <tbody>
                    <input type="hidden" name="MID" value="TIMESI54326042593468">
                    <input type="hidden" name="WEBSITE" value="dineoutWEB">
                    <input type="hidden" name="ORDER_ID" value="RHL69679_20180821151119">
                    <input type="hidden" name="CUST_ID" value="CUST001">
                    <input type="hidden" name="CHANNEL_ID" value="WEB">
                    <input type="hidden" name="TXN_AMOUNT" value="1">
                    <input type="hidden" name="CALLBACK_URL" value="http://localhost/paytmkit/pgResponse.php">
                    <input type="hidden" name="CHECKSUMHASH" value="ZWdMJOr1yGiFh1nns2U8sDC9VzgUDHVnQpG
                    pVnHyrrPb6bthwro1Z8AREUKdUR/K46x3XvFs6Xv7EnoSOLZT29qbZJKXXvyEuEWQIJGkw=">
                </tbody>
            </table>
        <script type="text/javascript">
         document.f1.submit();
        </script>
        </form>
    </body>

</html>

```
<div className={`${style.commonMargin}`}></div>

### Step 3:

Customer fills the payment details and is redirected to bank page for authorization. Once the transaction is authorized, Paytm receives the response from the bank and returns a status to you. Sample HTML form post is provided below

```html
<html>
   <head>
	 <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	 <meta name="viewport" content="width=device-width, initial-scale=1">
	 <title>Paytm Secure Online Payment Gateway</title>
   </head>
   <body>
	  <table align='center'>
            <tr>
            <td><STRONG>Transaction is being processed,</STRONG></td>
            </tr>
            <tr>
            <td><font color='blue'>Please wait ...</font></td>
            </tr>
            <tr>
            <td>(Please do not press 'Refresh' or 'Back' button</td>
            </tr>
	  </table>
	  <FORM NAME='TESTFORM' ACTION='http://localhost/paytmkit/pgResponse.php' METHOD='POST'>
            <input type='hidden' name='CURRENCY' value='INR'>
            <input type='hidden' name='CUST_ID' value='CUST001'>
            <input type='hidden' name='GATEWAYNAME' value='WALLET'>
            <input type='hidden' name='RESPMSG' value='Txn Success'>
            <input type='hidden' name='BANKNAME' value='WALLET'>
            <input type='hidden' name='PAYMENTMODE' value='PPI'>
            <input type='hidden' name='MID' value='TIMESI54326042593468'>
            <input type='hidden' name='RESPCODE' value='01'>
            <input type='hidden' name='TXNID' value='20180821111212800110168085600021958'>
            <input type='hidden' name='TXNAMOUNT' value='1.00'>
            <input type='hidden' name='ORDERID' value='RHL14037_20180821151537'>
            <input type='hidden' name='STATUS' value='TXN_SUCCESS'>
            <input type='hidden' name='BANKTXNID' value='5357590'>
            <input type='hidden' name='TXNDATE' value='2018-08-21 15:16:11.0'>
            <input type='hidden' name='CHECKSUMHASH'   value='YjtlLUVs6gQhR8RuUltwOsGnGXBg7gpdMRAKYU/ qiTZCeJZmwbciUFmwtT6RmwBmpwVswSiknJK7iEBch27q627uzTXKxJ0vzoMs68AE9A='>
	  </FORM>
   </body>
 <script type="text/javascript">  document.forms[0].submit();</script>    
</html> 
```
<div className={`${style.commonMargin}`}></div>

### Step 4:

Checksumhash received in response of transaction needs to verified using Paytm library with all the parameters in key value pairs. Code snippets for verification is provided below


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
			isValideChecksum = CheckSumServiceHelper.getCheckSumServiceHelper().
			verifycheckSum(MercahntKey, paytmParams, paytmChecksum);	
			System.out.println(isValideChecksum);
			<span class="hljs-comment">// if checksum is validated Kindly verify the amount and status // if transaction is successful // kindly call Paytm Transaction Status API and verify the transaction amount and status.// If everything is fine then mark that transaction as successful into your DB.</span>
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
<pre><code class="hljs language-cs">String merchantKey = <span class="hljs-string">"merchantKey value"</span> ;
<span class="hljs-comment">// Replace the with the Merchant Key provided by Paytm at the time of registration.</span>
Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt; parameters = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt;();
<span class="hljs-keyword">string</span> paytmChecksum = <span class="hljs-string">""</span>;
<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> Request.Form.Keys) {
    parameters.Add(key.Trim(), Request.Form[key].Trim());
}
<span class="hljs-keyword">if</span> (parameters.ContainsKey(<span class="hljs-string">"CHECKSUMHASH"</span>)) {
    paytmChecksum = parameters[<span class="hljs-string">"CHECKSUMHASH"</span>];
    parameters.Remove(<span class="hljs-string">"CHECKSUMHASH"</span>);
}
<span class="hljs-keyword">if</span> (CheckSum.verifyCheckSum(merchantKey, parameters, paytmChecksum)) {
    Response.Write(<span class="hljs-string">"Checksum Matched"</span>);
} <span class="hljs-keyword">else</span> {
    Response.Write(<span class="hljs-string">"Checksum MisMatch"</span>);
}</code></pre>`}}></span>
       </TabPanel>
		<TabPanel tabId="php">
        <span dangerouslySetInnerHTML={
            {__html: `
<pre><code class="hljs language-php"><span class="hljs-meta">&lt;?php</span>
$paramList = $_POST;
$paytmChecksum = <span class="hljs-keyword">isset</span>($_POST[<span class="hljs-string">"CHECKSUMHASH"</span>]) ? $_POST[<span class="hljs-string">"CHECKSUMHASH"</span>] : <span class="hljs-string">""</span>;
$isValidChecksum = verifychecksum_e($paramList, <span class="hljs-string">"PAYTM_MERCHANT_KEY_HERE"</span>, $paytmChecksum);
<span class="hljs-keyword">if</span>($isValidChecksum == <span class="hljs-string">"TRUE"</span>) {
	<span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;b&gt;Checksum matched.&lt;/b&gt;"</span>;
} <span class="hljs-keyword">else</span> {
	<span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;b&gt;Checksum mismatched!!!&lt;/b&gt;"</span>;
}
<span class="hljs-meta">?&gt;</span></code></pre>`}}></span>
    </TabPanel>
</Tabs>
</div>


For further details and codes in multiple languages, click below links - 

**For Web:**

<div className={`${style.ecomPlatform} grid  justify-start`}>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Perl' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-perl.png' alt=''/>
                        <label>Perl</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_PHP' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-php.png' alt=''/>
                        <label>PHP</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_NodeJs' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-nodejs.png' alt=''/>
                        <label>Node.js</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Java' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/java.png' alt=''/>
                        <label>Java</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_dotNet' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-dotnet.png' alt=''/>
                        <label>ASP.Net</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Python' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-python.png' alt=''/>
                        <label>Python</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_Ruby' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
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
            <div className={`${style.ecomCard}`}>
                <a href='https://github.com/Paytm-Payments/Paytm_Web_Sample_Kit_NodeJs_Express_Project  ' target="_blank" className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid vertical justify-between align-center`}>
                        <img src='/assets/logo-express.png' alt=''/>
                        <label>Express</label>
                    </span>
                </a>
            </div>
</div>

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


<div className={`${style.commonMargin}`}></div>


### Step 5 :


Validate transaction response via server side request using[Transaction Status API](https://developer.paytm.com/docs/transaction-status-api). This API requires checksumhash in request and its verification in response. The status should be treated as the final status of the transaction

## On completion of your integration -

---

Post completion of integration on your staging environment, do a complete transaction from order summary page/cart on your website/APP 

1. Attempt a test transaction using <a href="https://developer.paytm.com/docs/testing-integration" >test paymodes credentials</a>
2. Ensure you re-verify transaction response with [Transaction Status API](https://developer.paytm.com/docs/transaction-status-api) via server to server call in payment flow and not separately as a one time activity    
3. See the transaction details in “Test Data” mode on your <a href="https://dashboard.paytm.com/next/transactions" target="_blank">dashboard</a>


Once the test transaction is complete, move your code to live environment with production account details. Note that production accounts details are available after you have <a href='https://dashboard.paytm.com/next/activate' target="_blank">activate your account </a> on the dashboard

Additionally to better manage payments on your platform, kindly though [Refund Management](https://developer.paytm.com/docs/refund-management) and [Late Notification](https://developer.paytm.com/docs/late-notification)

In case of any issues, please search or post your query on our <a href="http://paywithpaytm.com/developer/discussion/" target="_blank">Developer Forum</a> or send your queries to devsupport@paytm.com


