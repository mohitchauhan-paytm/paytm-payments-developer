import React, { Component } from 'react';
import * as style from './style.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

class TestInstrument extends Component {
    render() {
    return (
        <div className={`${style.testInstrumentWrapper} grid justify-between`}>
            
    
            <Tabs defaultTab="card">
                <div className={`${style.tabListBox}`}>
                    <TabList>
                            <Tab tabFor="card">Test Card Details</Tab>
                            <Tab tabFor="wallet">Test Wallet Details</Tab>
                            <Tab tabFor="net">Net Banking</Tab>
                    </TabList>
                </div>
                <div className={`${style.tabPanelBox}`}>
                <TabPanel tabId="card">
                    <div className={`${style.imgBox} grid-inline justify-center`}>
                        <img src='/assets/visa.png'/>
                        <img src='/assets/mastercard.png'/>
                    </div>
                    <div className={`${style.cardWalletBox}`}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Card Number</td>
                                    <td>Any Visa or Master Card</td>
                                </tr>
                                <tr>
                                    <td>Expiration Month & Year</td>
                                    <td>Any Future month and Year</td>
                                </tr>
                                <tr>
                                    <td>CVV</td>
                                    <td>123</td>
                                </tr>
                                <tr>
                                    <td>OTP</td>
                                    <td>123123</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="wallet">
                    <div className={`${style.cardWalletBox}`}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Mobile Number</td>
                                    <td>77777 77777</td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>Paytm12345</td>
                                </tr>
                                <tr>
                                    <td>
                                        OTP
                                        <p>Doesn’t require 2nd factor authentication</p>
                                    </td>
                                    <td>489871</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel tabId="net">
                    <div className={`${style.cardWalletBox}`}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Bank Name</td>
                                    <td>Andhra Bank</td>
                                </tr>
                                <tr>
                                    <td>User ID</td>
                                    <td>test</td>
                                </tr>
                                <tr>
                                    <td>
                                        Password
                                    </td>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                </div>
            </Tabs>
            <p className={`${style.bluePara}`}>In case you are testing on production environment, use live paymode details to complete the transaction. Once the transaction is successful, you can initiate refund from the dashboard.</p>
        </div>
    );
    }
}

export default TestInstrument;