---
path:  "/docs/reurring-api/index.md"
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

# Subscription API

## Request Parameters

<div>
    <table className={`${style.apiTable}`}>
        <thead></thead>
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
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
        <thead></thead>
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

---

# Renew Subscription API

<div>
    <table className={`${style.apiTable}`}>
        <thead>
                <tr>
                    <th>Parameter Name</th>
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
                <td>This is the “Merchant Identifier” that is issued by Paytm to the Merchant. This is unique for each merchant that integrates with Paytm
                </td>
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


