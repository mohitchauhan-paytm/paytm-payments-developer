import React from "react";
import '../style/preload.scss';
import './layout.css';
import * as style from './txn-wrapper.module.scss';
import { TabProvider, Tab, TabPanel, TabList } from 'react-web-tabs';



export default class TransactionWrapperLayoutRefundStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            checked: event.target.checked
        });
    }
    getJavaHTML = () => {
        return {
            __html: `
<pre><code class="hljs language-java"><span class="hljs-keyword">import</span> java.io.BufferedReader;
<span class="hljs-keyword">import</span> java.io.DataOutputStream;
<span class="hljs-keyword">import</span> java.io.InputStream;
<span class="hljs-keyword">import</span> java.io.InputStreamReader;
<span class="hljs-keyword">import</span> java.net.HttpURLConnection;
<span class="hljs-keyword">import</span> java.net.URL;
<span class="hljs-keyword">import</span> java.util.TreeMap;
<span class="hljs-keyword">import</span> org.json.JSONObject;
<span class="hljs-keyword">import</span> com.paytm.pg.merchant.CheckSumServiceHelper;
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Refund_status_API</span> </span>{
	String mid;
	String orderid;
	String Refid;
	String merchant_key;
	Refund_status_API(String mid1,String orderid1,String merchant_key,String Refid) {
		<span class="hljs-keyword">this</span>.mid=mid1;
		<span class="hljs-keyword">this</span>.orderid=orderid1;
		<span class="hljs-keyword">this</span>.merchant_key=merchant_key;
		<span class="hljs-keyword">this</span>.Refid=Refid;
	}
	<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] arg)</span> </span>{
		Refund_status_API s1= <span class="hljs-keyword">new</span> Refund_status_API(<span class="hljs-string">"TAXXXXXXXXXXXXXXXX26"</span>,<span class="hljs-string">"5060"</span>,<span class="hljs-string">"6XXXXXXXXXXXXXx8"</span>,<span class="hljs-string">"Refid_value"</span>);<span class="hljs-comment">// please place your values</span>
		s1.checkstatus();	
	} 
	<span class="hljs-function"><span class="hljs-keyword">public</span> String <span class="hljs-title">checkstatus</span><span class="hljs-params">()</span> </span>{
		HttpURLConnection connection = <span class="hljs-keyword">null</span>;
		TreeMap tmap= <span class="hljs-keyword">new</span> TreeMap();
		String checksum;	
		<span class="hljs-keyword">try</span>{	
			tmap.put(<span class="hljs-string">"MID"</span>, mid); 
			tmap.put(<span class="hljs-string">"ORDERID"</span>, orderid);	
			tmap.put(<span class="hljs-string">"REFID"</span>, Refid);
		} <span class="hljs-keyword">catch</span>(Exception e) {
			System.out.print(e);
		}
		String line=<span class="hljs-string">""</span>;
		<span class="hljs-keyword">try</span> {	
			checksum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(merchant_key,tmap);
			<span class="hljs-comment">//	please use your merchant key in above code line</span>
			tmap.put(<span class="hljs-string">"CHECKSUM"</span>, checksum);
			JSONObject obj = <span class="hljs-keyword">new</span> JSONObject(tmap);
			String urlParameters=obj.toString();
			URL url = <span class="hljs-keyword">new</span> URL(<span class="hljs-string">"https://securegw.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus"</span>);
			connection = (HttpURLConnection)url.openConnection();	
			connection.setRequestMethod(<span class="hljs-string">"POST"</span>);
			connection.setRequestProperty(<span class="hljs-string">"contentType"</span>,<span class="hljs-string">"application/json"</span>);
			connection.setUseCaches(<span class="hljs-keyword">false</span>);
			connection.setDoOutput(<span class="hljs-keyword">true</span>);
			DataOutputStream wr = <span class="hljs-keyword">new</span> DataOutputStream (connection.getOutputStream());
			wr.writeBytes(<span class="hljs-string">"JsonData="</span>+urlParameters);	
			wr.close();
			InputStream is = connection.getInputStream();
			BufferedReader rd = <span class="hljs-keyword">new</span> BufferedReader(<span class="hljs-keyword">new</span> InputStreamReader(is));
			<span class="hljs-keyword">while</span>((line = rd.readLine()) != <span class="hljs-keyword">null</span>) {
				System.out.append(<span class="hljs-string">"Request : "</span>+<span class="hljs-string">"JsonData="</span>+urlParameters+<span class="hljs-string">""</span>);
				System.out.append(<span class="hljs-string">"output : "</span>+line);
				<span class="hljs-comment">// System.out.append('');</span>
				<span class="hljs-keyword">return</span> <span class="hljs-string">"Return"</span>+line;
			}
			rd.close();
		} <span class="hljs-keyword">catch</span> (Exception e) {
			e.printStackTrace();
		}
		<span class="hljs-keyword">return</span> <span class="hljs-string">"empyty"</span>+line;
	}	
}</code></pre>`}
    }

    getCurlHTML = () => {
        return {
            __html: `
<pre><code class="hljs language-bash">curl -X POST
https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus -H
<span class="hljs-string">'JsonData={"MID":"rxazcv89315285244163",
"ORDERID":"order1","REFID":"reforder1",
"CHECKSUM":"b%2BhFyBK9XUc8Sa%2BVzv7QFNoOQp%2FepntTjl15SQ%2FssJnJGbDfLAY9RIbLsYM9D5c3P0c44vQeB5b1A3qoGDStO6QjfdwpwxafS4wm8%2B%2B8S6k%3D"}'</span></code></pre>   
`
        }
    }
    getNetHTML = () => {
        return {
            __html: `
<pre><code class="hljs language-cs"><span class="hljs-keyword">string</span> <span class="hljs-keyword">transactionURL</span> = <span class="hljs-string">"https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus?JsonData="</span>;
Dictionary &lt;String, String&gt; paytmParams = <span class="hljs-keyword">new</span> Dictionary&lt;string, string&gt;();
paytmParams.Add(<span class="hljs-string">"MID"</span>, <span class="hljs-string">"rxazcv89315285244163"</span>);
paytmParams.Add(<span class="hljs-string">"ORDERID"</span>, <span class="hljs-string">"order1"</span>);
paytmParams.Add(<span class="hljs-string">"REFID"</span>,<span class="hljs-string">"reforder1"</span>);
<span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">string</span> Check = paytm.CheckSum.generateCheckSum(<span class="hljs-string">"gKpu7IKaLSbkchFS"</span>, paytmParams);
    String correct_check = Check.Replace(<span class="hljs-string">"+"</span>, <span class="hljs-string">"%2b"</span>);
    paytmParams.Add(<span class="hljs-string">"CHECKSUM"</span>, correct_check);
    String final = "JsonData="+ <span class="hljs-keyword">new</span> JavaScriptSerializer().Serialize(paytmParams);
    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(transactionURL);
    request.Headers.Add(<span class="hljs-string">"ContentType"</span>, <span class="hljs-string">"application/json"</span>);
    request.Method = <span class="hljs-string">"POST"</span>;
    <span class="hljs-keyword">using</span> (StreamWriter requestWriter2 = <span class="hljs-keyword">new</span> StreamWriter(request.GetRequestStream())) {
        requestWriter2.Write(final);
    }
    <span class="hljs-keyword">string</span> responseData = <span class="hljs-keyword">string</span>.Empty;
    <span class="hljs-keyword">using</span> (StreamReader responseReader = <span class="hljs-keyword">new</span> StreamReader(request.GetResponse().GetResponseStream())) {
        responseData = responseReader.ReadToEnd();
        Response.Write(<span class="hljs-string">"Requested Json= "</span> + final.ToString() + <span class="hljs-string">""</span>);
        Response.Write(<span class="hljs-string">"Response Json= "</span> + responseData);
    }
} <span class="hljs-keyword">catch</span> (WebException ex) {
    Response.Write(<span class="hljs-string">"Response Json= "</span> + ex.toString());
} </code></pre>        `
        }
    }

    getPHPHTML = () => {
        return {
            __html: `
<pre><code class="hljs language-php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">// following file need to be included</span>
<span class="hljs-keyword">require_once</span>(<span class="hljs-string">"encdec_paytm.php"</span>);
$paytmParams = <span class="hljs-keyword">array</span>();
$paytmParams[<span class="hljs-string">'MID'</span>] = <span class="hljs-string">"rxazcv89315285244163"</span>;
$paytmParams[<span class="hljs-string">'ORDERID'</span>] = <span class="hljs-string">"order1"</span>; <span class="hljs-comment">// Order Id received from Paytm in Response</span>
$paytmParams[<span class="hljs-string">'REFID'</span>] = <span class="hljs-string">"reforder1"</span>; <span class="hljs-comment">// Reference Id received in response from Paytm for Refund Request</span>
$checkSum = getRefundChecksumFromArray($paytmParams, <span class="hljs-string">"gKpu7IKaLSbkchFS"</span>);
$paytmParams[<span class="hljs-string">"CHECKSUM"</span>] = urlencode($checkSum);
$post_data = <span class="hljs-string">'JsonData='</span>.json_encode($paytmParams, JSON_UNESCAPED_SLASHES);
$ch = curl_init();
<span class="hljs-comment">// $url = "https://securegw.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus"; // for production</span>
$url = <span class="hljs-string">"https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus"</span>; <span class="hljs-comment">// for production</span>
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, <span class="hljs-number">0</span>);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, <span class="hljs-number">0</span>);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, <span class="hljs-keyword">true</span>);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, <span class="hljs-keyword">true</span>);
curl_setopt($ch, CURLOPT_HTTPHEADER, <span class="hljs-keyword">array</span>(<span class="hljs-string">'Content-Type: application/json'</span>));
$output = curl_exec($ch);
$data = json_decode($output, <span class="hljs-keyword">true</span>);
<span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;pre&gt;"</span>; print_r($data); <span class="hljs-keyword">echo</span> <span class="hljs-string">"&lt;/pre&gt;"</span>;
<span class="hljs-meta">?&gt;</span></code></pre>
            `
        }
    }

    getErrorHTML = () => {
        return {
            __html: `
            
<pre><code class="hljs language-json">{  
<span class="hljs-attr">"REFUND_LIST"</span>:[  
    {  
        <span class="hljs-attr">"TXNID"</span>:<span class="hljs-string">"20180519111212800110168899425827575"</span>,
        <span class="hljs-attr">"ORDERID"</span>:<span class="hljs-string">"59702893551455758326"</span>,
        <span class="hljs-attr">"TXNAMOUNT"</span>:<span class="hljs-string">"1133.26"</span>,
        <span class="hljs-attr">"STATUS"</span>:<span class="hljs-string">"TXN_FAILURE"</span>,
        <span class="hljs-attr">"RESPCODE"</span>:<span class="hljs-string">"620"</span>,
        <span class="hljs-attr">"RESPMSG"</span>:<span class="hljs-string">"Refund Failed."</span>,
        <span class="hljs-attr">"MID"</span>:<span class="hljs-string">"MIMOTE91371571602708"</span>,
        <span class="hljs-attr">"TXNDATE"</span>:<span class="hljs-string">"2018-05-20 01:04:40.0"</span>,
        <span class="hljs-attr">"TOTALREFUNDAMT"</span>:<span class="hljs-string">"1133.26"</span>,
        <span class="hljs-attr">"REFUNDDATE"</span>:<span class="hljs-string">"2018-05-20 02:00:02.0"</span>,
        <span class="hljs-attr">"REFID"</span>:<span class="hljs-string">"09806644944000574835"</span>,
        <span class="hljs-attr">"REFUNDID"</span>:<span class="hljs-string">"20180520111212801300168891302036144"</span>
    }
]
}</code></pre>
            `
        }
    }

    getSuccessHTML = () => {
        return {
            __html: `
<pre><code class="hljs language-json">{
    <span class="hljs-attr">"REFUND_LIST"</span>:[
        {
        <span class="hljs-attr">"TXNID"</span>:<span class="hljs-string">"20180823111212800110168340600018954"</span>,
        <span class="hljs-attr">"ORDERID"</span>:<span class="hljs-string">"gauravtestorder1298192"</span>,
        <span class="hljs-attr">"TXNAMOUNT"</span>:<span class="hljs-string">"12.00"</span>,
        <span class="hljs-attr">"STATUS"</span>:<span class="hljs-string">"TXN_SUCCESS"</span>,
        <span class="hljs-attr">"RESPCODE"</span>:<span class="hljs-string">"10"</span>,
        <span class="hljs-attr">"RESPMSG"</span>:<span class="hljs-string">"Refund Successfull"</span>,
        <span class="hljs-attr">"MID"</span>:<span class="hljs-string">"abcxyz08553956030227"</span>,
        <span class="hljs-attr">"REFUNDAMOUNT"</span>:<span class="hljs-string">"12.00"</span>,
        <span class="hljs-attr">"TXNDATE"</span>:<span class="hljs-string">"2018-08-23 11:00:27.0"</span>,
        <span class="hljs-attr">"TOTALREFUNDAMT"</span>:<span class="hljs-string">"12.00"</span>,
        <span class="hljs-attr">"REFUNDDATE"</span>:<span class="hljs-string">"2018-08-23 11:01:57.0"</span>,
        <span class="hljs-attr">"REFID"</span>:<span class="hljs-string">"gauravtestorder_refid23823"</span>,
        <span class="hljs-attr">"GATEWAY"</span>:<span class="hljs-string">"WALLET"</span>,
        <span class="hljs-attr">"PAYMENTMODE"</span>:<span class="hljs-string">"PPI"</span>,
        <span class="hljs-attr">"REFUNDID"</span>:<span class="hljs-string">"20180823111212801300168306200014501"</span>,
        <span class="hljs-attr">"REFUNDTYPE"</span>:<span class="hljs-string">"MERC_TO_BANK"</span>
        }
    ]
} </code></pre>
            `
        }
    }
    render() {
        return (
        <div className={`full-container`}>
            <div className={`${style.apiMain} grid`}>
                <div className={`${style.apiWrapper}`}> {this.props.children} </div>
                <div className={`${style.editorWrapper}`}>
                    <h2>Definition</h2>
                    <p className={` grid justify-between`}><span>Staging:</span> <span>https://securegw-stage.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus</span></p>
                    <p className={` grid justify-between`}><span>Production:</span> <span>https://securegw.paytm.in/refund/HANDLER_INTERNAL/getRefundStatus </span></p>
                    <h6 className={` grid justify-center align-center`}><span>Request Code</span>
                        <label className={`${style.switch}`}>
                            < input type="checkbox"
                                id="checkbox"
                                onChange={
                                    this.handleChange
                                }
                            />
                            <div className={`${style.slider} ${style.round}`}></div>
                        </label>
                        <span>Response JSON</span>
                    </h6>
                    {!this.state.checked ?
                        <TabProvider defaultTab="one">
                            <TabList>
                                <Tab tabFor="one">CURL</Tab>
                                <Tab tabFor="two">JAVA</Tab>
                                <Tab tabFor="three">.NET</Tab>
                                <Tab tabFor="four">PHP</Tab>
                            </TabList>
                            <TabPanel tabId="one">
                                <span dangerouslySetInnerHTML={this.getCurlHTML()}></span>
                            </TabPanel>
                            <TabPanel tabId="two">
                                <span dangerouslySetInnerHTML={this.getJavaHTML()}></span>
                            </TabPanel>
                            <TabPanel tabId="three">
                                <span dangerouslySetInnerHTML={this.getNetHTML()}></span>
                            </TabPanel>
                            <TabPanel tabId="four">
                                <span dangerouslySetInnerHTML={this.getPHPHTML()}></span>
                            </TabPanel>
                        </TabProvider> : null}
                    {
                        this.state.checked ?
                            <TabProvider defaultTab="success" >
                                <TabList >
                                    <Tab tabFor="success" > Success </Tab> <Tab tabFor="error" > Error </Tab > </TabList> <TabPanel tabId="success" > 
                                   <span dangerouslySetInnerHTML={this.getSuccessHTML()}></span>
                                </TabPanel> <TabPanel tabId="error" >
                                     <span dangerouslySetInnerHTML={this.getErrorHTML()}></span>
                                </TabPanel>
                            </TabProvider> : null
                    }

                </div>
            </div>
        </div>

        );
    }
}