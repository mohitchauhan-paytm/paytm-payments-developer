import CenterLayout from '../../../../components/center-layout';
import Layout from './../../../../components/layout';

export default ({children,location}) => (
        <Layout>
            <CenterLayout>
                {children}
            </CenterLayout>
        </Layout>
)

# Paytm Checkout Flow - Hosted E-Commerce Platform

Paytm comes pre-integrated for some e-commerce platforms. The website admin only needs to input the credentials provided by Paytm to go live.


import HostedEcomWeb from './../../../../components/hosted-ecom-website/index';
import { Helmet } from "react-helmet";

<Helmet>
    <title>Paytm Pre-integrated Solutions: Accept Payments on your hosted website in Martjack, Kartrocket and more</title>
</Helmet>
<HostedEcomWeb></HostedEcomWeb>