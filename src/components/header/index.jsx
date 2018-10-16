import React, { Component } from "react";
import { Logodeveloper } from "../svgsprite";
import { connect } from 'react-redux';
import * as style from './style.module.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandMenu: false,
      showLogin: false,
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = () => {
    if(!this.props.state.showMainLogIn) {
      this.props.toggleMainShowLogin(true);
      this.props.toggleShowLogin(true);
   }
    this.props.toggleShowLogin(true);
  }

  hideLogin = () => {
    this.props.toggleShowLogin(false);
  }

  componentDidMount() {
    window.addEventListener("message", this.handleFrameTasks);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleFrameTasks);
  }

  handleFrameTasks = (e) => {
    if (e.data.result == 'success') {
      this.props.toggleMainShowLogin(false);
      this.props.setLoginData(
        false,
        true,
        e.data.user,
        e.data.user.fname ? e.data.user.fname.split('')[0] + e.data.user.lname.split('')[0] : e.data.user.uname.split('')[0].toUpperCase()
      );
    }
  }

  render() {

    return (
      <header className={`${style.header}`}>
        <div className={`max-wrap grid justify-between align-center h100 desktop`}>
          <div className={`grid-inline`}>
            <a className={`${style.logoDesk} grid justify-center align-center`} href='/docs'>
              <Logodeveloper /> <span>DEVELOPERS</span>
            </a>
            {/* <form className={`header-form`}>
              <input type="text" className={`${style.headerMainSearch}`} placeholder='Search' />
              <button className={`${style.searchBtn}`}><img src='assets/ic-search.svg' alt=''/></button>
            </form> */}
          </div>
          {/* <p>{props.context.fname}</p> */}
          <nav className={`grid align-center ${style.headerNavDesk}`}>
            <ul className={`grid-inline justify-start justify-between ${style.headerMenuDesk}`}>
              <li className={`${style.navlistDesk}`}>
                {/* <a href='javascript:void(0);'>Products</a> */}
                <a href='#' className={` ${style.navlistdroparrow} p-rel`}>Products</a>
                <ul className={`${style.headDropDown}`}>
                  <li>
                    <a target="_blank" href="https://business.paytm.com/payment-gateway" className={`${style.headDropDownLink} grid-inline align-center`}>
                      <img src="/assets/head-on-app.svg" alt=" " />
                      <div className={`${style.headDropDownContent}`}>
                        <label>On App/Website</label>
                        <p>Deep integration on your platform</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://business.paytm.com/retail" className={`${style.headDropDownLink} grid-inline align-center`}>
                      <img src="/assets/head-mobile-pay.svg" alt=" " />
                      <div className={`${style.headDropDownContent}`}>
                        <label>In your Store</label>
                        <p>QR code payments</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://business.paytm.com/payment-link" className={`${style.headDropDownLink} grid-inline align-center`}>

                      <img src="/assets/head-pay-link.svg" alt=" " />
                      <div className={`${style.headDropDownContent}`}>
                        <label>Payment Link</label>
                        <p>On SMS/Chat/Email</p>
                      </div>
                    </a>
                  </li>
                </ul>

              </li>
              <li className={`${style.navlistDesk}`}><a target="_blank" href='https://business.paytm.com/pricing'>Pricing</a></li>
              <li className={`${style.navlistDesk}`}><a target="_blank" href='https://business.paytm.com/support'>Support</a></li>
            </ul>
            {
              !this.props.state.loggedIn ?

                <div className={`grid-inline`}>
                  <button id="signInButton" className={`${style.whiteBtn} btn btn-primary small grid align-center`} onClick={this.handleChange}>Login or Create Account</button>
                </div> : null
            }
            {
              this.props.state.loggedIn ?

                <div className={`grid-inline`}>
                  <a className={`${style.whiteBtn} btn btn-primary small grid align-center`} href="https://dashboard.paytm.com/next/" target="_blank">My Dashboard</a>
                </div> : null
            }
          </nav>
        </div>
        {
          this.props.state.showMainLogIn ? 
        <div className={`popupWrapper  ${(this.props.state.showLogin ? ' fadeIn' : '')}`}>
          <div className="popup pos-abs iframeOpen">
            <div className="popup-wrapper pos-rel">
              <span className="closePopup" onClick={this.hideLogin}><img src="/assets/ic-clear.svg" /></span>
              <div className="popup-content">
                <iframe id="oAuth" className="popup-iframe hidden" src="https://dashboard.paytm.com/developer-login" title="oAuth"></iframe>
              </div>
            </div>
          </div>
        </div>: null
        }


        {/* <Overlay show={expandMenu} showDropdownMethod={this.showDropdownMethod} /> */}
        {/* <PopupTypeFirst show={activeOverlay === 'filter'}>
          <div className="p16">
            <h2>Filters</h2>
            <div>
              <Select
                options={RefundFilterOptions}
                showLabel={true}
                addClasses='header-select'
                showSearch={true}
              />
              <Select
                options={RefundFilterOptions}
                showLabel={true}
                addClasses='header-select'
                showSearch={true}
              />
              <Select
                options={RefundFilterOptions}
                showLabel={true}
                addClasses='header-select'
                showSearch={true}
              />
            </div>
          </div>
        </PopupTypeFirst> */}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowLogin: (showLogin) => dispatch({ type: 'TOGGLE_SHOW_LOGIN', showLogin }),
    setLoginData: (showLogin, loggedIn, user, userText, showMainLogIn) => dispatch({ type: 'SET_LOGIN_DATA', showLogin, loggedIn, user, userText, showMainLogIn }),
    toggleMainShowLogin: (showMainLogIn) => dispatch({type: 'TOGGLE_MAIN_SHOW_LOGIN', showMainLogIn})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);