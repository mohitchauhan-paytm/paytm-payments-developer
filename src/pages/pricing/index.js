import React from 'react';
import * as style from './style.module.scss';
import Layout from './../../components/layout';


const Pricing = (props) => {
    return (
        <Layout>
        <div>
            
            <div class={`${style.bannerWrap} grid vertical justify-center align-center`}>
                <h1 class={`${style.mainHeading}`}>Simple, straightforward pricing</h1>
                 <p class={`${style.mainPara}`}>No setup fee. No maintenance fee.</p>
            </div>
            <div class={`${style.gridWrap} grid vertical`}>
                <div class={`${style.boxWrap} grid-inline justify-end`}>
                    <div class={`${style.box}`} >
                        <h3>Starter</h3>
                        <p>Starter Plan is available for small startups, freelancers or home businesses</p>
                        <button class={`btn btn-primary`} onClick={() => window.open('https://dashboard.paytm.com/next/activate', '_blank')}>Get the Starter Plan</button>
                    </div>
                    <div class={`${style.box}`}>
                        <h3>Business</h3>
                        <p>Business who can provide registration documents for verification</p>
                        <button class={`btn btn-primary`} onClick={() => window.open('https://dashboard.paytm.com/next/upgrade', '_blank')}>Get the Business Plan</button>
                    </div>
                </div>
                <div class={`${style.boxPara} jutify-center align-center`}>
                    <p>All plans come bundled with access the full suite of Paytm Products. <a href='https://developer.paytm.com/docs/v1/payment-gateway' target="_blank">Developer APIs,</a> <a href='https://developer.paytm.com/docs/v1/android-sdk' target="_blank">Developer SDKs,</a> <a href='https://business.paytm.com/payment-link' target="_blank">Payment Links</a> and <a href='https://business.paytm.com/retail' target="_blank">QR code</a></p>
                </div>
                <div class={`${style.tableWrap}`}>
                    <table class={`${style.w100}`} >
                            <thead>
                                <tr>
                                    <th class={`${style.borderRefine} ${style.highlighted}`} >Monthly payment limits & Charges</th>
                                    <th class={`${style.borderRefine}`}></th>
                                    <th class={`${style.borderRefine}`}></th>
                                </tr>
                            </thead>
                        
                        <tbody>
                        <tr>
                            <td>Paytm Wallet</td>
                            <td>
                                ₹50,000
                                <p>Charges: 0%</p>
                            </td>
                            <td>
                                Unlimited
                                <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td>UPI</td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Paytm Payments Bank</td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Debit Card</td>
                            <td>
                                Optional
                                <p>Charges: On request</p>
                            </td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Credit Card</td>
                            <td>
                                    Optional
                                    <p>Charges: On request</p>
                            </td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Net Banking</td>
                            <td>
                                    Optional
                                    <p>Charges: On request</p>
                            </td>
                            <td>
                                    Unlimited
                                    <p>Charges: 1.99% + Taxes</p>
                            </td>
                        </tr>
                        <tr>
                            <td class={`${style.highlighted}`}>Application Process</td>
                            <td><p>PAN and Bank account validation</p></td>
                            <td><p>Online submission of Business Documents</p></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class={`${style.helpingBox} grid  vertical justify-center align-center`}>
                {/* <h5>Need help with Pricing and Plans</h5> */}
                {/* <button class={`btn btn-blueColor`}>Contact Us</button> */}
            </div>
        
        
    </div>
    </Layout>
);
}

export default Pricing;