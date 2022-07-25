import './Portfolio.css';
import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/mainarrow.svg'; 

const Portfolio = () => {

    return (
        <section className='portfolio'>
            <h8 className='portfolio__subtitle'>Портфолио</h8>
            <Link to='https://yippeesmile.github.io/how-to-learn' className='portfolio__link'>
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'>Статичный сайт</p>
                    <img src={arrow} alt='стрелка'></img>
                </div>
            </Link>
            <Link to='https://yippeesmile.github.io/russian-travel/index.html' className='portfolio__link'>
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'>Адаптивный сайт</p>
                    <img src={arrow} alt='стрелка'></img>
                </div>
            </Link>
            <Link to='' className='portfolio__link'>
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'>Одностраничное приложение</p>
                    <img src={arrow} alt='стрелка'></img>
                </div>
            </Link>
        </section>
    )
}

export default Portfolio;