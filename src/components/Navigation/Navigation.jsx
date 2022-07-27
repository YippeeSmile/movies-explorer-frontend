import './Navigation.css';
import React, { useState} from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import account from '../../images/icon__account.svg';
import burger from '../../images/burger__icon.svg';
import exit from '../../images/exit.svg';

const Navigation = () => {
   const [open, setOpen] = useState(false);
    
    const openBurger = () => {
        setOpen(true);
      };

      const closeBurger = () => {
        setOpen(false);
      };

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
                <button className='navigation__burger-btn' onClick={openBurger}>
                <img className='navigation__burger_icon' src={burger} alt="бургер меню" /></button>
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
                <div className={`${open} ? 'navigation__burger' : '' `}>
                    <div className='navigation__burger-container'>
                    <button type="button" className='navigation__exit-button' onClick={closeBurger}>
                        <img src={exit} alt="кнопка крестик" className='navigation__exit-button-icon'/></button>
                <div className="navigation__burger-items">
                <Link to='/' className="navigation__burger-item">Главная</Link>
                <NavLink to='/movies' className="navigation__burger-item" activeClassName="navigation__item_active">Фильмы</NavLink> 
                <NavLink to='/saved-movies' className="navigation__burger-item" activeClassName="navigation__item_active">Сохраненные фильмы</NavLink>
              </div>
              <div className="navigation__burger-account-container"> 
                <Link to='/profile' className="navigation__burger-account">Аккаунт</Link>
                <Link to='/profile' className="navigation__burger-account-icon">
                    <img src={account} alt="иконка аккаунт" />
                </Link>
              </div>  
            </div>
          </div>

            </Route>  
        </nav>
    )
}

export default Navigation;