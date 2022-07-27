import './Portfolio.css';
import React from 'react';
import arrow from '../../images/mainarrow.svg'; 

const Portfolio = () => {

    return (
        <section className='portfolio'>
            <h7 className='portfolio__subtitle'>Портфолио</h7>
                <ul className='portfolio__web-list'>
                    <li className='portfolio__web'>
                        <a href='https://yippeesmile.github.io/how-to-learn' target="_blank" rel="noopener noreferrer" className='portfolio__link'>Статичный сайт</a>
                    </li>
                    <li className='portfolio__web'>
                        <a href='https://yippeesmile.github.io/russian-travel/index.html' target="_blank" rel="noopener noreferrer" className='portfolio__link'>Адаптивный сайт</a>
                    </li>
                    <li className='portfolio__web'>
                        <a href='https://github.com/YippeeSmile/react-mesto-api-full' target="_blank" rel="noopener noreferrer" className='portfolio__link'>Одностраничное приложение</a>
                    </li>
                </ul>
        </section>
    )
}

export default Portfolio;