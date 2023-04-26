import React from 'react';
import Promo from '../Promo/Promo';
import AboutProjects from '../AboutProjects/AboutProjects';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = () => {

    return (
       <div className="main">
       <Promo />
       <AboutProjects />
       <Techs />
       <AboutMe />
       <Portfolio />
       </div>
    )
};

export default Main;