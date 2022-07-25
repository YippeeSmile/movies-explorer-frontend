import './AboutProjects.css';
import React from 'react';

const AboutProjects = () => {

    return (
      <section className='about-projects'>
        <h2 className='about-projects__title' id="about">О проекте</h2>
        <div className='about-projects__content'>
            <div className='about-projects__content_first-column'>
            <p className='about-projects__subtitle'>Дипломный проект включал 5 этапов</p>
            <p className='about-projects__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div>
            <p className='about-projects__subtitle'>На выполнение диплома ушло 5 недель</p>
            <p className='about-projects__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className='about-projects__timeline'>
            <div className='about-projects__line about-projects__line_green'>1 неделя</div>
            <div className='about-projects__line about-projects__line_grey'>4 недели</div>
            <div className='about-projects__line'>Back-end</div>
            <div className='about-projects__line'>Front-end</div>
        </div>

        
      </section>
)
}

export default AboutProjects;