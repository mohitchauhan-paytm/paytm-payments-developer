---
path:  "/docs/transaction-status-api/index.md"
title: "API Reference - Transaction Status"
---


import TransactionWrapperLayoutTxnStatus from '../../../components/txn_wrapper_layout_txn_status';
import Layout from './../../../components/layout';
import * as style from './style.module.scss';

export default ({children,location, pageContext}) => (
        <Layout pageContext={pageContext}>
            <TransactionWrapperLayoutTxnStatus checked={false}>
                {children}
            </TransactionWrapperLayoutTxnStatus>
        </Layout>
)

<div>
    <h1 className={`${style.statusHeading}`}><span><img src='/assets/tag-get.svg'/></span> Transaction Status</h1>
</div>



### This section consists of list of possible use cases of the API, request & response attributes and list of possible transaction response codes  

## Use Case
---

* To re-verify the status of transaction communicated over browser calls
* To fetch status of transacion where real time communication did not take place
* To fetch status of transacion where transaction status was communicated as pending 


<div className={`${style.space10}`}></div>

## Request Attributes

| | |
| --- | --- |
| **MID**  String(20)       | This is a unique Merchant identifier that is issued by Paytm to the Merchant
|**ORDER_ID** String(50)     | Order ID for which STATUS needs to be checked      
|**CHECKSUMHASH**  String(108) | Checksum computed by Paytm provided utility with request parameters
---

<div className={`${style.space10}`}></div>


## Response Attributes

| | |
| --- | --- |
|**MID**  String(20)           | This is a unique Merchant identifier that is issued by Paytm to the Merchant
|**TXN_ID** String(64)      | This is a unique Paytm transaction Id corresponding to OrderID for which status is being checked
|**ORDERID**  String(50)           | Order ID for which STATUS needs to be checked
|**BANKTXNID** String(50)    | The transaction Id sent by the bank (NULL or empty string if the transaction doesn’t reach the bank). In case of wallet, this value will be NULL or empty
|**TXNAMOUNT**  String(10) | 	Same as request
|**STATUS**  String(20) | This contains the transaction status and has only three values: <br/>1. TXN_SUCCESS <br/>2. TXN_FAILURE<br/>3. PENDING
|**RESPCODE**  String(10) | This is alphanumeric transaction response code. All codes refer to a transaction failure or success with each code representing a different reason for failure.
|**RESPMSG**  String(500) | This contains a short description of the transaction status. In case of a failed transaction the message will describe the potential reason for the failure 
|**TXNDATE**  DateTime | Date and Time of transaction. <br/>EX- "2015-11- 02 11:40:46.0"
|**GATEWAYNAME**  String(15) | Gateway used by Paytm <br/>(ICICI/HDFC/SBI/WALLET etc)  
|**BANKNAME**  String(500) | Bank name of the card issuing bank
|**PAYMENTMODE**  String(15) | 	The payment mode used for transaction <br/>(PPI/NB/CC/DC/UPI)         
|**CHECKSUMHASH** String(108) | Checksumhash computed by Paytm with response parameters

<div className={`${style.space10}`}></div>

## Transaction Response Codes

| | |
| --- | --- |
|**1**| Txn Successful
|**10**| Refund Successful
|**101**| [CMER-IP101] Internal Processing Error
|**200**| Successful Operation
|**227**| Payment Failed Due To A Technical Error Please Try After Some Time
|**330**| Checksum Is Not Valid
|**331**| No Record Found
|**334**| Invalid Order Id
|**400**| Transaction Status Not Confirmed Yet
|**402**| We Are Processing Your Transaction
|**601**| Refund Request Was Raised For This Transaction. But It Is Pending State
|**602**| Refund Failed
|**810**| Order Is Closed

