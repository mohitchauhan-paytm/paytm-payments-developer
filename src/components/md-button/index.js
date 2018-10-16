import React, { Component } from "react";
import {connect} from 'react-redux';

class MdButton extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = () =>  {
        if(!this.props.state.showMainLogIn) {
            this.props.toggleMainShowLogin(true);
            this.props.toggleShowLogin(true);
        }
        this.props.toggleShowLogin(true);
    }

    render() {
        return(<a href="javascript:void(0)" onClick={this.handleChange}>{this.props.text}</a>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleShowLogin: (showLogin) => dispatch({type: 'TOGGLE_SHOW_LOGIN', showLogin}),
      toggleMainShowLogin: (showMainLogIn) => dispatch({type: 'TOGGLE_MAIN_SHOW_LOGIN', showMainLogIn})
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MdButton);
