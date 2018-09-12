import React, { Component } from "react";
import {connect} from 'react-redux';

class MdButton extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = () =>  {
        this.props.toggleShowLogin(true);
    }

    render() {
        return(<a href="javascript:void(0)" onClick={this.handleChange}>{this.props.text}</a>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleShowLogin: (showLogin) => dispatch({type: 'TOGGLE_SHOW_LOGIN', showLogin}),
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MdButton);
