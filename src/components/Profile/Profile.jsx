import './Profile.css';
import React from 'react';

const Profile = () => {

    return (
        <section className='profile'>
            <h2 className='profile__title'>Привет, user.name!</h2>
            <form className='profile__form'>
            <fieldset className="auth__fieldset">
                <label htmlFor="email-input" className='auth__label profile__label'>E-mail</label>
                    <input id="email-input" className="auth__input profile__input" type="email" />
                    <span className='auth__input-error email-input-error'></span>
                    <label htmlFor="password-input" className='auth__label profile__label'>Пароль</label>
                    <input className="auth__input profile__input" type="password" />
                    <span className='auth__input-error password-input-error'></span>
                </fieldset>
            </form>
            <div className="profile__auth">
                <p className='profile__auth-submit'>Редактировать</p>
                <p className="profile__signout-link">Выйти из аккаунта</p>
            </div>
        </section>
    )
}

export default Profile;