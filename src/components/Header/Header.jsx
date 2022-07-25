import './Header.css';
import React from 'react';
import logo from '../../images/logo_main.svg';
import { Route, Link, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = () => {


    return (
        <Switch>   
            <Route exact path="/">
                <header className='header'>
                    <Link to='/' className='header__logo-link'>
                        <img src={logo} alt='Логотип зеленый' className='header__logo' />
                    </Link>
                <Navigation />
                </header>
            </Route>
            <Route exact path="/(profile|movies|saved-movies)">
            <header className='header'>
                    <Link to='/' className='header__logo-link'>
                        <img src={logo} alt='Логотип зеленый' className='header__logo' />
                    </Link>
                <Navigation />
                </header>
            </Route>
       </Switch>
    )
}

export default Header;