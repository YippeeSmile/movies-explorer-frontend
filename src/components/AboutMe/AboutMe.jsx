import './AboutMe.css';
import React from 'react';
import myphoto from '../../images/my-photo.jpg';
const AboutMe = () => {

    return (
        <section className='about-me'>
        <h5 className='about-me__title' id='about-me'>Студент</h5>
            <div className='about-me__info'>
                <div className='about-me__info_text-content'>
                    <h6 className='about-me__info_title'>Юлия</h6>
                    <p className='about-me__info_subtitle'>Фронтенд-разработчик, 33 лет</p>
                    <p className='about-me__info_text'>Я родилась и живу в Москве, работала интернет-маркетологом. На прошлых работах приходилось часто сталкиваться с веб-разработкой. Решила пройти обучение в Яндекс Практикуме и сменить работу. После диплома планирую активно искать работу. У меня есть муж
и сын, собака и кот. Я люблю слушать музыку, бегать на соревнованиях, путешествовать и активный образ жизни.</p>
                    <div className='about-me__info_social'>
                        <p className='about-me__info_social-text'>Facebook</p>
                        <p className='about-me__info_social-text'><a href="https://github.com/YippeeSmile" className='footer__copy-link_link'>Github</a></p>
                    </div>
                </div>
            <img src={myphoto} className='about-me__image' alt="фото" />
        </div>
        </section>
    )
}

export default AboutMe;