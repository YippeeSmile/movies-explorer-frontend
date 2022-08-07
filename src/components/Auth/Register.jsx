import './auth.css';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_main.svg';

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name, email, password });
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }


    return (
        <section className="auth">
            <Link to='/'><img className='auth__logo' src={logo} alt="лого" /></Link>
            <h1 className="auth__title">Добро пожаловать</h1>
            <form className="auth__form" name="auth-form" onSubmit={handleSubmit}>
                <fieldset className="auth__fieldset">
                    <label htmlFor="name-input" className='auth__label'>Имя</label>
                    <input id="name-input" className="auth__input" type="name" minLength="2" maxLength="40" 
                    required value={name || ''} onChange={handleNameChange}></input>
                    <span className='auth__input-error name-input-error'></span>
                    <label htmlFor="email-input" className='auth__label'>E-mail</label>
                    <input id="email-input" className="auth__input" type="email" 
                    required value={email || ''} onChange={handleEmailChange}/>
                    <span className='auth__input-error email-input-error'></span>
                    <label htmlFor="password-input" className='auth__label'>Пароль</label>
                    <input className="auth__input" type="password" 
                    required value={password || ''} onChange={handlePasswordChange}/>
                    <span className='auth__input-error password-input-error'></span>
                </fieldset>
            <button className="auth__button" type="submit">Зарегистрироваться</button>
            </form>
            <div className="auth__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="auth__bottom-link">Войти</Link>
            </div>
        </section>
    )
}

export default Register;



