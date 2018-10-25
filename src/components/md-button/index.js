import React, { Component } from "react";
import {connect} from 'react-redux';

class MdButton extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = () =>  {
        this.addHasModalClass();
        if(!this.props.state.showMainLogIn) {
            this.props.toggleMainShowLogin(true);
            this.props.toggleShowLogin(true);
        }
        this.props.toggleShowLogin(true);
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
      toggleMainShowLogin: (showMainLogIn) => dispatch({type: 'TOGGLE_MAIN_SHOW_LOGIN', showMainLogIn})
    }
}

const mapStateToProps = (state) => {
    return {
      state: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MdButton);
