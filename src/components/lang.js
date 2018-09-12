/*
 * @Author: Apurav Chauhan 
 * @Date: 2018-08-20 16:46:17 
 * @Last Modified by: Apurav Chauhan
 * @Last Modified time: 2018-08-20 19:05:49
 */

import React, { Component } from 'react'
import { Link } from 'gatsby'
import { LangUtils } from '../data/langs';

export default class Lang extends Component {
  constructor(props) {
    super(props);
    this.setMsgContext = this.setMsgContext.bind(this);
  }
  setMsgContext() {
    const { code } = this.props;
    LangUtils.currentLocale = code;
  }
  /**
   * This method can be called in to of below Link to generate context sensitive URLs
   */
  getLocaleSpecificURL() {
    let newURL = LangUtils.newURL(this.props.details.root);
    return newURL;
  }
  render() {
    const { details } = this.props;
    return <Link className='link'
      to={details.root}
      style={{
        color: 'white',
        textDecoration: 'none',
      }}
    >
      <span onClick={this.setMsgContext}>{details.desc}</span>
    </Link>
  }
}