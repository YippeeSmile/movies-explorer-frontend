import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className='footer'>
           <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <ul className='footer__copy-link_items'>
                <li className='footer__copy-link_copy'>&copy;{new Date().getFullYear()}</li>
                <ul className='footer__copy-link_items-right'>
                    <li className='footer__copy-link_copy'>Яндекс.Практикум</li>
                    <li className='footer__copy-link_copy'><a href="https://github.com/YippeeSmile" className='footer__copy-link_link'>Github</a></li>
                    <li className='footer__copy-link_copy'><Link to="" className='footer__copy-link_link'>Facebook</Link></li>
                </ul>
            </ul>
        </footer>
    )
}

export default Footer;