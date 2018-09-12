import React from 'react'
import { FormattedMessage} from 'react-intl';

import Layout from '../../components/layout'

const IndexPage = () => (
  <Layout>
    <FormattedMessage
                  id="welcome"
                  defaultMessage="Welcome to this page"
              />
  </Layout>
)

export default IndexPage
