import './Navigation.css';
import React, { useState} from 'react';
import { Link} from 'react-router-dom';
import burger from '../../images/burger__icon.svg';
import exit from '../../images/exit.svg';

function Navigation({loggedIn}) {
   const [isBurger, setISBurger] = useState(false);
    
    function openBurger() {
        setISBurger(true);
      };

      function closeBurger() {
        setISBurger(false);
      };

    return (
        <nav className='navigation'>
            {!loggedIn ? (
                <nav className='navigation__container_main'>
                    <Link to='/signup' className='navigation__main-container_sign'>
                        <p>Регистрация</p>
                    </Link>
                    <Link to='/signin' className='navigation__main-container_sign'>
                        <button className="navigation__main-container_button">Войти</button>
                    </Link>
                </nav>
           ) : (
            <>
                <nav className='navigation__container'>
                    <div className='navigation__items'>
                        <Link to='/movies' className='navigation__item' activeclassname="navigation__item_active">
                            Фильмы
                        </Link>
                        <Link to='/saved-movies' className='navigation__item' activeclassname="navigation__item_active">
                            Сохраненные фильмы
                        </Link>
                    </div>
                    <div className="navigation__account-container">
                        <Link to='/profile' className='navigation__account'>Аккаунт</Link>
                        <Link to='/profile' className='navigation__item'>
                            <div className='navigation__account-icon' />
                        </Link>
                    </div>
                </nav>
                
                <div className={`navigation__burger ${isBurger ? "navigation__burger_active" : ""} `}>
                    <div className={`navigation__burger-container ${isBurger ? "navigation__burger-container_active" : ""} `}>
                    <button type="button" className='navigation__exit-button' onClick={closeBurger}>
                        <img src={exit} alt="кнопка крестик" className='navigation__exit-button-icon'/></button>
                <div className="navigation__burger-items">
                <Link to='/' className="navigation__burger-item">Главная</Link>
                <Link to='/movies' className="navigation__burger-item" activeclassname="navigation__item_active">Фильмы</Link> 
                <Link to='/saved-movies' className="navigation__burger-item" activeclassname="navigation__item_active">Сохраненные фильмы</Link>
              </div>
              <div className="navigation__burger-account-container"> 
                <Link to='/profile' className="navigation__burger-account">Аккаунт</Link>
                <Link to='/profile' className="navigation__burger-account-icon">
                <div className='navigation__account-icon' />
                </Link>
              </div>  
            </div>
          </div>
          <button type="button" className='navigation__burger-btn' onClick={openBurger}>
                <img className='navigation__burger_icon' src={burger} alt="бургер меню" /></button>
                </>
           )}
        </nav>
    )
}

export default Navigation;