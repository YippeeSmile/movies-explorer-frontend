import './MoviesCardList.css'
import React from 'react'
import MovieCard from '../MovieCard/MovieCard'

const MoviesCardList = ({
  movies,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  preloader,
  isSearchDone,
  renderMoreMovies,
  getMoreMoviesButton,
}) => {
  const getMoreMoviesButtonClassName = getMoreMoviesButton
    ? `movies-card-list__button`
    : `movies-card-list__button_hidden`

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie._id || movie.id}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </ul>
      {!preloader ? (
        isSearchDone ? (
          <div className="movies-list__btn-section">
            <button
              onClick={renderMoreMovies}
              className={getMoreMoviesButtonClassName}
              type="button"
            >
              Ещё
            </button>
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </section>
  )
}

export default MoviesCardList
