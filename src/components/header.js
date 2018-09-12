import React from 'react'
import { Link } from 'gatsby'
import Lang from './lang'
import locales from '../data/langs'

const Header = ({ siteTitle }) => {
  const LangLinks = Object.keys(locales).map(code => <Lang code={code} key={code} details={locales[code]} />)
  return <div style={{ background: '#012b72' }}>
    <div className="header">
      <h2 style={{ margin: 5 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}>
          {siteTitle}
        </Link>
      </h2>
      {LangLinks}
    </div>
  </div>
}

export default Header
