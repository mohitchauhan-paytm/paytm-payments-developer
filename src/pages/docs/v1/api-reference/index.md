import TransactionWrapperLayoutTxnStatus from '../../../../components/txn_wrapper_layout_txn_status';
import Layout from './../../../../components/layout';


export default ({children,location}) => (
        <Layout>
            <TransactionWrapperLayoutTxnStatus checked={false}>
                {children}
            </TransactionWrapperLayoutTxnStatus>
        </Layout>
)

# **POST** Process Transaction API


### Use Case:

* A
* B
* C

| **Mandatory**     |    
| ------------- | -----|
| **MID**  Alphanumeric(50)       | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard
|**ORDER_ID** Alphanumeric(50)      | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard      
|**MID**  Alphanumeric(50) | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard   
|**MID**  Alphanumeric(50) | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard
|**ORDER_ID** Alphanumeric(50)      | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard      
|**MID**  Alphanumeric(50) | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard   

---

| **Optional**     |    
| ------------- | -----|
|**MID**  Alphanumeric(50)           | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard
|**ORDER_ID** Alphanumeric(50)      | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard      
|**MID**  Alphanumeric(50)           | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard
|**ORDER_ID** Alphanumeric(50)    | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard      
|**MID**  Alphanumeric(50) | This is a unique identifier that is issued by paytm to the Merchant. This is available to your dashboard      
