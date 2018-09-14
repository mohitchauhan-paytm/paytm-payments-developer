import React, { Component } from 'react';
import * as style from './style.module.scss';

class HostedEcomWeb extends Component {
    render() {
    return (
        <div className={`${style.ecomPlatform} grid justify-between`}>
            <div className={`${style.ecomCard}`}>
                <a href='https://www.capillarytech.com/products/anywhere-commerce-plus/anywhere-commerce/' className={`${style.cardLink} grid justify-between align-center`} target="_blank">
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-martjack.png' alt=''/>
                        <label>Martjack</label>
                    </span>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/ic-chevron-right.svg' alt=''/>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://www.zepo.in/blog/tag/paytm-payment-gateway/' className={`${style.cardLink} grid justify-between align-center`} target="_blank">
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-zepo.png' alt=''/>
                        <label>Zepo</label>
                    </span>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/ic-chevron-right.svg' alt=''/>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://www.kartrocket.com/' className={`${style.cardLink} grid justify-between align-center`} target="_blank">
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-kartrocket.png' alt=''/>
                        <label>Kartrocket</label>
                    </span>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/ic-chevron-right.svg' alt=''/>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://ecomchain.com/' className={`${style.cardLink} grid justify-between align-center`} target="_blank">
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-ecomchain.png' alt=''/>
                        <label>Ecomchain</label>
                    </span>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/ic-chevron-right.svg' alt=''/>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='https://www.shopify.in/' className={`${style.cardLink} grid justify-between align-center`} target="_blank">
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/shopify.png' alt=''/>
                        <label>Shopify</label>
                    </span>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/ic-chevron-right.svg' alt=''/>
                    </span>
                </a>
            </div>
            
            
        </div>
    );
    }
}

export default HostedEcomWeb;