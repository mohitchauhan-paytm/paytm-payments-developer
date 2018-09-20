---
path:  "/docs/late-notification/index.md"
title: "Paytm for Developers: Understanding Late notification of transaction"
---


# Delayed Notification


During the payment process, customer is redirected to bank page to complete two-factor authentication. Once the authentication is complete, Paytm gets a response from the bank with the status of the transaction. On some occasions the status is not received immediately after the complition transaction. This may happen due to network issues, technical errors at customer's/bank's end, <span>manual intervention</span> or other reasons


Paytm polls the transaction status from bank for next 72 hours. In case we do not receive the status of transaction after 72 hours, the transaction is marked as failed. 

## Fetching the transaction status: 
---

In case we receive a delayed/no response from the bank, posting transaction response on callback URL is not feasible. There are two ways for merchant to get status of transaction:   

* Via Webhook - Paytm sends a server to server (S2S) response in key value pair on the configured URL. S2S response is sent only when transaction has reached a terminal state (success/fail). To configure the URL, kindly connect with our integration/helpdesk team

* Via Polling - setup a polling process after regular intervals using Transaction status API. The polling time period should be 72 hours (same as between the bank and Paytm)

## Transaction notification requirement by business needs - 
---

### Real-time notifications requirement:  

There are business where transaction status is required on real-time basis like - 

* Fluctuating price of item - Flight/trains/Bus/Hotels
* Limited inventory - Movie/Flight 
* Immediate delivery model - Food Delivery

In case of delayed notifications, real-time time transaction status can be achived by merchant in following two ways - 

* Quick failure - A time limit is set by you beyond which transaction will be considered failed. The counter starts from the point when transaction reaches Paytm. In case the bank confirms the status as successful beyond this period, we will initiate an auto-refund against this transaction. Minimum time limit that can be set is 5 minutes. To set this up, kindly connect with our integration/helpdesk team

* Refunds - This needs to be built at merchant end. Beyond a point in time, you can fail the transaction at your end. In case we report transaction as success, you can initiate a refund against the transactions 

### Delayed notifications requirement: 


* While some business require immediate transaction notifications, there are others that can provide service to customer after a defined acceptable delay. Example of such businesses are -

* Recharges and utility bill payments - Do not have a limited inventory and the price is not fluctuating
High value transaction - If the transaction value is large (e.g. school fees, insurance payments etc), often customer does not have sufficient funds to pay the transaction amount twice without getting a refund for the first transaction. Hence implementing quick failure or refunds would weaked user experience

Based on your business need, you can build a process to handle delayed notifications. 

