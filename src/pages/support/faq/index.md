---
title: "FAQ's Page"
path:  "/support/faq/index.md"
---


import * as style from './style.module.scss';


# Frequently Asked questions (FAQs)

### This section consists redressals for common issues faced by developers during integration. Before raising a ticket or asking question on our developer forum, kindly go through this list to get instant resolution of you problem 


<div className={`${style.space10}`}></div>


## Account credentials
---
**Can I share my MID with others?** 
 
MID is a unique identifier for your account. It can be shared for reference with Paytm support teams while raising any tickets/query. It is advisable not to share MID with any third party.

**Can I share my merchant secret key with others?**
 
Key must not be shared with anyone. Merchant key is secret key that is shared with you and used by Paytm to authenticate transaction request.
 
**What should I do if my merchant key gets compromised?**
 
If your key is compromised, we can change the key at our end. Just write to us at payments.onboarding@paytm.com/devsupport@paytm.com
 
**Can I keep merchant key on client side?**
 
Merchant key must be placed on server side only
 
<div className={`${style.space10}`}></div>


## Integration Limitations
---

**Does Paytm have SDK for hybrid Apps?**

No, we do not have SDK for hybrid Apps. However we support Paytm Checkout integration on hybrid Apps
 
**I have static/HTML website, how can I integrate Paytm?**

Deep integration on HTML website is not possible, you can use our Email/SMS invoicing or Payment Link feature

<div className={`${style.space10}`}></div>


## Callback URL
---

**Why do I need to configure callback in Paytm checkout not for Android or iOS SDK?**
 
In Android or iOS SDK, static callback URL is used to send response to Paytm SDK which internally communicates to merchant APP
 
**Can multiple call back URL be configured**
 
Different callback URL can be passed in every transaction request itself. We do not have a limit on callback against a merchant
 
**Can I bypass passing callback URL in transaction payload in Paytm checkout?**
 
Static Callback URL can be configured at Paytm’s end. However, it is advisable to pass callback URL in the transaction payload to have complete control in an event of change
 
**Can different callback URL be configured for Success and Failed transaction?**

No, We do not facilitate this.
 
<div className={`${style.space10}`}></div>



## Transaction Request Errors
---

**What are the things to keep in mind before generating/verification checksumhash?**

While generating checksum, please take care of below points:-
 
* No space in the parameters passed in the request
* Values and number of parameters passed in the payload and checksumhash generation should be same
* Use environment specific merchant key 
* Static values shared by Paytm like MID, Website etc. should be passed as shared
 
**Can I generate checksumhash over client side?**

No, Checksumhash cannot be generated on client side.
 
**Can checksumhash consists of spaces?**

No

**While landing on Paytm checkout page, I am getting access denied error with message “You don't have permission to access [http://securegw.paytm.in/theia/processTransaction]() on this server.” Reference #18.d167c917.1528656461.5f0c9baa”. What should I do?**

The request is being rejected by our Web Application Firewall (WAF). This error comes when we receive the request from IPs which are marked as suspicious. You can either pass request through different secure network/IP else you can write to us at payments.onboarding@paytm.com/devsupport@paytm.com
 
**I am seeing “lost in space” while re-directing to Paytm Gateway. What can be the possible reasons?**

This error may occurs mainly due to multiple reasons. Please ensure - 
* All 7 mandatory parameters are sent in the payload
* Parameters do not consist of space
* Checksum Mismatch – Please refer checksum generation section to refer to the checklist
 
**I am getting error page with message “Your Merchant has reached limit”. What should I do?**

You have been provided the account with limits because of the lower risk score. This can be due to 
* Documents not completed
* Website or App URL is not shared/live
 
To increase this limit, please reach out to us at payments.onboarding@paytm.com with the mentioned discrepancies resolved

**After completion of payment, I am not getting a response from Paytm/landing on 404 error page/landing on Paytm page. What I am going wrong?**

This error arises when callback URL is not passed or passed incorrectly in the transaction payload request.
 
<div className={`${style.space10}`}></div>



## Plugins
---

 **I want to receive response on a customized callback URL created by our team, not on the URL created by Paytm in our plugin, what are the steps for the same?**
 
You need to enable Custom Callback URL from the admin panel of your plugin and pass the URL in Callback URL field
 
**The integration kit mention to pass Transaction URL and Transaction Status URL however, I am not getting the option of Transaction URL and Transaction Status URL in Paytm Plugin. What can be issue?**
 
You may have downloaded the outdated plugin. Please download and use the latest Paytm Plugin from the given link and follow instruction as given in Readme.md file. - https://business.paytm.com/developers-api
 
 **While installing plug-ins, I am getting error “server to server communication error, please contact your Administrator”.  How can I resolve this?**
 
Make sure cURL is enable on your server and your server is allowing cURL to send request for external IPs. You to check if cURL is already enabled at your end, you can use below code

```php
<?php phpinfo();?>
```

<div className={`${style.space10}`}></div>



## APIs
---
**While calling refund API, I am getting error as invalid refund request?**
 
Refund API is not whitelisted for your MID. Once you complete your integration of check status API, please write us at devsupport@paytm.com, we will whitelist the API.