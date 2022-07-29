import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = () => {

    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    )
}

export default Movies;