---
path:  "/docs/refund-management/index.md"
---



# Refunds

Refund are reversal transactions wherein complete or partial money is moved back to customer’s source account (account from which actual payment was made). Refund is always created against a succesful or settled transactions. Use case for refund arise in following scenarios - 


* Customer initiated refund (returns/cancellation) - Customer has changed his mind about consumption of product pre/post order fulfillment
*  Account/Merchant initiated refund - 
    * Product/service is out of stock   
    * Merchant works on prepaid model wherein initial amount was higher than final billed amount (prepaid service model)
    * Mismatch in transaction reconciliation between Paytm transaction status  & merchant’s transaction status. To do reconciliation, you can use dashboard as a data source for our status


You can initiate partial or complete refunds to your customer’s source account . A refund request usually takes 7-14 business days to reflect in customer’s account. 


## Overview of refund & settlement process 
---

* Once the merchant makes a refund request with us, we do basic validation (detailed later). After this we send the information to customer’s issuing bank (customer’s bank) via our acquiring bank 
* If acquiring back accepts the refund, , we add the amount to be refunded to that days settlement with merchant 
* In case the refunds is not processed by acquiring bank programmatically, we connect with them & issuing bank directly (offline) to get the refund processed


## Ways to initiate refunds
---


Paytm provides two ways by which you can initiate refunds

### Refund via dashboard

Single transaction refund  - Each transaction needs to be individually selected to process refund 

  * Go to transaction tab
  * Click on transaction which needs to be refunded
  * On the transaction information panel, click on “refund” on top right corner
  * Enter the amount that needs to be refunded
   
Bulk refund - Multiple transactions can be refunded at once via this flow 

  * Go to refunds tab on merchant dashboard
  * Click on bulk refunds
  * Upload a file in a specified format in either Excel 2007 or 2011 format. Sample file is provided on the panel
  
### Refund via APIs 

You can also initiate a refund via the Refund API. Identifier of transaction against which refund has to be made is order ID (unique parameter for an order in your system) and transaction ID (unique parameter for your order with Paytm passed in transaction response)

## Constraints on refunds
---

* Once the refund is requested against a transaction, it cannot be cancelled by merchant
* Refund request will always be credited to customer source account with which the transaction was done initially 
* Refunds can be requested for successful, settled or partially refunded orders. For settled orders, successfully refunded amount will be added in your that settlement on the day acquiring bank accepts the refund
* Total refund initiated in a day has to be lower than total outstanding payable amount with Paytm. In case it is above, the refunds are not accepted  
* There are 6 partial refunds are allowed on a single transaction with done using Rupay card network
* For wallet transaction where Paytm cashback (CB) has been processed successfully 
   * Customer will receive a refund after deduction of CB
   * Merchant will receive the settlement for the entire amount


## Time taken to process refunds


Refund process involves a lot of handshakes hence it usually takes 14 days for the refund amount to be credited in customer’s account. Typical window of refund credit per transaction mode is provided below:

Max time taken to settle into customers account


| Instrument |	Paytm Wallet |	Paytm Payments Bank | 	CC/DC | 	UPI - PPBL | 	UPI | 	Netbanking |
| --- | --- | --- | --- | --- | --- | --- |
| Private Banks	| 1 day |	5 days |	10 days |	5 days	 | 14 days	| 7 days |
| Nationalized Banks |	-	 | -	| 14 days |	- |	14 days |	7 days |


Bank holidays are excluded from the timelines provided

As a best practice we recommend to communicate an expected date by which customer will receive money. This communication should go out once we have accepted the refund and confirmed the status as successful


import { Helmet } from "react-helmet";

<Helmet>
    <title>Paytm for Developers: Understanding Refund Management</title>
</Helmet>
