import React, { Component } from 'react';
import * as style from './style.module.scss';

class HostedEcomWeb extends Component {
    render() {
    return (
        <div className={`${style.ecomPlatform} grid justify-between`}>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`} >
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-martjack.png' alt=''/>
                        <label>Martjack</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`} >
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/shopmatic.png' alt=''/>
                        <label>Shopmatic</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`} >
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-zepo.png' alt=''/>
                        <label>Zepo</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`} >
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-kartrocket.png' alt=''/>
                        <label>Kartrocket</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`} >
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/logo-ecomchain.png' alt=''/>
                        <label>Ecomchain</label>
                    </span>
                </a>
            </div>
            <div className={`${style.ecomCard}`}>
                <a href='' className={`${style.cardLink} grid justify-between align-center`}>
                    <span className={`grid justify-between align-center`}>
                        <img src='/assets/shopify.png' alt=''/>
                        <label>Shopify</label>
                    </span>
                </a>
            </div>

            
            
        </div>
    );
    }
}

export default HostedEcomWeb;