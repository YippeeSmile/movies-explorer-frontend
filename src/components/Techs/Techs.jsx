import './Techs.css';
import React from 'react';

const Techs = () => {

    return (

        <section className='techs'>
            <h3 className='techs__title' id="techs">Технологии</h3>
            <div className='techs__content'>
                <h4 className='techs__content_title'>7 технологий</h4>
                <p className='techs__content_text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
                <ul className='techs__buttons_list'>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>HTML</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>CSS</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>JS</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>React</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>Git</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>Express.js</span>
                    </button></li>
                    <li><button type="button" className='techs__button'>
                        <span className='techs__button_text'>mongoDB</span>
                    </button></li>
                </ul>
        </section>
    )
}

export default Techs;