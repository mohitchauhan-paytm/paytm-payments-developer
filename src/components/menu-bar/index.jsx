import React, { Component } from "react";
import * as style from './style.module.scss';
import Link from 'gatsby-link';
import {connect} from 'react-redux';
class Menubar extends Component {
    constructor(props) {
        super(props);
    }

    showMenu = (event)=> {
        this.props.toggleShowApiMenu(!this.props.state.showApiMenu);
        event.preventDefault();
    }
    render() {
        let visibleMenu = style.visibleMenu;
        return (

            <nav className={`max-wrap  left-nav ${style.navDesk} ${style.navMob} `} >
                <section className={`${style.menuLeft} grid vertical`}>
                    <div className={`${style.menuLeftBlock}`}>
                        <ul className={`${style.menuLeftList}`}>
                            <li className=''>
                                <Link to="/docs" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img src='/assets/ic-business-web-home.svg' alt='' />Home</Link>
                            </li>
                            <li className={`${style.leftListItem}`}>
                                <Link to="/docs/getting-started" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`} ><img src='/assets/ic-business-web-get-started.svg' alt='' />Getting Started</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.menuLeftBlock}`}>
                    <Link to="/docs/v1/payment-gateway">
                      <h4 className={`${style.leftBlockHeading}`}>web integration</h4> 
                    </Link>
                        <ul className={`${style.menuLeftList}`}>
                            <li >
                                <Link to="/docs/v1/payment-gateway"  className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img src='/assets/ic-business-web-api.svg' alt='' />Paytm Checkout</Link>
                            </li>
                            <li>
                                <Link to="/docs/v1/plugins" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img src='/assets/ic-business-web-plugin.svg' alt='' />Plugins</Link>
                            </li>
                            <li>
                                <Link to="/docs/v1/hosted_e-commerce_websites" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/web.svg' alt='' />Hosted E-commerce Websites</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.menuLeftBlock}`}>
                        <Link to="/docs/v1/android-sdk" className="" activeClassName="">
                            <h4 className={`${style.leftBlockHeading}`}>mobile integration</h4>
                        </Link>
                        <ul className={`${style.menuLeftList}`}>
                            <li>
                                <Link to="/docs/v1/android-sdk" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-business-web-android.svg' alt='' />Android</Link>
                            </li>
                            <li>
                                <Link className={`${style.leftLink} grid align-center`} to="/docs/v1/ios-sdk" activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-business-web-ios.svg' alt='' />iOS</Link>
                            </li>
                            
                            <li>
                                <hr />
                            </li>
                            <li>
                                <div onClick={this.showMenu} className={`${style.leftLink} ${style.leftNoLink} grid align-center`}><img className='' src='/assets/ic-business-web-api-reference.svg' alt='' />API Reference</div>
                                <ul className={`${style.menuSubList} ${this.props.state.showApiMenu ? visibleMenu : ''} `}>
                                    <li><Link to="/docs/transaction-status-api" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`} ><img src='/assets/tag-post.svg' alt='' /> Transaction Status</Link></li>
                                    <li><Link to="/docs/refund-api" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img src='/assets/tag-post.svg' alt='' /> Refund </Link></li>
                                    <li><Link to="/docs/refund-status-api" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img src='/assets/tag-post.svg' alt='' /> Refund Status</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/docs/late-notification" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-lightbulb-outline.svg' alt='' />Delayed Notification</Link>
                            </li>
                            <li>
                                <Link to="/docs/refund-management" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-business-web-refunds.svg' alt='' />Refund Management</Link>
                            </li>
                            
                            
                            <li>
                                <Link to="/support/faq" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-business-web-faq.svg' alt='' />FAQs</Link>
                            </li>
                            <li>
                                <Link to="/docs/testing-integration" className={`${style.leftLink} grid align-center`} activeClassName={`${style.activeLink}`}><img className='' src='/assets/ic-business-testing.svg' alt='' />Testing Integration</Link>
                            </li>
                        </ul>
                    </div>

                </section>
            </nav>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShowApiMenu: (showApiMenu) => dispatch({type: 'TOGGLE_SHOW_APIMENU', showApiMenu}),
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);