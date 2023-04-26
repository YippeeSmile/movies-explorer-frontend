import './Header.css';
import React from 'react';
import logo from '../../images/logo_main.svg';
import { Route, Link, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({loggedIn}) => {


    return (
        <Switch>   
            <Route exact path="/">
                <header className='header'>
                    <Link to='/' className='header__logo-link'>
                        <img src={logo} alt='Логотип' className='header__logo' />
                    </Link>
                <Navigation loggedIn={loggedIn}/>
                </header>
            </Route>
            <Route exact path="/(profile|movies|saved-movies)">
            <header className='header'>
                    <Link to='/' className='header__logo-link'>
                        <img src={logo} alt='Логотип' className='header__logo' />
                    </Link>
                <Navigation loggedIn={loggedIn}/>
                </header>
            </Route>
       </Switch>
    )
}

export default Header;