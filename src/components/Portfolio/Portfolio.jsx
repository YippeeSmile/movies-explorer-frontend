import './Portfolio.css';
import React from 'react';
import arrow from '../../images/mainarrow.svg'; 

const Portfolio = () => {

    return (
        <section className='portfolio'>
            <h8 className='portfolio__subtitle'>Портфолио</h8>
            
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'><a href='https://yippeesmile.github.io/how-to-learn' target="_blank" rel="noopener noreferrer" className='portfolio__link'>Статичный сайт</a></p>
                    <img src={arrow} alt='стрелка' className='portfolio__arrow-icon'></img>
                </div>
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'><a href='https://yippeesmile.github.io/russian-travel/index.html' target="_blank" rel="noopener noreferrer" className='portfolio__link'>Адаптивный сайт</a></p>
                    <img src={arrow} alt='стрелка' className='portfolio__arrow-icon'></img>
                </div>
                <div className='portfolio__web'>
                    <p className='portfolio__web_text'>Одностраничное приложение</p>
                    <img src={arrow} alt='стрелка' className='portfolio__arrow-icon'></img>
                </div>
        </section>
    )
}

export default Portfolio;