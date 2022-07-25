import './Navigation.css';
import React from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import account from '../../images/icon__account.svg';
import burger from '../../images/burger__icon.svg';
import exit from '../../images/exit.svg';

const Navigation = () => {

    return (
        <nav className='navigation'>
            <Route exact path='/'>
                <nav className='navigation__container'>
                    <Link to='/signup' className='navigation__main-container_sign'>
                        <p>Регистрация</p>
                    </Link>
                    <Link to='/signin' className='navigation__main-container_sign'>
                        <button className="navigation__main-container_button">Войти</button>
                    </Link>
                </nav>
            </Route>

            <Route path='/(profile|movies|saved-movies)'>
                <nav className='navigation__container'>
                    <div className='navigation__items'>
                        <NavLink to='/movies' className='navigation__item' activeClassName="navigation__item_active">
                            Фильмы
                        </NavLink>
                        <NavLink to='/saved-movies' className='navigation__item' activeClassName="navigation__item_active">
                            Сохраненные фильмы
                        </NavLink>
                    </div>
                    <div className="navigation__account-container">
                        <Link to='/profile' className='navigation__account'>Аккаунт</Link>
                        <Link to='/profile' className='navigation__account-icon'>
                            <img src={account} alt="иконка аккаунт" />
                        </Link>
                    </div>
                </nav>

                <div className='navigation__burger'>
                    <img className='navigation__burger_icon' src={burger} alt="раскрывающиеся меню" />
                    <img className='navigation__exit-button' src={exit} alt="крестик"></img>
                <nav className="navigation__mobile-container">
              <div className="navigation__items">
                <Link to='/' className="navigation__item">Главная</Link>
                <NavLink to='/movies' className="navigation__item" activeClassName="navigation__item_active">Фильмы</NavLink> 
                <NavLink to='/saved-movies' className="navigation__item" activeClassName="navigation__item_active">Сохраненные фильмы</NavLink>
              </div>
              <div className="navigation__account-container"> 
                <Link to='/profile' className="navigation__account">Аккаунт</Link>
                <Link to='/profile' className="navigation__account-icon">
                    <img src={account} alt="иконка аккаунт" />
                </Link>
              </div>  
            </nav>
          </div>

            </Route>
        </nav>
    )
}

export default Navigation;