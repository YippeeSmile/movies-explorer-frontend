import './auth.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_main.svg';
import { useFormValidation } from '../../hooks/useForm';

const Login = ({ onLogin, loginError}) => {
   const {  values, errors, isValid, handleChange, resetForm } = useFormValidation();

   useEffect(() => {
    resetForm('', '', false);
   }, [resetForm]);

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin({ email: values.email, password: values.password});
      };
    
    return (
        <section className="auth">
            <Link to='/'><img className='auth__logo' src={logo} alt="лого" /></Link>
            <h1 className="auth__title">Рады видеть!</h1>
            <form className="auth__form" name="auth-form" onSubmit={handleLogin}>
                <fieldset className="auth__fieldset">
                <label htmlFor="email-input" className='auth__label'>E-mail</label>
                    <input id="email-input" 
                    className="auth__input"
                    type="email"
                    name="email"
                    required
                    value={values.email || ''}
                    onChange={handleChange}
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    autoComplete='off'/>
                    <span className='auth__input-error email-input-error'>{errors.email}</span>
                    <label htmlFor="password-input" className='auth__label'>Пароль</label>
                    <input
                    name="password"
                    className="auth__input"
                    type="password"
                    required 
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="8"
                    autoComplete='off'
                    />
                    <span className='auth__input-error password-input-error'>{errors.password}</span>
                </fieldset>
                <span className="auth__input-error">{loginError}</span>
            <button disabled={!isValid} className="auth__button auth__button_error" type="submit">Войти</button>
            </form>
            <div className="auth__signin">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/signup" className="auth__bottom-link">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;



