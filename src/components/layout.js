import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { IntlProvider, addLocaleData } from 'react-intl';
import './layout.css'
import langMap, { LangUtils } from '../data/langs';
import Footer from "./footer_1/index";
import Header from "./header/index";
import Menubar from './menu-bar/index';
import './../style/preload.scss';
import * as style from './markdown.module.scss';
import Git from './githublink';
/* eslint-disable */

export default class Layout extends Component {
  constructor(props) {
    super(props);
    const currLocale = LangUtils.currentLocale;
    addLocaleData(langMap[currLocale].localeData);
    this.state = { 
      msg: langMap[currLocale].data,
      locale: currLocale,
    }
  }


  render() {
    const root = this.state.locale === 'en' ? '' : this.state.locale;
    const { children, pageContext = {} } = this.props;
    return <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
        <IntlProvider
          locale={this.state.locale}
          messages={this.state.msg}
        ><div className={`height100`}>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
          <div id='app' className = "grid justify-between activeOverlayClass" >
              <Header />
                <div className='wrapper grid'>
                    < Menubar />
                <div className={`wrapper-content max-wrap`}>
                <div id='child' className={`code-wrapper grid ${style.markdown}`}>
                <div className={`small-container`}>
                  {children} 
                </div>
                
                <Git meta={pageContext.frontmatter}/>
                </div>
                </div>
                </div>
              <Footer />
          </div>
            {/* <DefaultPageLayout  user={this.state.user} userText={this.state.userText} loggedIn={this.state.loggedIn} showLogin={this.state.showLogin}>
            {children}
            </DefaultPageLayout> */}
            {/* <Header siteTitle={data.site.siteMetadata.title} />
            <div style={{ background: '#00b9f5' }}>
              <div className="headersub">
                <Link to={`${root}/`} className='link' activeClassName='linkactive'>Home</Link>
                <Link to={`${root}/docs/android`} className='link' activeClassName='linkactive'>Docs</Link>
              </div>
            </div>
            <div
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '2.0875rem 1.0875rem 1.45rem',
              }}>

              {children}
              <hr style={{ margin: 10, height: 2, background: '#f0f0f0' }} />
              MIT License | <a href="https://twitter.com/apuravchauhan">@apuravchauhan</a>
            </div> */}
          </div>
        </IntlProvider>
      )}
    />

  }
}
