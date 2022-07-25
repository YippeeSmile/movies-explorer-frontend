import './MovieCard.css';
import React from 'react';


function MovieCard({movie}) {

    return (
        <section className='movie-card'>
            <div className='movie-card__info'>
                <h1 className='movie-card__title'>{movie.nameRU}</h1>
                <span className='movie-card__duration'>{movie.duration}</span>
            </div>
            <img className='movie-card__image' src={movie.image} alt={movie.name} />
            <button className='movie-card__button'>Сохранить</button>
        </section>
    )
}

export default MovieCard;