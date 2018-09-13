import * as style from './style.module.scss';
import React from "react";

const Footer = () => (
	<footer className={`${style.footer}`}>
		<div className={`grid justify-end`}>
			<div className={`${style.subFooterWrap} ${style.lightBg} grid justify-between`}>
				<div className={`${style.subFooterBox}`} >
					<h6>Discussion Forum <a target="_blank" href="http://paywithpaytm.com/developer/discussion/"><img src='/assets/ic-launch.svg' /></a></h6>
					<p>Paytm’s developer-centric community to resolve technical issue faced while integration</p>
				</div>
				<div className={`${style.subFooterBox}`} >
					<h6 >FAQs <a target="_blank" href="https://developer.paytm.com/support/faq"><img src='/assets/ic-launch.svg' /></a></h6>
					<p>Get Answers to most common questions around integration Paytm</p>
				</div>
				<div className={`${style.subFooterBox}`} >
					<h6>Contact Us</h6>
					<p>In case of any queries, reach us</p>
					<p><a href="mailto:devsupport@paytm.com">devsupport@paytm.com</a></p>
					<p><a className={`grid align-center`} target="_blank" href="https://github.com/Paytm-Payments/paytm-payments-developer">GitHub<img src='/assets/ic-launch.svg' width="18"/></a></p>
				</div>
			</div>
		</div>
		<div className={`${style.footerBottom} max-wrap grid align-center justify-between h100`}>
			<ul className={`${style.footerList} grid`}>
				<li>
					<a href="https://paytm.com/about-us/our-policies/" target="_blank">Terms of Service</a>
				</li>
				<li>
					<a href="https://paytm.com/about-us/our-policies/" target="_blank">Privacy Policy</a>
				</li>
			</ul>
			<div className={`${style.copyright}`}>
				© 2018, One97 Communications Pvt. Ltd
			</div>
		</div>
	</footer>
);

export default Footer;
