import React from 'react';
import * as style from './style.module.scss';
import PricingLayout from './../../components/pricing-layout';


const Pricing = (props) => {
    return (
        <PricingLayout>
        <div className={`${style.pricingInner}`}>
            
            <div className={`${style.bannerWrap}`}>
                <h1 className={`${style.mainHeading}`}>Simple, straightforward pricing</h1>
                <h4 className={`${style.mainPara}`}>No setup fee. No maintenance fee.</h4>
                <button className={`btn btn-primary`}>Get Started with Paytm</button>
                <div className={`${style.bannerLinkBox}`}>
                    <p>All plans come bundled with full access to the entire suite of Paytm products -</p>
                    <p><a href='https://business.paytm.com/retail' target="_blank">QR Code</a>, <a href='https://developer.paytm.com/docs/v1/payment-gateway' target="_blank">Payment Gateway</a> for Web, <a href='https://developer.paytm.com/docs/v1/android-sdk' target="_blank">Payment SDKs</a> for Mobile Apps and <a href='https://business.paytm.com/payment-link' target="_blank">Payment Links</a>.</p>
                </div>

            </div>
            <div className={`${style.gridWrap} grid vertical`}>
                <div className={`${style.pricingPack} grid`}>
                    <div className={`${style.pricingColumn}`}>
                        <ul className={`${style.priceHeadingList}`}>
                            <li className={`grid align-center`}>
                                <div className={`${style.planBox}`} >
                                    <h4>OUR PLANS</h4>
                                    <p>For all business types and sizes</p>
                                </div>
                            </li>
                            <li className={`grid align-center`}>
                                <h6 className={`${style.highlighted}`}>Monthly payment limits &#38; Charges Per Transaction</h6>
                                <p>Paytm Wallet</p>
                            </li>
                            <li className={`grid align-center`}>
                                <p>UPI</p>
                            </li>
                            <li className={`grid align-center`}>
                                <p>Paytm Payments Bank</p>
                            </li>
                            <li className={`grid align-center`}>
                                <p>Debit Card</p>
                            </li>
                            <li className={`grid align-center`}>
                                <p>Credit Card</p>
                            </li>
                            <li className={`grid align-center`}>
                                <p>Net Banking</p>
                            </li>
                            <li>
                                <h4 className={`${style.highlighted}`}>Application Process</h4>
                            </li>
                        </ul>
                    </div>

                    <div className={`${style.pricingColumn}`}>
                        <ul className={`${style.priceList}`}>
                            <li>
                                <div className={`${style.popularTag} grid align-center`}>
                                    <img src="../assets/ic-star.svg"/><span>MOST POPULAR</span>
                                </div>
                                <div className={`${style.box}`} >
                                    <h3>Starter</h3>
                                    <p>For small startups and home businesses</p>
                                </div>
                            </li>
                            <li className={`${style.extraPadding}`}>
                                <p >₹50,000</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>Unlimited</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>Unlimited</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p>Online submission of PAN</p>
                            </li>
                        </ul>
                    </div>

                    <div className={`${style.pricingColumn}`}>
                        <ul className={`${style.priceList}`}>
                            <li>
                                <div className={`${style.box}`} >
                                    <h3>Standard</h3>
                                    <p>For medium-sized businesses and freelancers</p>
                                </div>
                            </li>
                            <li className={`${style.extraPadding}`}>
                                <p>₹50,000</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>Unlimited</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>Unlimited</p>
                                <p>charges: 0%</p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            <li>
                                <p>-</p>
                                <p></p>
                            </li>
                            
                            <li>
                                <p></p>
                                <p>Online submission of Business Documents</p>
                                <p><a href="#">View list of required documents</a></p>
                            </li>
                        </ul>
                    </div>

                    <div className={`${style.pricingColumn}`}>
                        <ul className={`${style.priceList} ${style.noBorder}`}>
                            <li>
                                <div className={`${style.box}`}>
                                    <h3>Business</h3>
                                    <p>For large businesses with high transaction volumes</p>
                                </div>
                            </li>
                            <li className={`${style.extraPadding}`}>
                                <p>Unlimited</p>
                                <p>Charges: 1.99% + Taxes</p>
                                <p className={`${style.smallTxt}`}>Applicable for all payments via Paytm Wallet, UPI, Paytm Payments Bank, Debit/Credit Card and Netbanking</p>
                            </li>
                            <li>
                                <p></p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p></p>
                            </li>
                            <li>
                                <p></p>
                                <p>Online submission of Business Documents</p>
                                <p><a href="#">View list of required documents</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${style.pricingContact}`}>
                <p>Need help with our pricing and plans?</p>
                <button className={`btn btn-primary ${style.contactBtn} `}>Contact Us</button>
            </div>
        </div>
    </PricingLayout>
);
}

export default Pricing;