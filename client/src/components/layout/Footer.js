import React from 'react';
import instagramicon from './instagramicon.svg';
import twittericon from './twittericon.svg';
import facebookicon from './facebookicon.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-cols'>
        <li>CONTACT</li>
        <li>
          +46 072 515 16 03
          <br />
          <button className='btn-footer'>gemigpost@hotmail.com</button>
        </li>
        <li></li>
        <li>SERVICES</li>
        <li>
          <button className='btn-footer'>Guide</button>
          <br />
          <button className='btn-footer'>FAQ</button>
        </li>
        <li></li>

        <li>INFORMATION</li>
        <li>
          <Link to='/about' className='btn-footer'>
            About
          </Link>

          <br />
          <button className='btn-footer'>Work with me</button>
          <br />
          <button className='btn-footer'>Policy privacy</button>
          <br />
          <button className='btn-footer'>Terms & Conditions</button>
          <br />
          <button className='btn-footer'>Press Enquires</button>
        </li>
        <li></li>
        <li>
          <a href='https://www.instagram.com/leomessi/' className='btn-footer'>
            <img src={instagramicon} alt='img' className='footericons' />
          </a>

          {'     '}
          <a href='https://twitter.com/imessi' className='btn-footer'>
            <img src={twittericon} alt='img' className='footericons' />
          </a>
          <a href='https://www.facebook.com/leomessi/' className='btn-footer'>
            <img src={facebookicon} alt='img' className='footericons' />
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
