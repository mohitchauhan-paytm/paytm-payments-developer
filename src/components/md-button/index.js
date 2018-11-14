import React, { Component } from "react";
import {connect} from 'react-redux';

class MdButton extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = () => {
        if (!this.props.state.loggedIn) {
            this.addHasModalClass();
            if (!this.props.state.showMainLogIn) {
                this.props.toggleMainShowLogin(true);
                this.props.toggleShowLogin(true);
            }
            this.props.toggleShowLogin(true);
        } else {

            this.props.toggleShowLoggedInPopup(true);
            setTimeout(() => {
                this.props.toggleShowLoggedInPopup(false)
            }, 3000);
        }

    }

    addHasModalClass() {
        document.getElementsByTagName('body')[0].classList.add('has-modal');
    }
    

    render() {
        return(<a href="javascript:void(0)" onClick={this.handleChange}>{this.props.text}</a>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleShowLogin: (showLogin) => dispatch({type: 'TOGGLE_SHOW_LOGIN', showLogin}),
      toggleMainShowLogin: (showMainLogIn) => dispatch({type: 'TOGGLE_MAIN_SHOW_LOGIN', showMainLogIn}),
      toggleShowLoggedInPopup: (showLoggedIn) => dispatch({type: 'TOGGLE_SHOW_LOGGEDIN_POPUP', showLoggedIn})
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MdButton);
