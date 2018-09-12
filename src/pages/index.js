/*
 * @Author: Apurav Chauhan 
 * @Date: 2018-08-20 16:48:32 
 * @Last Modified by:   Apurav Chauhan 
 * @Last Modified time: 2018-08-20 16:48:32 
 */

import React, {Component} from 'react'
import { navigate } from "gatsby-link"
import Layout from '../components/layout'
import Home from "../components/home/index";
export default class IndexPage extends Component {
constructor(props){
  super(props);
}

componentDidMount() {
  navigate('/docs')
}

render() {
  return(<div></div>);
}
}
