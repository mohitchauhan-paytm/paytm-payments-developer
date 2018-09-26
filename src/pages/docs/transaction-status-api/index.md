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


### This section consists of use cases of API, request & response attributes and list possible transaction response codes  

## Use Case
---

* To re-verify the status of transaction communicated over browser calls
* To fetch status of transacion where real time communication did not take place (Bank failures, API timeouts etc)
* To fetch status of transacion where transaction status was communicated as pending 


<div className={`${style.space10}`}></div>

## Request Attributes

| | |
| --- | --- |
| **MID** String(20) | This is a unique identifier provided to every merchant. MID is part of your account credentials and is different on staging and production environment. Your MIDs is available here 
| **ORDERID** String(50) | Order ID is merchant’s unique reference ID for a transaction passed in the transaction payload. This is Order ID for which the trasnsaction status needs to be fetched 
| **CHECKSUMHASH** String(108) | Encryption parameter generated on server side using our utility
---

<div className={`${style.space10}`}></div>


## Response Attributes

| | |
| --- | --- |
| **MID** String(20) | Same as request
| **TXNID** String(64) | This is a unique Paytm transaction Id corresponding to OrderID for which status is being checked
| **ORDERID** String(50) | Same as request
| **BANKTXNID** String(50) | The transaction Id sent by the bank. In case of wallet, this value will be NULL or empty
| **TXNAMOUNT** String(10) | Order value of the transaction in INR
| **STATUS** String(20) | This contains the transaction status and has only three values: TXN_SUCCESS, TXN_FAILURE & PENDING
| **RESPCODE** String(10) | Codes refer to a particular reason of payment failure. These are detailed in the list provided below
| **RESPMSG** String(500) | Description message attached with each respcode. These are detailed in the list provided below
| **TXNDATE** DateTime | Date and time of transaction <br/> EX- “2015-11- 02 11:40:46.0”
| **GATEWAYNAME** String(15) | Gateway used by Paytm for that transaction (ICICI/HDFC/SBI/WALLET etc)
| **BANKNAME** String(500) | Issuing bank of the card used by the customer in the transaction
| **PAYMENTMODE** String(15) | Payment mode used for transaction (CC/DC/NB/UPI)
| **CHECKSUMHASH** String(108) | Encryption parameter. This needs to verified on server side using our server side utility

<div className={`${style.space10}`}></div>

## Transaction Response Codes

| | |
| --- | --- |
|**01**| TXN_SUCCESS
|**10** | Refund Successfull
|**227**| TXN_FAILURE
|**334** | Invalid Order Id.
|**400**| PENDING
|**401**| TXN_FAILURE
|**402**| PENDING
|**810**| TXN_FAILURE


