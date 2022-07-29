import './NavTab.css';
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavTab = ()  => {

    return (
      <nav className='navtab'>
        <ul className='navtab__list'>
            <li><button className='navtab__button'>
                <span className='navtab__text-button'>
                    <HashLink to='/#about' className='navtab__link'>О проекте</HashLink></span>
                </button>
            </li>
            <li>
                <button className='navtab__button'>
                    <span className='navtab__text-button'>
                        <HashLink to='/#techs' className='navtab__link'>Технологии</HashLink></span>
                </button>
            </li>
            <li>
                <button className='navtab__button'>
                    <span className='navtab__text-button'>
                    <HashLink to='/#about-me' className='navtab__link'>Студент</HashLink></span>
                </button>
            </li>
        </ul>
      </nav>
)
}

export default NavTab;