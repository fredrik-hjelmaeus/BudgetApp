import React from "react";
import { Link } from "react-router-dom";
import FacebookIconSVG from "./images/facebookicon"; // TODO: converted to SVG and styles may not work
import TwitterIconSVG from "./images/twittericon"; // TODO: converted to SVG and styles may not work
import InstagramIconSVG from "./images/instagramicon"; // TODO: converted to SVG and styles may not work

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__cols">
        <li className="footer__contact">CONTACT</li>
        <li>
          <button className="footer__contact_btn">+46 072 515 16 03</button>
          <br />
          <button className="footer__contact_btn">gemigpost@hotmail.com</button>
        </li>
        <li></li>
        <li className="footer__service">SERVICES</li>
        <li>
          <button className="footer__service_btn">Guide</button>
          <br />
          <button className="footer__service_btn">FAQ</button>
        </li>
        <li></li>

        <li className="footer__information">INFORMATION</li>
        <li>
          <Link to="/about" className="footer__information_btn">
            About
          </Link>

          <br />
          <button className="footer__information_btn">Work with me</button>
          <br />
          <button className="footer__information_btn">Policy privacy</button>
          <br />
          <button className="footer__information_btn">Terms & Conditions</button>
          <br />
          <button className="footer__information_btn">Press Enquires</button>
        </li>
        <li></li>
        <li className="footer__links">
          <a href="https://www.instagram.com/leomessi/" className="footer__links_btn">
            <div className="footericons">
              <InstagramIconSVG size="24" />
            </div>
            {/* <img src={instagramicon} alt="img" className="footericons" /> */}
          </a>

          {"     "}
          <a href="https://twitter.com/imessi" className="footer__links_btn">
            <div className="footericons">
              <TwitterIconSVG size="24" />
            </div>
            {/*   <img src={twittericon} alt="img" className="footericons" /> */}
          </a>
          <a href="https://www.facebook.com/leomessi/" className="footer__links_btn">
            <div className="footericons">
              <FacebookIconSVG size="24" />
            </div>
            {/*  <img src={facebookicon} alt="img" className="footericons" /> */}
          </a>
        </li>
        <li></li>
        <li></li>

        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <li></li>
        <li></li>
      </div>
    </footer>
  );
};

export default Footer;
