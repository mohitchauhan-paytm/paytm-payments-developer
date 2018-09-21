import React, { Component } from "react";
import './style.scss';
import Link from "gatsby-link";
import { Helmet } from "react-helmet";
import {connect} from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = () =>  {
        this.props.toggleShowLogin(true);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Paytm for Developers: Docs Home</title>
                </Helmet>
                <div className='heading-box-area grid justify-between'>
                    <div className='head-left stage-detail'>
                        <h1 className='big-head-txt'>Integrate Payments with Paytm</h1>
                        <p className='small-head-txt'>
                        Add <a href="https://business.paytm.com/payment-gateway" target="_blank">Paytm Payment Gateway</a> to your mobile app or website. Collect online payments from your customers using UPI, Debit/Credit Cards, 50+ NetBanking options and Paytm Wallet.<br/><br/> The only requirement to get started is -
                        </p>
                        <button className='btn btn-default small' onClick={this.handleChange}>Create account</button>
                        
                    </div>

                    <div className='head-right'>
                        <img src='/assets/img-build-with-paytm.svg' alt='' />
                    </div>
                </div>
                
                <div className='box-container'>
                <label className='box-container-label'>Select a platform to start integrating Paytm Payment Gateway -</label>
                    <div className='grid justify-between'>
                        <div className='box-item grid vertical justify-between'>
                            <div className='box-bg'>
                                <img className='' src='/assets/dev-web.svg' alt='' />
                                <div>
                                    <h6 className='bold-heading'>I have a Website</h6>
                                    <p className='small-head-txt'>Paytm Checkout HTML/API integration for your existing website</p>
                                </div>
                            </div>
                            <div className='grid'>
                                <Link to='/docs/v1/payment-gateway' className='btn arrow btn-primary grid justify-center align-center'>Paytm Checkout</Link>
                            </div>
                        </div>
                        <div className='box-item grid vertical justify-between'>
                            <div className='box-bg'>
                                <img className='' src='/assets/dev-app.svg' alt='' />
                                <div>
                                    <h6 className='bold-heading'>I have a Mobile App</h6>
                                    <p className='small-head-txt'>Collect payments seamlessly in your Android or iOS apps</p>
                                </div>
                            </div>
                            <div className='grid'>
                                <Link to='/docs/v1/android-sdk' className='btn arrow grid justify-center align-center'>Android SDK</Link>
                                <Link to='/docs/v1/ios-sdk' className='btn arrow grid justify-center align-center'>iOS SDK</Link>
                            </div>
                        </div>
                        <div className='box-item grid vertical justify-between'>
                            <div className='box-bg'>
                                <img className='' src='/assets/dev-developer.svg' alt='' />
                                <div>
                                    <h6 className='bold-heading'>I’m not a Developer</h6>
                                    <p className='small-head-txt'> Use pre-built plugins for Wordpress, Magento etc. or try one of our integrated e-commerce solutions</p>
                                </div>
                            </div>
                            <div className='grid'>
                                <Link to='/docs/v1/plugins' className='btn arrow grid justify-center align-center'>Paytm Plugins</Link>
                                <Link to='/docs/v1/hosted_e-commerce_websites' className='btn  arrow grid justify-center align-center'>Integrated Solutions</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='information-box light-bg'>
                    <h6 className='bold-heading'>Why developers love Paytm</h6>
                    <ul className='info-list'>
                        <li>Accept payments using India's most trusted payment platform - used by 350 million customers and merchants</li>
                        <li>Accept payments from India’s most popular Wallet by default</li>
                        <li>Go from sign up to production readiness with minimal documentation</li>
                        <li>Enable faster checkout by tapping into a vault of 150 million saved cards on Paytm</li>
                        <li>Track your business performance and growth with a powerful dashboard </li>
                    </ul>
                </div>
                <div className='account-detail-box'>
                    <div>
                        <h4 className='heading24'>Getting started with Paytm is simple</h4>
                        <ul className='stage-list'>
                            <li>
                                <p className='stage'>STEP 1</p>
                                <div className='grid stage-detail'>
                                    <button className='btn btn-default small' onClick={this.handleChange}>Login or Create Account</button>
                                </div>
                            </li>
                            <li>
                                <p className='stage'>STEP 2</p>
                                <p>Activate your account by submitting your bank details so we can transfer funds you collect using Paytm.</p>
                            </li>
                            <li>
                                <p className='stage'>STEP 3</p>
                                <p>Get staging account credentials from your dashboard.</p>
                                <div className='grid stage-detail'>
                                    <button className='btn btn-default small' onClick={() => window.open("https://dashboard.paytm.com/next/developers/apikeys", "_blank")}>Go to developer dashboard</button>
                                </div>
                            </li>
                            <li>
                                <p className='stage'>STEP 4</p>
                                <p>Start building using our available integrations for your platform.</p>
                                <div className='sdk-area grid-inline'>
                                    <Link to="/docs/v1/payment-gateway">
                                        <div className='grid vertical justify-center'>
                                            <img src='/assets/ic-business-web-api-black.svg' alt='' />
                                            <p>Paytm Checkout</p>
                                        </div>
                                    </Link>


                                    <Link to="/docs/v1/android-sdk">
                                        <div className='grid vertical justify-center'>
                                            <img src='/assets/art-android.png' alt='' />
                                            <p>Android SDK</p>
                                        </div>
                                    </Link>


                                    <Link to="/docs/v1/ios-sdk">
                                        <div className='grid vertical justify-center'>
                                            <img src='/assets/ic-business-web-ios-black.svg' alt='' />
                                            <p>iOS SDK</p>
                                        </div>
                                    </Link>


                                </div>
                            </li>
                            <li>
                                <p className='stage'>STEP 5</p>
                                <p>Launch your product and let us take care of payments!</p>
                            </li>
                        </ul>
                    </div>
                </div>
                {
            this.props.showLogin ?

            <div className="popup pos-abs">
              <div className="popup-wrapper pos-rel">
                <div className="popup-content">
                  <iframe id="oAuth" className="popup-iframe hidden" src="https://dashboard-preprod.paytm.com/developer-login" title="oAuth"></iframe>
                </div>
              </div>
            </div>
            : null}
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      toggleShowLogin: (showLogin) => dispatch({type: 'TOGGLE_SHOW_LOGIN', showLogin}),
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);