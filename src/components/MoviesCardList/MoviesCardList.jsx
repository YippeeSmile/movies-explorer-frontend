import './MoviesCardList.css';
import React from 'react';
import movies from '../../utils/moviesList';
import MovieCard from '../MovieCard/MovieCard';

const MoviesCardList = () => {

    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__items'>
                {
                    movies.map(movie => (
                        <MovieCard
                        movie={movie}
                        key={movie._id || movie.id}
                        />
                    ))
                }
            </ul>
            <button type="button" className='movies-card-list__button'>Ещё</button>
        </section>
    )
}

export default MoviesCardList;