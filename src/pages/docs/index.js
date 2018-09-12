import Home from '../../components/home/index';
import React, {Component} from 'react';
import Layout from '../../components/layout'


export default class Docs extends Component {
    constructor(props){
        super(props);
      }


    render() 
    {
        return (
            <Layout>
                <Home></Home>
            </Layout>
    )
    }
}
