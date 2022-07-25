import './auth.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_main.svg';

const Login = () => {

    return (
        <section className="auth">
            <Link to='/'><img className='header__logo' src={logo} alt="лого" /></Link>
            <h1 className="auth__title">Рады видеть!</h1>
            <form className="auth__form" name="auth-form">
                <fieldset className="auth__fieldset">
                <label htmlFor="email-input" className='auth__label'>E-mail</label>
                    <input id="email-input" className="auth__input" type="email" />
                    <span className='auth__input-error email-input-error'></span>
                    <label htmlFor="password-input" className='auth__label'>Пароль</label>
                    <input className="auth__input" type="password" />
                    <span className='auth__input-error password-input-error'></span>
                </fieldset>
            <button className="auth__button" type="submit">Войти</button>
            </form>
            <div className="auth__signin">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/signup" className="auth__bottom-link">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;



