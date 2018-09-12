import React, { Component } from 'react';
import * as style from './style.module.scss';
import { push } from "gatsby-link"

export default class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
         <div className={`${style.errorWrapper}`}>
             <img src='/assets/img-error-404.svg'/>
             <h3>404 - Page not found</h3>
             <p>The page you are looking for couldn’t be found</p>
             <button className={`btn btn-primary`} onClick={() => push('/docs')}>Go back home</button>
         </div>
    );
    }
}