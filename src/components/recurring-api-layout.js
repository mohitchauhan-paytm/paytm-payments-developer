import React from "react";
import '../style/preload.scss';
import './layout.css';
import { TabProvider, Tab, TabPanel, TabList } from 'react-web-tabs';
import * as style from  './recurring-api.module.scss';




export default class RecurringApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: {
                checked: false
            },
            renew: {
                checked: false
            },
            txnStatus: {
                checked: false
            },
            refund: {
                checked: false
            },
            refundStatus: {
                checked: false
            }
            
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(inputChecked, apiName) {
        this.setState((state,props) => ({ [apiName]: {checked: inputChecked}}));
    }
    getJavaHTML = (apiName) => {
        if(apiName == 'subscription') {
        return {
            __html: `
<pre><code class="hljs language-java" metastring="">&lt;%@ page language=<span class="hljs-string">"java"</span> contentType=<span class="hljs-string">"text/html; charset=ISO-8859-1"</span>
pageEncoding=<span class="hljs-string">"ISO-8859-1"</span>%&gt;
&lt;%@ page <span class="hljs-keyword">import</span>=<span class="hljs-string">"java.util.*,com.paytm.merchant.CheckSumServiceHelper"</span>%&gt;    
&lt;%
TreeMap&lt;String,String&gt; parameters = <span class="hljs-keyword">new</span> TreeMap&lt;String,String&gt;();

parameters.put(<span class="hljs-string">"MID"</span>,<span class="hljs-string">"xxxxmS01829682567544"</span>);
parameters.put(<span class="hljs-string">"ORDER_ID"</span>,<span class="hljs-string">"ORDER12rty34567"</span>);
parameters.put(<span class="hljs-string">"CUST_ID"</span>,<span class="hljs-string">"CUST123455"</span>);
parameters.put(<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>,<span class="hljs-string">"Retail"</span>);
parameters.put(<span class="hljs-string">"CHANNEL_ID"</span>,<span class="hljs-string">"WEB"</span>);
parameters.put(<span class="hljs-string">"TXN_AMOUNT"</span>,<span class="hljs-string">"1"</span>);
parameters.put(<span class="hljs-string">"WEBSITE"</span>,<span class="hljs-string">"WEBSTAGING"</span>);
parameters.put(<span class="hljs-string">"REQUEST_TYPE"</span>,<span class="hljs-string">"SUBSCRIBE"</span>);
parameters.put(<span class="hljs-string">"SUBS_SERVICE_ID"</span>,<span class="hljs-string">"10981771"</span>);
parameters.put(<span class="hljs-string">"SUBS_AMOUNT_TYPE"</span>,<span class="hljs-string">"FIX"</span>);
parameters.put(<span class="hljs-string">"SUBS_FREQUENCY"</span>,<span class="hljs-string">"1"</span>);
parameters.put(<span class="hljs-string">"SUBS_FREQUENCY_UNIT"</span>,<span class="hljs-string">"MONTH"</span>);
parameters.put(<span class="hljs-string">"SUBS_ENABLE_RETRY"</span>,<span class="hljs-string">"0"</span>);
parameters.put(<span class="hljs-string">"SUBS_EXPIRY_DATE"</span>,<span class="hljs-string">"2019-01-17"</span>);
parameters.put(<span class="hljs-string">"SUBS_PPI_ONLY"</span>,<span class="hljs-string">"Y"</span>);
parameters.put(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"http://localhost:8080/paytm_java/pgResponse.jsp"</span>);

String checkSum =  CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">"I%VyKUMWdwEDyh4z"</span>, parameters);

StringBuilder outputHtml = <span class="hljs-keyword">new</span> StringBuilder();
outputHtml.append(<span class="hljs-string">"&lt;!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;html&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/title&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;form method='post' action='https://securegw-stage.paytm.in/theia/processTransaction' name='f1'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;table border='1'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;tbody&gt;"</span>);

outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='MID' value='xxxxmS01829682567544'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='ORDER_ID' value='ORDER12rty34567'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CUST_ID' value='CUST123455'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='INDUSTRY_TYPE_ID' value='Retail'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CHANNEL_ID' value='WEB'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='TXN_AMOUNT' value='1'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='WEBSITE' value='WEBSTAGING'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='REQUEST_TYPE' value='SUBSCRIBE'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_SERVICE_ID' value='10981771'&gt;"</span>);	
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_AMOUNT_TYPE' value='FIX'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_FREQUENCY' value='1'&gt;"</span>);	
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_FREQUENCY_UNIT' value='MONTH'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_ENABLE_RETRY' value='0'&gt;"</span>);	
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_EXPIRY_DATE' value='2019-01-17'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_PPI_ONLY' value='Y'&gt;"</span>);	
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CALLBACK_URL' value='http://localhost:8080/paytm_java/pgResponse.jsp'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span>+checkSum+<span class="hljs-string">"'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/tbody&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/table&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;script type='text/javascript'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"document.f1.submit();"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/script&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/form&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/html&gt;"</span>);
out.println(outputHtml);
%&gt;</code></pre>`}
    } else if (apiName == 'renew') {
        return {
            __html: `
    <pre><code class="hljs language-java" metastring="">]&lt;%@ page language=<span class="hljs-string">"java"</span> contentType=<span class="hljs-string">"text/html; charset=ISO-8859-1"</span>
pageEncoding=<span class="hljs-string">"ISO-8859-1"</span>%&gt;
&lt;!DOCTYPE html PUBLIC <span class="hljs-string">"-//W3C//DTD HTML 4.01 Transitional//EN"</span> <span class="hljs-string">"http://www.w3.org/TR/html4/loose.dtd"</span>&gt;
&lt;%@ page <span class="hljs-keyword">import</span>=<span class="hljs-string">"java.util.*,com.paytm.merchant.*"</span>%&gt;    
&lt;%
TreeMap&lt;String,String&gt; parameters = <span class="hljs-keyword">new</span> TreeMap&lt;String,String&gt;();

parameters.put(<span class="hljs-string">"MID"</span>,<span class="hljs-string">"xxxxPG01851465523919"</span>);
parameters.put(<span class="hljs-string">"ORDER_ID"</span>,<span class="hljs-string">"OrderRenewTest00000000001"</span>);
parameters.put(<span class="hljs-string">"SUBS_ID"</span>,<span class="hljs-string">"1002410"</span>);
parameters.put(<span class="hljs-string">"TXN_AMOUNT"</span>,<span class="hljs-string">"40"</span>);
parameters.put(<span class="hljs-string">"REQUEST_TYPE"</span>,<span class="hljs-string">"RENEW_SUBSCRIPTION"</span>);

String checkSum =  CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">"I%VyxxxxWdwEDyh4z"</span>, parameters);
StringBuilder outputHtml = <span class="hljs-keyword">new</span> StringBuilder();
outputHtml.append(<span class="hljs-string">"&lt;!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;html&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/title&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/head&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;form method='post' action='https://securegw-stage.paytm.in/theia/processTransaction' name='f1'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;table border='1'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;tbody&gt;"</span>);


outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='REQUEST_TYPE' value='RENEW_SUBSCRIPTION'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='MID' value='xxxxPG01851465523919'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='ORDER_ID' value='OrderRenewTest00000000001'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='SUBS_ID' value='1002410'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='TXN_AMOUNT' value='40'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span>+checkSum+<span class="hljs-string">"'&gt;"</span>);

outputHtml.append(<span class="hljs-string">"&lt;/tbody&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/table&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;script type='text/javascript'&gt;"</span>);
outputHtml.append(<span class="hljs-string">"document.f1.submit();"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/script&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/form&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/body&gt;"</span>);
outputHtml.append(<span class="hljs-string">"&lt;/html&gt;"</span>);
out.println(outputHtml);
%&gt;</code></pre>
            `
        }

} else if(apiName == 'txnStatus') {
    return {
        __html: `
<pre><code class="hljs language-java" metastring=""><span class="hljs-keyword">import</span> java.io.BufferedReader; 
<span class="hljs-keyword">import</span> java.io.DataOutputStream; 
<span class="hljs-keyword">import</span> java.io.InputStream; 
<span class="hljs-keyword">import</span> java.io.InputStreamReader; 
<span class="hljs-keyword">import</span> java.net.HttpURLConnection; 
<span class="hljs-keyword">import</span> java.net.URL; 
<span class="hljs-keyword">import</span> java.util.TreeMap; 
<span class="hljs-keyword">import</span> org.json.JSONObject; 
<span class="hljs-keyword">import</span> java.net.URLEncoder; 
importcom.paytm.pg.merchant.CheckSumServiceHelper; <span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">status</span> </span>{ <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] arg)</span> </span>{ String checksum; HttpURLConnection connection = <span class="hljs-keyword">null</span>; TreeMap tmap= <span class="hljs-keyword">new</span> TreeMap(); <span class="hljs-keyword">try</span>{ tmap.put(<span class="hljs-string">"MID"</span>, <span class="hljs-string">"PaytmS01829682567544"</span>); tmap.put(<span class="hljs-string">"ORDERID"</span>, <span class="hljs-string">"ORDS51973186"</span>); checksum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(<span class="hljs-string">"p%2jIonG_jDOO4Se"</span>,tmap); tmap.put(<span class="hljs-string">"CHECKSUMHASH"</span>, checksum); JSONObject obj = <span class="hljs-keyword">new</span> JSONObject(tmap); String urlParameters=obj.toString(); urlParameters=URLEncoder.encode(urlParameters); URL url = newURL(<span class="hljs-string">"https://pguat.paytm.com/oltp/HANDLER_INTERNAL/getTxnStatus?"</span>); connection = (HttpURLConnection)url.openConnection(); connection = (HttpURLConnection)url.openConnection(); connection.setRequestMethod(<span class="hljs-string">"POST"</span>); connection.setRequestProperty(<span class="hljs-string">"contentType"</span>,<span class="hljs-string">"application/json"</span>); connection.setUseCaches(<span class="hljs-keyword">false</span>); connection.setDoOutput(<span class="hljs-keyword">true</span>); DataOutputStream wr = <span class="hljs-keyword">new</span> DataOutputStream (connection.getOutputStream()); wr.writeBytes(<span class="hljs-string">"JsonData="</span>); wr.writeBytes(urlParameters); wr.close(); InputStream is = connection.getInputStream(); BufferedReader rd = <span class="hljs-keyword">new</span> BufferedReader(newInputStreamReader(is)); String line=<span class="hljs-string">""</span>; <span class="hljs-keyword">while</span>((line = rd.readLine()) != <span class="hljs-keyword">null</span>) { System.out.append(line); System.out.append(<span class="hljs-string">'
'</span>); } rd.close();} <span class="hljs-keyword">catch</span> (Exception e) { e.printStackTrace(); } } } response.</code></pre>
        `
    }

} else if (apiName == 'refund') {
    return {
        __html: `
        
        `
    }

} else if (apiName == 'refundStatus') {
    return {
        __html: `
        
        `
    }

}
    }

    getCurlHTML = (apiName) => {

        if(apiName == 'subscription') {
            return {
                __html: `
<pre><code class="hljs language-bash" metastring="">https://securegw-stage.paytm.in/theia/processTransaction?MID=xxxxmS01829682567544&amp;ORDER_ID=ORDER12rty34567&amp;CUST_ID=CUST123455&amp;INDUSTRY_TYPE_ID=Retail&amp;CHANNEL_ID=WEB&amp;TXN_AMOUNT=1&amp;WEBSITE=WEBSTAGING&amp;SUBS_EXPIRY_DATE=2019-01-17&amp;SUBS_ENABLE_RETRY=0&amp;SUBS_PPI_ONLY=Y&amp;SUBS_FREQUENCY_UNIT=MONTH&amp;SUBS_AMOUNT_TYPE=FIX&amp;SUBS_SERVICE_ID=10981771&amp;SUBS_FREQUENCY=1&amp;REQUEST_TYPE=SUBSCRIBE&amp;CHECKSUMHASH=LIfFFxLBIuwZ954C0Lun8rT%2BB8oI%2B3mVAItWwlpIudyFSSrzUVnOCVh9EYkxFPCr%2BdNhBPzSkq9xhYZpX87i9%2BZR1WnsLIBYrdPCnGBSZxQ%3D</code></pre>           
                `
            }
        } else if (apiName == 'renew') {
            return {
                __html: `
<pre><code class="hljs language-bash" metastring="">curl -X 
POST https://securegw-stage.paytm.in/theia/processTransaction&nbsp;-H 
<span class="hljs-string">'cache-control: no-cache'</span> -H 
<span class="hljs-string">'content-type: application/x-www-form-urlencoded'</span> -d 
<span class="hljs-string">'REQUEST_TYPE=RENEW_SUBSCRIPTION&amp;MID=xxxxPG01851465523919&amp;ORDER_ID=OrderRenewTest00000000001&amp;TXN_AMOUNT=40&amp;CHECKSUMHASH=gf+dH5bINiwcVF8ZH8Nbmo4pcrC2lroHSl+h2n+2h7fo3nCAatHqKo2++30UFE0QD4uUuqHWMVrrcdqCKTP"WluqsB+4SlufcSJ1C1QxdQc=&amp;SUBS_ID=1002410'</span></code></pre>
                `
            }
    
    } else if(apiName == 'txnStatus') {
        return {
            __html: `
<pre><code class="hljs language-bash" metastring="">curl -X POST  https://securegw.paytm.in/merchant-status/getTxnStatus  -H 
<span class="hljs-string">'cache-control: no-cache'</span>  -H 
<span class="hljs-string">'content-type: application/json'</span>  -d 
<span class="hljs-string">'{"MID":"XXXOPG01851465523919","ORDERID":"5362906000","CHECKSUMHASH":"CsTeIGhOnegWColuGQaGphMizcsECToTPZ9x%2FoFPrNZk1TaiV2bFJZzfCwlU7%2F7ZDbDZIdIfCXfrNjNlFmoUjOMmg8tlR4%2F0gakLfFNIe2c%3D"}'</span></code></pre>
            `
        }
    
    } else if (apiName == 'refund') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refundStatus') {
        return {
            __html: `
            
            `
        }
        
    }
    }
    getNetHTML = (apiName) => {
        if(apiName == 'subscription') {
            return {
                __html: `
<pre><code class="hljs language-cs" metastring=""><span class="hljs-keyword">string</span> MID = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> MERCHANT_KEY = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> INDUSTRY_TYPE_ID = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> CHANNEL_ID = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> WEBSITE = <span class="hljs-string">""</span>;

<span class="hljs-keyword">string</span> <span class="hljs-keyword">value</span> = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;

<span class="hljs-keyword">if</span> (Request.Form.AllKeys.Length &gt; <span class="hljs-number">0</span>)
{
    Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt; parameters = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt;();
    parameters.Add(<span class="hljs-string">"MID"</span>, MID);
    parameters.Add(<span class="hljs-string">"CHANNEL_ID"</span>, CHANNEL_ID);
    parameters.Add(<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>, INDUSTRY_TYPE_ID);
    parameters.Add(<span class="hljs-string">"WEBSITE"</span>, WEBSITE);
    parameters.Add(<span class="hljs-string">"SUBS_SERVICE_ID"</span>, <span class="hljs-string">"10981771"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_AMOUNT_TYPE"</span>, <span class="hljs-string">"FIX"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_FREQUENCY"</span>, <span class="hljs-string">"1"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_FREQUENCY_UNIT"</span>, <span class="hljs-string">"MONTH"</span>);
    parameters.Add(<span class="hljs-string">"REQUEST_TYPE"</span>, <span class="hljs-string">"SUBSCRIBE"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_ENABLE_RETRY"</span>, <span class="hljs-string">"1"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_START_DATE"</span>, <span class="hljs-string">"2018-02-17"</span>);
    parameters.Add(<span class="hljs-string">"SUBS_EXPIRY_DATE"</span>, <span class="hljs-string">"2019-01-17"</span>);
    parameters.Add(<span class="hljs-string">"CALLBACK_URL"</span>, <span class="hljs-string">"http://localhost:63191/totp/reciever.aspx"</span>);           
    parameters.Add(<span class="hljs-string">"ORDER_ID"</span>, <span class="hljs-string">"ORDER12rty34567"</span>);
    <span class="hljs-keyword">string</span> custId = <span class="hljs-string">"CUST123455"</span>;
    <span class="hljs-keyword">string</span> paytmURL = <span class="hljs-keyword">value</span>;
    parameters.Add(<span class="hljs-string">"CUST_ID"</span>, custId);           
    parameters.Add(<span class="hljs-string">"SUBS_PAYMENT_MODE"</span>, <span class="hljs-string">"PPI"</span>);           
    parameters.Add(<span class="hljs-string">"SUBS_PPI_ONLY"</span>, <span class="hljs-string">"Y"</span>);            
    parameters.Add(<span class="hljs-string">"TXN_AMOUNT"</span>, <span class="hljs-string">"1"</span>);

    <span class="hljs-keyword">try</span>
    {
        System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
        <span class="hljs-keyword">string</span> checksum =  paytm.CheckSum.generateCheckSum(MERCHANT_KEY, parameters);
        <span class="hljs-keyword">string</span> outputHTML = <span class="hljs-string">"&lt;html&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;head&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/title&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/head&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;body&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;form method='post' action='"</span> + paytmURL + <span class="hljs-string">"' name='f1'&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;table border='1'&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;tbody&gt;"</span>;
        <span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> parameters.Keys)
        {
            outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='"</span> + key + <span class="hljs-string">"' value='"</span> + parameters[key] + <span class="hljs-string">"'&gt;'"</span>;
        }
        outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span> + checksum + <span class="hljs-string">"'&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/tbody&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/table&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;script type='text/javascript'&gt;"</span>;
        outputHTML += <span class="hljs-string">"document.f1.submit();"</span>;
        outputHTML += <span class="hljs-string">"&lt;/script&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/form&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/body&gt;"</span>;
        outputHTML += <span class="hljs-string">"&lt;/html&gt;"</span>;
        Response.Write(outputHTML);
    }
        <span class="hljs-keyword">catch</span> (WebException ex)
{
Response.Write(<span class="hljs-string">"Response of expection= "</span> + ex.Message.ToString());
}
    
}</code></pre> `
            }
        } else if (apiName == 'renew') {
            return {
                __html: `
<pre><code class="hljs language-cs" metastring="">Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt; parameters = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-keyword">string</span>, <span class="hljs-keyword">string</span>&gt;();

<span class="hljs-keyword">string</span> MID = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> MERCHANT_KEY = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> subsid = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> req_type = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> Order_id = <span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> Amount=<span class="hljs-string">""</span>;
<span class="hljs-keyword">string</span> custId = <span class="hljs-string">""</span>;	
<span class="hljs-keyword">string</span> paytmURL = <span class="hljs-string">"https://securegw-stage.paytm.in/theia/processTransaction"</span>;

parameters.Add(<span class="hljs-string">"MID"</span>, MID);
parameters.Add(<span class="hljs-string">"SUBS_ID"</span>, subsid);
parameters.Add(<span class="hljs-string">"REQUEST_TYPE"</span>, req_type);                                                        
parameters.Add(<span class="hljs-string">"CUST_ID"</span>, custId);               
parameters.Add(<span class="hljs-string">"ORDER_ID"</span>, Order_id);               
parameters.Add(<span class="hljs-string">"TXN_AMOUNT"</span>, Amount);

<span class="hljs-keyword">try</span>{				
System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
<span class="hljs-keyword">string</span> checksum = CheckSum.generateCheckSum(MERCHANT_KEY, parameters);

<span class="hljs-keyword">string</span> outputHTML = <span class="hljs-string">"&lt;html&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;head&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;title&gt;Merchant Check Out Page&lt;/title&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/head&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;body&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;center&gt;&lt;h1&gt;Please do not refresh this page...&lt;/h1&gt;&lt;/center&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;form method='post' action='"</span> + paytmURL + <span class="hljs-string">"' name='f1'&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;table border='1'&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;tbody&gt;"</span>;

<span class="hljs-keyword">foreach</span> (<span class="hljs-keyword">string</span> key <span class="hljs-keyword">in</span> parameters.Keys)
{
    outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='"</span> + key + <span class="hljs-string">"' value='"</span> + parameters[key] + <span class="hljs-string">"'&gt;'"</span>;
}
outputHTML += <span class="hljs-string">"&lt;input type='hidden' name='CHECKSUMHASH' value='"</span> + checksum + <span class="hljs-string">"'&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/tbody&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/table&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;script type='text/javascript'&gt;"</span>;
outputHTML += <span class="hljs-string">"document.f1.submit();"</span>;
outputHTML += <span class="hljs-string">"&lt;/script&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/form&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/body&gt;"</span>;
outputHTML += <span class="hljs-string">"&lt;/html&gt;"</span>;

Response.Write(outputHTML);
}
<span class="hljs-keyword">catch</span> (UriFormatException uri_expec)
{

    txtMessage.Text = <span class="hljs-string">"Please Enter Valid URL"</span>;

}
<span class="hljs-keyword">catch</span> (paytm.exception.CryptoException keyexcep)
{

    txtMessage.Text = <span class="hljs-string">"Please pass the merchant key for the same request"</span>;
}</code></pre>
                `
            }
    
    } else if(apiName == 'txnStatus') {
        return {
            __html: `
<pre><code class="hljs language-cs" metastring="">String <span class="hljs-keyword">value</span> = <span class="hljs-string">"https://securegw-stage.paytm.in/merchant-status/getTxnStatus?JsonData="</span>; String Merchant_key=<span class="hljs-string">"I%VyKUMWdwEDyh4z"</span>; String MID=<span class="hljs-string">"PaytmS01829682567544"</span>; String order_id=<span class="hljs-string">""</span>; Dictionary innerrequest = <span class="hljs-keyword">new</span> Dictionary(); Dictionary outerrequest = <span class="hljs-keyword">new</span> Dictionary(); innerrequest.Add(<span class="hljs-string">"MID"</span>, MID); innerrequest.Add(<span class="hljs-string">"ORDERID"</span>, order_id); String first_jason = newJavaScriptSerializer().Serialize(innerrequest); <span class="hljs-keyword">try</span> { <span class="hljs-keyword">string</span> Check = paytm.CheckSum.generateCheckSum(Merchant_key, innerrequest); String correct_check = Check.Replace(<span class="hljs-string">"+"</span>, <span class="hljs-string">"%2b"</span>); innerrequest.Add(<span class="hljs-string">"CHECKSUMHASH"</span>, correct_check); String final = newJavaScriptSerializer().Serialize(innerrequest); final = final.Replace(<span class="hljs-string">"\"</span>, <span class="hljs-string">""</span>).Replace(<span class="hljs-string">":"{"</span>, <span class="hljs-string">":{"</span>).Replace(<span class="hljs-string">"}","</span>, <span class="hljs-string">"},"</span>); String url = <span class="hljs-keyword">value</span> + final; HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url); request.Headers.Add(<span class="hljs-string">"ContentType"</span>, <span class="hljs-string">"application/json"</span>); request.Method = <span class="hljs-string">"POST"</span>; <span class="hljs-keyword">using</span> (StreamWriter requestWriter2 = newStreamWriter(request.GetRequestStream())) { requestWriter2.Write(final); } <span class="hljs-keyword">string</span> responseData = <span class="hljs-keyword">string</span>.Empty; <span class="hljs-keyword">using</span> (StreamReader responseReader = newStreamReader(request.GetResponse().GetResponseStream())) { responseData = responseReader.ReadToEnd(); Response.Write(responseData); Response.Write(<span class="hljs-string">"Requested Json= "</span> + final); } } <span class="hljs-keyword">catch</span> (Exception ex) { Response.Write(<span class="hljs-string">"Exception message: "</span> + ex.Message.ToString()); }</code></pre>
            `
        }
    
    } else if (apiName == 'refund') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refundStatus') {
        return {
            __html: `
            
            `
        }
        
    }
    }

    getPHPHTML = (apiName) => {

        if(apiName == 'subscription') {
            return {
                __html: `
<pre><code class="hljs language-php" metastring=""><span class="hljs-meta">&lt;?php</span>
header(<span class="hljs-string">"Pragma: no-cache"</span>);
header(<span class="hljs-string">"Cache-Control: no-cache"</span>);
header(<span class="hljs-string">"Expires: 0"</span>);

<span class="hljs-comment">// following files need to be included</span>
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"/lib/config_paytm.php"</span>);
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"/lib/encdec_paytm.php"</span>);

$checkSum = <span class="hljs-string">""</span>;
$paramList = <span class="hljs-keyword">array</span>();

<span class="hljs-comment">// Create an array having all required parameters for creating checksum.</span>
$paramList[<span class="hljs-string">"MID"</span>] = <span class="hljs-string">'xxxtmS01829682567544'</span>;
$paramList[<span class="hljs-string">"ORDER_ID"</span>] = ‘ORDER12rty34567’;
$paramList[<span class="hljs-string">"CUST_ID"</span>] = <span class="hljs-string">'CUST123455'</span>;
$paramList[<span class="hljs-string">"INDUSTRY_TYPE_ID"</span>] = <span class="hljs-string">'Retail'</span>;
$paramList[<span class="hljs-string">"CHANNEL_ID"</span>] = <span class="hljs-string">'WEB'</span>;
$paramList[<span class="hljs-string">"TXN_AMOUNT"</span>] = <span class="hljs-string">'1'</span>; <span class="hljs-comment">//IF SUBS_AMOUNT_TYPE is VARIABLE then we can transact with amount '0' . Incase FIX it will not work.</span>
$paramList[<span class="hljs-string">"WEBSITE"</span>] = <span class="hljs-string">'WEBSTAGING'</span>;	
$paramList[<span class="hljs-string">"REQUEST_TYPE"</span>] = <span class="hljs-string">'SUBSCRIBE'</span>;
$paramList[<span class="hljs-string">"SUBS_SERVICE_ID"</span>] = <span class="hljs-string">'10981771'</span>;
$paramList[<span class="hljs-string">"SUBS_FREQUENCY_UNIT"</span>] = <span class="hljs-string">'DAY'</span>; <span class="hljs-comment">//DAY,MONTH,YEAR</span>
$paramList[<span class="hljs-string">"SUBS_FREQUENCY"</span>] = <span class="hljs-string">'1'</span>; <span class="hljs-comment">//if frequency is 1 DAY then SUBS_EXPIRY_DATE should be the day after tomorrow. (Ex-2018-06-27 ------ 2018-06-29 )</span>
$paramList[<span class="hljs-string">"SUBS_ENABLE_RETRY"</span>] = <span class="hljs-string">'0'</span>;  <span class="hljs-comment">// Number of retry for subscription</span>
$paramList[<span class="hljs-string">"SUBS_EXPIRY_DATE"</span>] = <span class="hljs-string">'2019-01-17'</span>; <span class="hljs-comment">//yy-mm-dd</span>
$paramList[<span class="hljs-string">"SUBS_PPI_ONLY"</span>] = <span class="hljs-string">'Y'</span>;
$paramList[<span class="hljs-string">"CALLBACK_URL"</span>]=<span class="hljs-string">"http://localhost/Projects/suscription_PGP/pgResponse.php"</span>;
$paramList[<span class="hljs-string">"SUBS_AMOUNT_TYPE"</span>] = <span class="hljs-string">'FIX'</span>; <span class="hljs-comment">//Variable OR FIX</span>


$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);

<span class="hljs-meta">?&gt;</span>
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Merchant Check Out Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;center&gt;&lt;h1&gt;Please <span class="hljs-keyword">do</span> not refresh this page...&lt;/h1&gt;&lt;/center&gt;
                &lt;form method=<span class="hljs-string">"post"</span> action=<span class="hljs-string">"&lt;?php echo PAYTM_TXN_URL ?&gt;"</span> name=<span class="hljs-string">"f1"</span>&gt;
        &lt;table border=<span class="hljs-string">"1"</span>&gt;
            &lt;tbody&gt;
            <span class="hljs-meta">&lt;?php</span>
            <span class="hljs-keyword">foreach</span>($paramList <span class="hljs-keyword">as</span> $name =&gt; $value) {
                <span class="hljs-keyword">echo</span> <span class="hljs-string">'&lt;input type="hidden" name="'</span> . $name .<span class="hljs-string">'" value="'</span> . $value . <span class="hljs-string">'"&gt;'</span>;
            }
            <span class="hljs-meta">?&gt;</span>
            &lt;input type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"CHECKSUMHASH"</span> value=<span class="hljs-string">"&lt;?= $checkSum?&gt;"</span>&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
        &lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
            document.f1.submit();
        &lt;/script&gt;
    &lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                `
            }
        } else if (apiName == 'renew') {
            return {
                __html: `
<pre><code class="hljs language-php" metastring=""><span class="hljs-meta">&lt;?php</span>
header(<span class="hljs-string">"Pragma: no-cache"</span>);
header(<span class="hljs-string">"Cache-Control: no-cache"</span>);
header(<span class="hljs-string">"Expires: 0"</span>);

<span class="hljs-comment">// following files need to be included</span>
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"./lib/config_paytm.php"</span>);
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"./lib/encdec_paytm.php"</span>);

$checkSum = <span class="hljs-string">""</span>;
$paramList = <span class="hljs-keyword">array</span>();

<span class="hljs-comment">// Create an array having all required parameters for creating checksum.</span>
$paramList[<span class="hljs-string">"MID"</span>] = <span class="hljs-string">'xxxxPG01851465523919'</span>;
$paramList[<span class="hljs-string">"ORDER_ID"</span>] = <span class="hljs-string">'OrderRenewTest00000000001'</span>;
$paramList[<span class="hljs-string">"TXN_AMOUNT"</span>] = <span class="hljs-string">'40'</span>;
$paramList[<span class="hljs-string">"SUBS_ID"</span>] = <span class="hljs-string">'1002410'</span>;
$paramList[<span class="hljs-string">"REQUEST_TYPE"</span>] = <span class="hljs-string">'RENEW_SUBSCRIPTION'</span>;

$checkSum = getChecksumFromArray($paramList,<span class="hljs-string">'I%VyKUMWdwEDyh4z'</span>);

<span class="hljs-meta">?&gt;</span>
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Merchant Check Out Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;center&gt;&lt;h1&gt;Please <span class="hljs-keyword">do</span> not refresh this page...&lt;/h1&gt;&lt;/center&gt;
        &lt;form method=<span class="hljs-string">"post"</span> action=<span class="hljs-string">"&lt;?php echo PAYTM_TXN_URL ?&gt;"</span> name=<span class="hljs-string">"f1"</span>&gt;
        &lt;table border=<span class="hljs-string">"1"</span>&gt;
            &lt;tbody&gt;
            <span class="hljs-meta">&lt;?php</span>
            <span class="hljs-keyword">foreach</span>($paramList <span class="hljs-keyword">as</span> $name =&gt; $value) {
                <span class="hljs-keyword">echo</span> <span class="hljs-string">'&lt;input type="hidden" name="'</span> . $name .<span class="hljs-string">'" value="'</span> . $value . <span class="hljs-string">'"&gt;'</span>;
            }
            <span class="hljs-meta">?&gt;</span>
            &lt;input type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"CHECKSUMHASH"</span> value=<span class="hljs-string">"&lt;?= $checkSum?&gt;"</span>&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
        &lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
            document.f1.submit();
        &lt;/script&gt;
    &lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                `
            }
    
    } else if(apiName == 'txnStatus') {
        return {
            __html: `
    <pre><code class="hljs language-php" metastring=""><span class="hljs-meta">&lt;?php</span> header(<span class="hljs-string">"Pragma: no-cache"</span>); header(<span class="hljs-string">"Cache-Control: no-cache"</span>); header(<span class="hljs-string">"Expires: 0"</span>); <span class="hljs-comment">// following files need to be included </span>
    <span class="hljs-keyword">require_once</span>(<span class="hljs-string">"./lib/config_paytm.php"</span>); <span class="hljs-keyword">require_once</span>(<span class="hljs-string">"./lib/encdec_paytm.php"</span>); $ORDER_ID = <span class="hljs-string">""</span>; $requestParamList = <span class="hljs-keyword">array</span>(); $responseParamList = <span class="hljs-keyword">array</span>(); $requestParamList = <span class="hljs-keyword">array</span>(<span class="hljs-string">"MID"</span> =&gt; PAYTM_MERCHANT_MID , <span class="hljs-string">"ORDERID"</span> =&gt; <span class="hljs-string">"ORDS51973186"</span>); $checkSum = getChecksumFromArray($requestParamList,PAYTM_MERCHANT_KEY); $requestParamList[<span class="hljs-string">'CHECKSUMHASH'</span>] = urlencode($checkSum); $data_string = <span class="hljs-string">"JsonData="</span>.json_encode($requestParamList); <span class="hljs-keyword">echo</span> $data_string; $ch = curl_init(); <span class="hljs-comment">// initiate curl </span>
    $url = PAYTM_STATUS_QUERY_URL; <span class="hljs-comment">//Paytm server where you want to post data </span>
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, <span class="hljs-number">0</span>); curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, <span class="hljs-number">0</span>); curl_setopt($ch, CURLOPT_URL,$url); curl_setopt($ch, CURLOPT_POST, <span class="hljs-keyword">true</span>); <span class="hljs-comment">// tell curl you want to post something </span>
    curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string); <span class="hljs-comment">// define what you want to post </span>
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, <span class="hljs-keyword">true</span>); <span class="hljs-comment">// return the output in string format </span>
    $headers = <span class="hljs-keyword">array</span>(); $headers[] = <span class="hljs-string">'Content-Type: application/json'</span>; 
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 
    $output = curl_exec($ch); <span class="hljs-comment">// execute $info = curl_getinfo($ch);</span></code></pre>
            `
        }
    
    } else if (apiName == 'refund') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refundStatus') {
        return {
            __html: `
            
            `
        }
        
    }
    }


    getErrorHTML = (apiName) => {


        if(apiName == 'subscription') {
            return {
                __html: `
    <pre><code class="hljs language-json">{   
        <span class="hljs-attr">"TXNID"</span>:<span class="hljs-string">"20180927111212800110168666800020875"</span>,
        <span class="hljs-attr">"BANKTXNID"</span>:<span class="hljs-string">""</span>,
        <span class="hljs-attr">"ORDERID"</span>:<span class="hljs-string">"order1"</span>,
        <span class="hljs-attr">"TXNAMOUNT"</span>:<span class="hljs-string">"100.12"</span>,
        <span class="hljs-attr">"STATUS"</span>:<span class="hljs-string">"PENDING"</span>,
        <span class="hljs-attr">"TXNTYPE"</span>:<span class="hljs-string">"SALE"</span>,
        <span class="hljs-attr">"RESPCODE"</span>:<span class="hljs-string">"810"</span>,
        <span class="hljs-attr">"RESPMSG"</span>:<span class="hljs-string">"Txn Failed"</span>,
        <span class="hljs-attr">"MID"</span>:<span class="hljs-string">"rxazcv89315285244163"</span>,
        <span class="hljs-attr">"REFUNDAMT"</span>:<span class="hljs-string">"0.0"</span>,
        <span class="hljs-attr">"TXNDATE"</span>:<span class="hljs-string">"2018-09-27 10:07:15.0"</span>
    }</code></pre>
                `
            }
        } else if (apiName == 'renew') {
            return {
                __html: `
                
                `
            }
    
    } else if(apiName == 'txnStatus') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refund') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refundStatus') {
        return {
            __html: `
            
            `
        }
        
    }
    }

    gteSuccessHTML = (apiName) => {


        if(apiName == 'subscription') {
            return {
                __html: `
<pre><code class="hljs language-josn" metastring=""><span class="hljs-attr">ORDERID</span> = ORDER12rty34567
<span class="hljs-attr">MID</span> = xxxxmS01829682567544
<span class="hljs-attr">TXNID</span> = <span class="hljs-number">20180720111212800110168645500018472</span>
<span class="hljs-attr">TXNAMOUNT</span> = <span class="hljs-number">1</span>
<span class="hljs-attr">PAYMENTMODE</span> = PPI
<span class="hljs-attr">CURRENCY</span> = INR
<span class="hljs-attr">TXNDATE</span> = <span class="hljs-number">2018</span>-<span class="hljs-number">07</span>-<span class="hljs-number">20</span> <span class="hljs-number">12</span>:<span class="hljs-number">18</span>:<span class="hljs-number">30.0</span>
<span class="hljs-attr">STATUS</span> = TXN_SUCCESS
<span class="hljs-attr">RESPCODE</span> = <span class="hljs-number">01</span>
<span class="hljs-attr">RESPMSG</span> = Txn Success
<span class="hljs-attr">GATEWAYNAME</span> = WALLET
<span class="hljs-attr">BANKTXNID</span> =&nbsp;
<span class="hljs-attr">SUBS_ID</span> = <span class="hljs-number">2971</span>
<span class="hljs-attr">BANKNAME</span> = WALLET
<span class="hljs-attr">CHECKSUMHASH</span> = QSgQPpSJkL+QRNfCeUziHTkU3ugCgxjburuSogO2ggjG6K8bnG4a/dnXAY+ZyB2KRBteHhll6R3LiVLQQ2ysY4+b5/UF6+yZqVQvl1VP1E=&nbsp;</code></pre>
                
                `
            }
        } else if (apiName == 'renew') {
            return {
                __html: `
<pre><code class="hljs language-josn" metastring="">{&nbsp;
<span class="hljs-attr">"TXNID"</span>:<span class="hljs-number">70000965271</span>,
<span class="hljs-attr">"ORDERID"</span>:<span class="hljs-string">"OrderRenewTest00000000001"</span>,
<span class="hljs-attr">"TXNAMOUNT"</span>:<span class="hljs-string">"40"</span>,
<span class="hljs-attr">"STATUS"</span>:<span class="hljs-string">"TXN_ACCEPTED"</span>,
<span class="hljs-attr">"RESPCODE"</span>:<span class="hljs-string">"900"</span>,
<span class="hljs-attr">"RESPMSG"</span>:<span class="hljs-string">"Subscription&nbsp;Txn&nbsp;accepted."</span>,
<span class="hljs-attr">"MID"</span>:<span class="hljs-string">"xxxxPG01851465523919"</span>,
<span class="hljs-attr">"SUBS_ID"</span>:”<span class="hljs-number">1002410</span>”
}</code></pre>
                `
            }
    
    } else if(apiName == 'txnStatus') {
        return {
            __html: `
<pre><code class="hljs language-josn" metastring="">{ 
<span class="hljs-attr">"TXNID"</span>:<span class="hljs-string">"20180404111212800110168881700011032"</span>, 
<span class="hljs-attr">"BANKTXNID"</span>:<span class="hljs-string">""</span>, 
<span class="hljs-attr">"ORDERID"</span>:<span class="hljs-string">"ORDS51973186"</span>, 
<span class="hljs-attr">"TXNAMOUNT"</span>:<span class="hljs-string">"1000.00"</span>, 
<span class="hljs-attr">"STATUS"</span>:<span class="hljs-string">"TXN_SUCCESS"</span>, 
<span class="hljs-attr">"TXNTYPE"</span>:<span class="hljs-string">"SALE"</span>, 
<span class="hljs-attr">"GATEWAYNAME"</span>:<span class="hljs-string">"WALLET"</span>, 
<span class="hljs-attr">"RESPCODE"</span>:<span class="hljs-string">"01"</span>, 
<span class="hljs-attr">"RESPMSG"</span>:<span class="hljs-string">"Txn Successful."</span>, 
<span class="hljs-attr">"BANKNAME"</span>:<span class="hljs-string">"WALLET"</span>, 
<span class="hljs-attr">"MID"</span>:<span class="hljs-string">"PaytmS01829682567544"</span>, 
<span class="hljs-attr">"PAYMENTMODE"</span>:<span class="hljs-string">"PPI"</span>, 
<span class="hljs-attr">"REFUNDAMT"</span>:<span class="hljs-string">"5.11"</span>, 
<span class="hljs-attr">"TXNDATE"</span>:<span class="hljs-string">"2018-04-04 13:50:31.0"</span>,
<span class="hljs-attr">"SUBS_ID"</span>:<span class="hljs-string">"2971"</span>}</code></pre>
            `
        }
    
    } else if (apiName == 'refund') {
        return {
            __html: `
            
            `
        }
    
    } else if (apiName == 'refundStatus') {
        return {
            __html: `
            
            `
        }
        
    }
    }
    render() {
        return (
        <div className={`full-container`}>
            <div className={`${style.apiMain} grid`}>
                <div className={`${style.recurringBox} grid`}>
                    <div className={`${style.apiWrapper}`}>
                        <h2 className={`${style.apiHeading}`}>Subscription api</h2>
                        <div>
                        <table className={`${style.apiTable}`}>
                            <thead>
                            <tr>
                                <th>Parameter </th>
                                <th>Description</th>
                                <th>Type & Length</th>
                                <th>Mandatory</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>REQUEST_TYPE</td>
                                    <td>Type of transaction,<strong>SUBSCRIBE</strong> for subscription transacti</td>
                                    <td>Alpha(50)</td>
                                    <td>yes</td>
                                </tr>
                                <tr>
                                    <td>MID</td>
                                    <td>This is the “Merchant Identifier” that is issued by Paytm to the merchant. This is unique for each merchant that is integrated with Paytm
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>yes</td>
                                </tr>
                                <tr>
                                    <td>ORDER_ID </td>
                                    <td>The “Order ID” is the merchant’s reference ID which should be unique for every transaction. Duplicate order id will be rejected by the Paytm gateway. You may use UNIX time stamp appended with a random string to ensure that a duplicate Order Id is never passed</td>
                                    <td>Alphanumeric<br/> Special characters allowed in Order Id are: “@” “-” “_”  “.”</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    CUST_ID
                                    </td>
                                    <td>
                                    The “Customer ID” is the customer identifier. This should be a unique user Id that merchant has assigned to their customers. Paytm has the risk system designed based on the cust_id, duplicate/illogical cust_ids may block merchant’s transactions
                                    </td>
                                    <td>
                                    Alphanumeric(50)
                                    <br/>Special characters e.g @, ! ,_ $ are allowed
                                    </td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>TXN_AMOUNT </td>
                                    <td>
                                    This is the “Transaction Amount” that is to be charged from the customer. Please ensure that the amount is in the same currency as defined for the merchant ID being used. The amount should not include any separator(ex- “,”) and should contain digits up to two decimal places only
                                    </td>
                                    <td>AMOUNT(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>CHANNEL_ID</td>
                                    <td>
                                    <p>Pass the Channel ID Ex:</p>
                                    <ol>
                                    <li>WEB – for desktop websites</li>
                                    <li>WAP - for Mobile sites and Apps</li>
                                    </ol>
                                    </td>
                                    <td>ALPHANUMERIC(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>INDUSTRY_TYPE_ID</td>
                                    <td>
                                    This will be provided by Paytm over the production environment, for staging it will be <strong>Retail</strong>
                                    </td>
                                    <td>
                                    Alphanumeric(50)
                                    </td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_SERVICE_ID</td>
                                    <td>Subscription service identifier provided by the merchant. This is unique id and used to identify the customer at the time of renewal call</td>
                                    <td>Alphanumeric(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_AMOUNT_TYPE</td>
                                    <td>Possible Value: <strong>FIX/VARIABLE. If value is VARIABLE then SUBS_MAX_AMOUNT is mandatory</strong></td>
                                    <td>Alpha(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_FREQUENCY</td>
                                    <td>Frequency value of subscription. Possible value will depend on SUBS_FREQUENCY_UNIT e.g. for monthly subscription possible value can be:
                                    <ol>
                                    <li>if unit is Day, value will be 30 and</li>
                                    <li>if unit is Month, value will be 1</li>
                                    </ol>
                                    </td>
                                    <td>Numeric(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_FREQUENCY_UNIT</td>
                                    <td>
                                    Possible values:
                                    <ul>
                                    <li>DAY</li>
                                    <li>MONTH</li>
                                    <li>YEAR</li>
                                    </ul>
                                    </td>
                                    <td>Alpha(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_ENABLE_RETRY</td>
                                    <td>Flag specifying whether PG will retry a transaction in case of failure from bank/wallet due to some reason. Possible Value: 0 or 1</td>
                                    <td>Numeric(50)</td>
                                    <td>Yes</td>
                                    </tr>
                                    <tr>
                                    <td>SUBS_EXPIRY_DATE</td>
                                    <td>Date when subscription will expire. Format should be YYYY-MM-DD</td>
                                    <td>Date(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>SUBS_MAX_AMOUNT</td>
                                    <td>Maximum amount that can be deducted in a subscription request <span>Mandatory: if SUBS_AMOUNT_TYPE is VARIABLE</span></td>
                                    <td>Numeric(Double)</td>
                                    <td>Conditional</td>
                                </tr>
                                <tr>
                                    <td>SUBS_START_DATE</td>
                                    <td>Subscription cycle will be calculated based on this date, frequency and first renewal should be initiated on this date. (This parameter can be used in cases where merchant intends to provide a free trial period to the customer). Format of date is YYYY-MM-DD</td>
                                    <td>Date</td>
                                    <td> Conditional</td>
                                </tr>
                                <tr>
                                    <td>SUBS_GRACE_DAYS</td>
                                    <td>Number of days above cycle start date for which merchant can send request for renewal<span> Mandatory: If SUBS_START_DATE is sent in this request</span></td>
                                    <td>Numeric(integer)</td>
                                    <td> Conditional</td>
                                </tr>
                                <tr>
                                    <td>SUBS_PPI_ONLY</td>
                                    <td>Amount for subscription and subsequent renewals will be charged from customer’s Paytm wallet. In case of insufficient balance in wallet, transaction will fail 
                                    <br/>Possible Values: Y
                                    </td>
                                    <td>Alpha(50)</td>
                                    <td> Conditional</td>
                                </tr>
                                <tr>
                                    <td>SUBS_PAYMENT_MODE</td>
                                    <td>Amount for subscription and subsequent renewals will be charged from customer’s credit/debit card
                                    <br/>Possible Values: CC, DC
                                    </td>
                                    <td>Alpha(50)</td>
                                    <td>Conditional</td>
                                </tr>
                                <tr>
                                    <td>WEBSITE</td>
                                    <td>
                                    This will be provided by Paytm over the production environment, for staging it will be <br/>
                                    <strong>WEBSTAGING</strong> for website and <br/>
                                    <strong>APPSTAGING</strong> for APP
                                    </td>
                                    <td>
                                    Alphanumeric(50)
                                    </td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    CHECKSUMHASH
                                    </td>
                                    <td>Checksum to be calculated based on a pre-defined logic as given below in the “Generating Checksum” section. Checksum is used to ensure data is not tampered when a request is posted on the Paytm URL</td>
                                    <td>ALPHANUMERIC(500)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    MOBILE_NO
                                    </td>
                                    <td>Consumer Mobile Number. Passing this enables faster login for customer into his/her mobile wallet. The mobile number should not exceed more than 12 digits and should not include any special characters like “+”, “-“ etc.</td>
                                    <td>Numeric(15)</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>EMAIL</td>
                                    <td>Consumer Email Id. Passing this enables faster login for customer into his/her mobile wallet</td>
                                    <td>
                                    EMAIL(50)
                                    </td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    CALLBACK_URL
                                    </td>
                                    <td>
                                    Merchant will get response on this URL if this parameter is sent in transaction request. This call back URL will get priority over the static call back URL configured during the time of integration
                                    </td>
                                    <td>URL(255)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    PAYMENT_MODE_ONLY
                                    </td>
                                    <td>
                                    If Merchant wants to allow payment mode selection on his website. Merchant can allow consumer to select CC/DC or NB on their website. The possible value for this parameter is YES
                                    </td>
                                    <td>ALPHA(10)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                    AUTH_MODE
                                    </td>
                                    <td>
                                    Possible values of this parameter 3D – Credit/Debit card USRPWD - Wallet, Net Banking Mandatory: If merchant wants to allow payment mode selection on his website. Paytm will enable this feature as per merchant’s request
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>
                                    PAYMENT_TYPE_ID
                                    </td>
                                    <td>
                                    <p>Possible values of this parameter</p>
                                    <ul>
                                    <li>CC – for credit card payment mode</li>
                                    <li>DC – for debit card payment mode</li>
                                    <li>NB – for net banking payment mode</li>
                                    <li>PPI- For Paytm Cash</li>
                                    </ul>
                                    <p><strong>Mandatory:</strong> If merchant wants to allow payment mode selection on his website. Paytm will enable this feature as per merchant’s request</p>
                                    </td>
                                    <td>TEXT (50)</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>
                                    CARD_TYPE
                                    </td>
                                    <td>
                                    Possible values of this parameter: VISA/MASTER/AMEX card<br/>
                                    <strong>Mandatory:</strong> If Merchant wants to allow payment mode selection on his website
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>
                                    BANK_CODE
                                    </td>
                                    <td>
                                    This parameter is mandatory to pass if the customer is choosing Net banking option. Bank code’s list will be provided by Paytm upon request. Customer will directly move to Bank page in this case. <br/>
                                    <span>Mandatory:</span> If Merchant wants to allow payment mode selection on his website
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>
                                    LOGIN_THEME
                                    </td>
                                    <td>
                                    This parameter is used to display customized Paytm login page requested by merchant
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>
                                    THEME
                                    </td>
                                    <td>
                                    Format: THEME|SUBTHEME
                                    <br/> Default value: merchant
                                    <br/> Theme is used to display Paytm payment page. Subtheme is used to customize payment page as requested by merchant
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>No</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Response Structure</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Description</th>
                                    <th>Type & Length</th>
                                    <th>Mandatory</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SUBS_ID</td>
                                    <td>
                                            Unique subscription id generated by Paytm for identifying a subscription.<br/> 
                                            Mandatory: If REQUEST_TYPE = RENEW_SUBSCRIPTION
                                    </td>
                                    <td>Numeric</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>MID</td>
                                    <td>
                                        This is a unique merchant Id provided to merchant  by  Paytm  at  the  time  of merchant creation
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>TXNID </td>
                                    <td>
                                        This  is  a  unique  Paytm  transaction  Id that is issued by Paytm for each valid transaction request received from the merchant
                                    </td>
                                    <td>Numeric (length: upto 64 digits, datatype: long)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        ORDERID
                                    </td>
                                    <td>
                                        This  is the application transaction id that was sent by merchant to Paytm at the time of transaction request
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>BANKTXNID </td>
                                    <td>
                                            The   transaction   Id   sent   by   the bank/wallet (NULL or empty string if the transaction doesn't reach the bank)</td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>TXNAMOUNT</td>
                                    <td>
                                        The amount of the transaction
                                    </td>
                                    <td>Numeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>CURRENCY</td>
                                    <td>Currency used for transaction Ex- INR</td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>STATUS</td>
                                    <td>
                                        <p>This contains the transaction status and has below values: </p>
                                        <ul>
                                            <ol>
                                                <li>TXN_SUCCESS</li>
                                                <li>TXN_FAILURE</li>
                                                <li>PENDING</li>
                                            </ol>
                                        </ul>
                                        <p>Any other status apart from these should be considered as pending</p>
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        RESPCODE
                                    </td>
                                    <td>
                                        This is a numeric transaction response code. All codes refer to the transaction failure or success with reach code representing a different reason for failure 
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        RESPMSG
                                    </td>
                                    <td>
                                        This contains a short description of the transaction status. In case of a failed transaction the message will describe the
                                        potential reason for the failure.
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>TXNDATE</td>
                                    <td>Date of transaction</td>
                                    <td>DateTime</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        GATEWAYNAME
                                    </td>
                                    <td>
                                        The gateway used by Paytm (ICICI/CITI/WALLET etc.)
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        BANKNAME
                                    </td>
                                    <td>
                                        Bank name of the card issuing bank
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        PAYMENTMODE
                                    </td>
                                    <td>
                                        The payment mode used for transaction
                                    </td>
                                    <td>Alphanumeric</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Endpoints</h2>
                    <p className={` grid justify-between`}><span>Staging:</span> <span>https://securegw-stage.paytm.in/theia/processTransaction</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span>https://securegw.paytm.in/theia/processTransaction</span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={(e) => this.handleChange(e.target.checked, 'subscription')
                                    }/>
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.subscription.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML('subscription')}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML('subscription')}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML('subscription')}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML('subscription')}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.subscription.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" >
                                      <span dangerouslySetInnerHTML= {this.gteSuccessHTML('subscription')}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                  <span dangerouslySetInnerHTML={this.getErrorHTML('subscription')}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>

            <div className={`${style.recurringBox} grid`}>
                <div className={`${style.apiWrapper}`}>
                    <h2 className={`${style.apiHeading}`}>Renew Subscription api</h2>
                    <div>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Description</th>
                                        <th>Type & Length</th>
                                        <th>Mandatory</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>REQUEST_TYPE</td>
                                    <td>Type of transaction. Possible value: RENEW_SUBSCRIPTION For renewal transaction
                                    </td>
                                    <td>Alpha(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>MID</td>
                                    <td>This is the “Merchant Identifier” that is issued by Paytm to the Merchant. This is unique for each merchant that integrates with Paytm</td>
                                    <td>Alphanumeric(50)</td>
                                    <td>Yes</td>
                                    </tr>
                                <tr>
                                    <td>ORDER_ID </td>
                                    <td>
                                        The “Order ID” is the Merchant’s Transaction ID which should be unique for every transaction. Duplicate order id will be rejected by the Paytm gateway
                                    </td>
                                    <td>Alphanumeric(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>
                                        SUBS_ID</td>
                                    <td>
                                        Subscription Id given by PG in response to merchant in the first subscription request
                                    </td>
                                    <td>
                                        Alphanumeric(50)
                                    </td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>TXN_AMOUNT </td>
                                    <td>
                                        Subscription amount to be charged by customer
                                    </td>
                                    <td>Numeric(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>CHECKSUMHASH</td>
                                    <td>
                                        Checksum calculated based on pre-defined logic.  Checksum is used to ensure data is not tempered when request is posted on the Paytm URL. In case of checksum mismatch due to data tempering Paytm will reject the transaction
                                    </td>
                                    <td>Alphanumeric (250)</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Response Parameter</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SUBS_ID</td>
                                    <td>
                                        Unique  subscription  id  generated  by Paytm for identifying a subscription<br/>
                                        Mandatory if REQUEST_TYPE=RENEW_SUBSCRIPTION
                                    </td>
                                    <td>Numeric</td> 
                                </tr>
                                <tr>
                                    <td>MID</td>
                                    <td>
                                        This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>TXNID </td>
                                    <td>
                                        This  is  a  unique  Paytm  transaction  Id that is issued by Paytm for each valid transaction  request  received  from  the merchant
                                    </td>
                                    <td>Numeric(length: upto 64 digits, datatype:long)</td>
                                </tr>
                                <tr>
                                    <td>
                                        ORDERID
                                    </td>
                                    <td>
                                        This  is the application transaction ID that was sent by merchant to Paytm at the time of transaction request
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>BANKTXNID </td>
                                    <td>
                                            The   transaction   Id   sent   by   the bank/wallet (NULL or empty string if the transaction doesn't reaches to the bank)</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>TXNAMOUNT</td>
                                    <td>
                                        The amount of the transaction
                                    </td>
                                    <td>Numeric</td>
                                </tr>
                                <tr>
                                    <td>CURRENCY</td>
                                    <td>Currency used for transaction ex- INR</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>STATUS</td>
                                    <td>
                                        <p>This contains the transaction status and below values:-</p>
                                        <ol>
                                            <li>TXN_SUCCESS</li>
                                            <li>TXN_FAILURE</li>
                                            <li>TXN_ACCEPTED</li>
                                        </ol>
                                        <p>Paytm will give a response of TXN_ACCEPTED after the validity of renew transaction is checked. After the transaction is successful/failed, Paytm will give a response on callback URL of the merchant about the final status of the transaction.  TXN_ACCEPTED is an interim status and will be updated according the status from bank/wallet</p>
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>
                                        RESPCODE
                                    </td>
                                    <td>
                                        This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>
                                        RESPMSG
                                    </td>
                                    <td>
                                        This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>TXNDATE</td>
                                    <td>Date of transaction</td>
                                    <td>DateTime</td>
                                </tr>
                                <tr>
                                    <td>
                                        GATEWAYNAME
                                    </td>
                                    <td>
                                       The gateway used by Paytm (ICICI/CITI/WALLET etc.)
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>
                                        BANKNAME
                                    </td>
                                    <td>
                                        Bank name of the card issuing bank
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>
                                        PAYMENTMODE
                                    </td>
                                    <td>
                                        The payment mode used for transaction
                                    </td>
                                    <td>Alphanumeric</td>
                                </tr>
                            </tbody>
                    </table>
                    </div>
                </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Endpoints</h2>
                    <p className={` grid justify-between`}><span>Staging:</span> <span>https://securegw-stage.paytm.in/theia/processTransaction</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span>https://securegw.paytm.in/theia/processTransaction </span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={
                                    (e) => this.handleChange(e.target.checked, 'renew')
                                }
                            />
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.renew.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML('renew')}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML('renew')}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML('renew')}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML('renew')}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.renew.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" >
                                      <span dangerouslySetInnerHTML= {this.gteSuccessHTML('renew')}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                  <span dangerouslySetInnerHTML={this.getErrorHTML('renew')}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>

            <div className={`${style.recurringBox} grid`}>
                <div className={`${style.apiWrapper}`}>
                    <h2 className={`${style.apiHeading}`}>Transaction Status api</h2>
                    <div>
                        <table className={`${style.apiTable}`}>
                        <thead>
                            <tr>
                                <th>Parameter </th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Mandatory</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MID</td>
                                <td>This is a unique merchant ID provided to merchant by Paytm at the time of merchant creation. MID is used while making the transaction, same should be used here</td>
                                <td>Alphanumeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>ORDERID</td>
                                <td>This is the application transaction ID that was sent by merchant to Paytm at the time of transaction request</td>
                                <td>Alphanumeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>CHECKSUMHASH</td>
                                <td>URL encoded checksum which is calculated based on a predefined logic as given below in “Generating Checksum” section</td>
                                <td>Alphanumeric(500)</td>
                                <td>Yes </td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Response Parameters</h2>
                    <table className={`${style.apiTable}`}>
                            <thead>
                            <tr>
                                <th>Parameter </th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Mandatory</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MID</td>
                                <td>This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation. Paytm will post in the response the same MID passed in transaction request</td>
                                <td>Alphanumeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>SUBS_ID</td>
                                <td>Unique  subscription  id  generated  by Paytm for identifying a subscription Mandatory if REQUEST_TYPE=RENEW_SUBSCRIPTION</td>
                                <td>Numeric</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>TXNID</td>
                                <td>This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request</td>
                                <td>Alphanumeric (length: upto 64 digits, datatype: long)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>ORDERID</td>
                                <td>This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request. Paytm will post in the response the same ORDERID passed in transaction request</td>
                                <td>Alphanumeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>BANKTXNID</td>
                                <td>The transaction Id sent by the bank/wallet (NULL or empty string if the transaction doesn’t reach the bank)</td>
                                <td>Alphanumeric(100)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>TXNAMOUNT</td>
                                <td>The amount of the transaction. Paytm will post in the response the same TXNAMOUNT passed in transaction request</td>
                                <td>Numeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>CURRENCY</td>
                                <td>Currency used for transaction. (INR, USD)</td>
                                <td>Alpha(3)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>STATUS</td>
                                <td>This contains the transaction status and has only four values: <br/>TXN_SUCCESS <br/>TXN_FAILURE <br/>PENDING <br/>OPEN</td>
                                <td>Alphanumeric(50)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>RESPCODE</td>
                                <td>This is alphanumeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure</td>
                                <td>Alphanumeric(100)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>RESPMSG</td>
                                <td>This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure</td>
                                <td>Alphanumeric(500)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>TXNDATE</td>
                                <td>Date and Time of transaction <br/>Example: “2015-11-02 11:40:46.0”</td>
                                <td>DateTime</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>GATEWAYNAME</td>
                                <td>Gateway used by Paytm (ICICI/CITI/WALLET etc)</td>
                                <td>Alphanumeric</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>BANKNAME</td>
                                <td>Name of the card issuing bank.(ICICI/SBI/HDFC etc.)</td>
                                <td>Alpha(100)</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>PAYMENTMODE</td>
                                <td>The payment mode used for transaction.(CC/DC/NB/PPI etc.)</td>
                                <td>Alpha</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>CHECKSUMHASH</td>
                                <td>Checksum calculated based on pre-defined logic</td>
                                <td>Alphanumeric(500)</td>
                                <td>Yes</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Endpoints</h2>
                    <p className={` grid justify-between`}><span>Staging:</span><span> https://securegw-stage.paytm.in/merchant-status/getTxnStatus</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span>https://securegw.paytm.in/merchant-status/getTxnStatus </span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={
                                    (e) => this.handleChange(e.target.checked, 'txnStatus')
                                }
                            />
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.txnStatus.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML('txnStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML('txnStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML('txnStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML('txnStatus')}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.txnStatus.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" >
                                      <span dangerouslySetInnerHTML= {this.gteSuccessHTML('txnStatus')}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                  <span dangerouslySetInnerHTML={this.getErrorHTML('txnStatus')}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>

            <div className={`${style.recurringBox} grid`}>
                <div className={`${style.apiWrapper}`}>
                    <h2 className={`${style.apiHeading}`}>Refund api</h2>
                    <div>
                        <h2>Request Parameters</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Mandatory</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>MID</td>
                                    <td>This is a unique merchant Id provided to merchant by Paytm at the time of integration</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>REFID</td>
                                    <td>This is the reference ID shared while raising Refund. Each refund request will have unique REFID. Different Refunds for same order will have different REFID </td>
                                    <td>Alphanumeric (20)</td>
                                    <td>Yes </td>
                                </tr>
                                <tr>
                                    <td>TXNID</td>
                                    <td>This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the merchant</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>ORDERID</td>
                                    <td>This is the merchant’s reference transaction Id that was sent by merchant to Paytm at the time of transaction request</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>REFUNDAMOUNT</td>
                                    <td>Can be equal to or less than the txn amount, amount should be upto two decimal place and should not contain any special character other than "."</td>
                                    <td>Amount(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>TXNTYPE</td>
                                    <td>There can only be one value for this parameter i.e., REFUND</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>CHECKSUM</td>
                                    <td>URL encoded checksum which is calculated based on a pre-defined logic. This is used to verify the integrity of the transaction</td>
                                    <td>Alphanumeric (500)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>COMMENTS</td>
                                    <td>Any comments can be added here</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>No</td>
                                </tr>
                                </tbody>
                        </table> 
                        <h2>Response Parameters</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                <tr>
                                    <th>Parameter </th>
                                    <th>Description</th>
                                    <th>Type</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>MID</td>
                                    <td>This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>TXNID</td>
                                    <td>This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request</td>
                                    <td>Numeric (length: upto 64 digits, datatype: long)</td>
                                </tr>
                                <tr>
                                    <td>ORDERID</td>
                                    <td>This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>REFUNDAMOUNT</td>
                                    <td>Can be equal to or less than the txn amount</td>
                                    <td>Amount(50)</td>
                                </tr>
                                <tr>
                                    <td>TXNAMOUNT</td>
                                    <td>The amount of the transaction</td>
                                    <td>Amount(50)</td>
                                </tr>
                                <tr>
                                    <td>REFID</td>
                                    <td>Unique ID for every refund request sent by merchant to Paytm</td>
                                    <td>Alphanumeric (20)</td>
                                </tr>
                                <tr>
                                    <td>STATUS</td>
                                    <td>This contains the transaction status and has only four values: <br/>TXN_SUCCESS<br/>TXN_FAILURE<br/>PENDING</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>RESPCODE</td>
                                    <td>This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure</td>
                                    <td>Alphanumeric(100)</td>
                                </tr>
                                <tr>
                                    <td>RESPMSG</td>
                                    <td>This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure</td>
                                    <td>Alphanumeric(500)</td>
                                </tr>
                                <tr>
                                    <td>TXNDATE</td>
                                    <td>Date of transaction<br/>EX- “2015-11-02 11:40:46.0”</td>
                                    <td>DateTime</td>
                                </tr>
                                <tr>
                                    <td>GATEWAY</td>
                                    <td>Gateway used by Paytm (ICICI/CITI/WALLET etc.)</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>CARD_ISSUER</td>
                                    <td>Name of the card issuing bank</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>PAYMENTMODE</td>
                                    <td>Payment mode used for transaction</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>REFUNDDATE</td>
                                    <td>Date of REFUND<br/>EX- “2015-11-02 11:40:46.0”</td>
                                    <td>DateTime</td>
                                </tr>
                                <tr>
                                    <td>REFUNDTYPE</td>
                                    <td>It will be fixed value i.e., REFUND</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>REFUNDID</td>
                                    <td>This is a unique Paytm refund Id that is issued by Paytm for each valid refund request</td>
                                    <td>Numeric (64)</td>
                                </tr>
                                <tr>
                                    <td>BANKTXNID</td>
                                    <td>The transaction Id sent by the bank/wallet (NULL or empty string if the transaction doesn’t reach the bank)</td>
                                    <td>Alphanumeric (100)</td>
                                </tr>
                                <tr>
                                    <td>TOTALREFUNDAMT</td>
                                    <td>Total refunded amount</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Endpoints</h2>
                    <p className={` grid justify-between`}><span>Staging:</span> <span>https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/REFUND</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span>https://securegw.paytm.in/refund/HANDLER_INTERNAL/REFUND</span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={
                                    (e) => this.handleChange(e.target.checked, 'refund')
                                }
                            />
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.refund.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML('refund')}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML('refund')}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML('refund')}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML('refund')}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.refund.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" >
                                      <span dangerouslySetInnerHTML= {this.gteSuccessHTML('refund')}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                  <span dangerouslySetInnerHTML={this.getErrorHTML('refund')}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>

            <div className={`${style.recurringBox} grid`}>
                <div className={`${style.apiWrapper}`}>
                    <h2 className={`${style.apiHeading}`}>Refund Status API</h2>
                    <div>
                        <h2>Request Parameters</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                <tr>
                                    <th>Parameter </th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Mandatory</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>MID</td>
                                    <td>This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation</td>
                                    <td>Alphanumeric(50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>ORDERID</td>
                                    <td>This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request</td>
                                    <td>Alphanumeric (50)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>REFID</td>
                                    <td>This is reference ID and this is shared while raising Refund. Each refund request will have unique REFID. Different Refunds for same order will have different REFID</td>
                                    <td>Alphanumeric (20)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>CHECKSUMHASH</td>
                                    <td>URL encoded checksum which is calculated based on a pre-defined logic</td>
                                    <td>Alphanumeric (500)</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Response Parameters</h2>
                        <table className={`${style.apiTable}`}>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>TXNID</td>
                                    <td>This is a unique Paytm transaction Id that is issued by Paytm for each valid transaction request received from the merchant</td>
                                    <td>Numeric (64)</td>
                                </tr>
                                <tr>
                                    <td>BANKTXNID</td>
                                    <td>The transaction Id sent by the bank (NULL or empty string if the transaction doesn’t reach the bank)</td>
                                    <td>Alphanumeric(100)</td>
                                </tr>
                                <tr>
                                    <td>ORDERID</td>
                                    <td>This is the application transaction Id that was sent by merchant to Paytm at the time of transaction request</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>TXNAMOUNT</td>
                                    <td>Amount of transaction</td>
                                    <td>Amount(50)</td>
                                </tr>
                                <tr>
                                    <td>STATUS</td>
                                    <td>This contains the transaction status and has only two values:<br/>TXN_SUCCESS<br/>TXN_FAILURE<br/>PENDING<br/>
                    NOT_FOUND</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>GATEWAY</td>
                                    <td>The gateway used by Paytm (ICICI/CITI/WALLET etc.)</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>RESPCODE</td>
                                    <td>This is a numeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure. Refer to Annexure A for full list</td>
                                    <td>Alphanumeric(100)</td>
                                </tr>
                                <tr>
                                    <td>RESPMSG</td>
                                    <td>This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure</td>
                                    <td>Alphanumeric(500)</td>
                                </tr>
                                <tr>
                                    <td>MID</td>
                                    <td>This is a unique merchant Id provided to merchant by Paytm at the time of merchant creation</td>
                                    <td>Alphanumeric(50)</td>
                                </tr>
                                <tr>
                                    <td>PAYMENTMODE</td>
                                    <td>Possible value for the Mode of Payment:<br/>a. CC<br/>b. DC<br/>c. Wallet<br/>d. IMPS<br/>d. PPI</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>REFUNDAMOUNT</td>
                                    <td>Refund amount as received in the request</td>
                                    <td>Amount(50)</td>
                                </tr>
                                <tr>
                                    <td>TOTALREFUNDAMT</td>
                                    <td>Total amount refunded till now if merchant has raised any requests</td>
                                    <td>Amount(50)</td>
                                </tr>
                                <tr>
                                    <td>TXNDATE</td>
                                    <td>Date of transaction</td>
                                    <td>DateTime</td>
                                </tr>
                                <tr>
                                    <td>REFUNDDATE</td>
                                    <td>Date of refund</td>
                                    <td>DateTime</td>
                                </tr>
                                <tr>
                                    <td>REFUNDTYPE</td>
                                    <td>Type of Refund Issued, this will by default be REFUND</td>
                                    <td>Alphanumeric</td>
                                </tr>
                                <tr>
                                    <td>REFID</td>
                                    <td>This is the reference ID and this is shared while raising Refund</td>
                                    <td>Alphanumeric(20)</td>
                                </tr>
                                <tr>
                                    <td>REFUNDID</td>
                                    <td>Unique refund id generated at Paytm’s end</td>
                                    <td>Alphanumeric(64)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Endpoints</h2>
                    <p className={` grid justify-between`}><span>Staging:</span> <span>https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span> https://securegw.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus </span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={
                                    (e) => this.handleChange(e.target.checked, 'refundStatus')
                                }
                            />
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.refundStatus.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML('refundStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML('refundStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML('refundStatus')}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML('refundStatus')}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.refundStatus.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" >
                                      <span dangerouslySetInnerHTML= {this.gteSuccessHTML('refundStatus')}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                  <span dangerouslySetInnerHTML={this.getErrorHTML('refundStatus')}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>




                
            </div>
        </div>

        );
    }
}