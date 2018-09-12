import CenterLayout from '../../../components/center-layout';
import Layout from './../../../components/layout';


export default ({children,location}) => (
        <Layout>
            <CenterLayout>
                {children}
            </CenterLayout>
        </Layout>
)

# Test Instruments
### Live paymode information cannot be used in our staging mode. Use the below test card or wallet details to make successful payment on staging


import TestInstrument from './../../../components/test-instruments/index';
import { Helmet } from "react-helmet";

<Helmet>
    <title>Paytm Pre-integrated Solutions: Accept Payments on your hosted website in Martjack, Kartrocket and more</title>
</Helmet>

<TestInstrument></TestInstrument>
