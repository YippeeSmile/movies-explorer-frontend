import './NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <section className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <p className='not-found__text'>Страница не найдена</p>
            <Link to='/'><p className='not-found__link'>Назад</p></Link>
        </section>
    )
}

export default NotFound;