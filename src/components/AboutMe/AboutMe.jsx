import './AboutMe.css';
import React from 'react';

const AboutMe = () => {

    return (
        <section className='about-me'>
        <h5 className='about-me__title' id='about-me'>Студент</h5>
            <div className='about-me__info'>
                <div className='about-me__info_text-content'>
                    <h6 className='about-me__info_title'>Виталий</h6>
                    <p className='about-me__info_subtitle'>Фронтенд-разработчик, 30 лет</p>
                    <p className='about-me__info_text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className='about-me__info_social'>
                        <p className='about-me__info_social-text'>Facebook</p>
                        <p className='about-me__info_social-text'>Github</p>
                    </div>
                </div>
            <div className='about-me__image'></div>
        </div>
        </section>
    )
}

export default AboutMe;