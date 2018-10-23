---
path:  "/docs/getting-started/index.md"
title: "Paytm for Developers: Getting Started"
---


import * as style from './style.module.scss';
import MdButton from './../../../components/md-button/index';


<div className={`${style.grid} ${style.justifyBetween}`}>
    <div className={`${style.headLeft}`}><h1>Start Building with Paytm</h1><h3>Paytm Payment Gateway provides a secure, PCI-compliant way to accept Debit/Credit card, Net-Banking, UPI and Paytm wallet payments from your customers</h3><ul><li><MdButton text={`Create account`}></MdButton> or <MdButton text={`login`}></MdButton> using your existing Paytm account</li><li>Generate your <a href='https://dashboard.paytm.com/next/apikeys?src=dev' target="_blank">staging account credentials</a> from the dashboard. These are required 
 to explore Paytm's integration solutions.</li><li>When you are ready to go live, <a href='https://dashboard.paytm.com/next/activate?src=dev' target="_blank">activate your account </a>in the dashboard to get production account credentials</li></ul></div>
    <div className={`${style.headRight}`}><img src='./../../assets/img-start-building-with-paytm.svg' alt='' /></div>
</div>


## Understanding account credentials
---

<a href="https://dashboard.paytm.com/next/apikeys?src=dev" target="_blank">Account credentials</a> are available in your dashboard for both staging and production environment. These credentials consist of -

* **MID (Merchant ID)** - This is a unique identifier provided to every merchant by Paytm. MID is part of your account credentials and is different on staging and production environment. Your staging MID is available <a href="https://dashboard.paytm.com/next/apikeys?src=dev" target="_blank">here</a> and production MID will be available once your activation is complete 
* **Merchant Key** - This is a unique secret key used for secure encryption of every request. This needs to be kept on server side and <u>should not be shared with anyone</u>


## Dashboard 
--- 

The Paytm <a href="https://dashboard.paytm.com" target="_blank">Dashboard</a> is a single window to manage your account -


* Activate account to start accepting payments
* Generate your staging and production account credentials
* Switch views between staging and production transaction data
* Check payments received from your customers
* Check bank transfers Paytm makes into your account
* Initiate refunds if you need to
* Download all kinds of transaction reports
* Get help 
  

## Fundamentals of collecting payments with Paytm:
---

* Your customer clicks on a pay button in your web/mobile application
* Customer is shown a checkout form where she fills her payment details and authorizes the payment
* After completion of transaction, Paytm posts the response (success or failed) on a Callback URL defined by you
* As a <u>recommended</u> security measure, you validate each transaction response via a server-to-server (S2S) API call. Transaction revalidation protects from request/response tampering possible in browser calls. This S2S call is not required for Paytm plugins and hosted e-commerce website integration solutions
* Based on the response received, you display order status to customer
* See a real-time summary of payments received and other insights in your <a href="https://dashboard.paytm.com" target="_blank">dashboard</a>
* Receive payments collected from customers in your bank account on next business day



## Detailed Payment Flow Explained
---

##### Transaction Creation 

When a transaction request is received at Paytm's server, there are multiple validations carried out like valid source of request, structure of request, uniqueness of request etc. Once these validations are passed, a transaction is created.

---

##### Successful Transaction 

 Customer fills basic payment details to authorize the payment. Once the authorization is successful, money is debited from customer’s account. This transaction is a successful transaction.

---

##### Failed Transaction 

If the customer drops out from the payment process or in the event of payment authorization failure, money is not deducted from customer’s account. This is marked as failed transaction.

---

##### Pending Transaction

Sometimes Paytm doesn't receive real-time transaction status from the bank. This can due to many reasons such as network issues, technical errors at customer's/bank's end etc. This is marked as pending transaction. Refer     <Link to="/docs/late-notification">this</Link> for detailed handling of pending transaction.

---

##### Settled Transaction 

Payments received against successful transactions are credited into your bank account on T+1, where T is the date of successful transaction. Once the payment is credited, corresponding transaction is marked as Settled.

---

##### Refund Transaction 

Sometimes there are use cases where you need to reverse payments for successful or settled transactions. The reversal transaction of a successful or settled payment is called refund transaction. Refer <Link to="/docs/refund-management">Refunds</Link> for more details.


---

##### Ready to dive in? Select an integration solution to start your journey with Paytm 

import Link from 'gatsby-link';

<div className='sdk-area grid-inline'>
    <Link to="/docs/v1/payment-gateway">
        <div className='grid vertical justify-center'>
        <img src='./../../assets/ic-business-web-api-black.svg' alt='' />
        <p>Paytm Checkout</p>
        </div>
    </Link>
    <Link to="/docs/v1/android-sdk">
        <div className='grid vertical justify-center'>
        <img src='./../../assets/art-android.png' alt='' />
        <p>Android SDK</p>
        </div>
    </Link>
    <Link to="/docs/v1/ios-sdk">
        <div className='grid vertical justify-center'>
        <img src='./../../assets/ic-business-web-ios-black.svg' alt='' />
        <p>iOS SDK</p>
        </div>
    </Link>
</div>
<br/>
<br/>
<br/>


