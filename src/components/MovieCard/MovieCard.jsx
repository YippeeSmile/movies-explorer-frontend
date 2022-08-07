import './MovieCard.css'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Movies_URL } from '../../utils/constants'

export const MovieCard = ({
  movie,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
}) => {
  const durationMovie = `${Math.trunc(movie.duration / 60)}ч ${
    movie.duration % 60
  }м`

  const userSavedMovies = savedMovies.find((m) => m.movieId === movie.id)

  function onClickUrl(url) {
    return () => window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleSaveMovie() {
    if (!userSavedMovies) {
      onSaveMovie({
        country: movie.country || 'Нет',
        director: movie.director || 'Нет',
        duration: movie.duration || 0,
        year: movie.year || 'Нет',
        description: movie.description || 'Нет',
        image: `${Movies_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${Movies_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    } else {
      onDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0])
    }
  }

  const movieSaveButtonClassName = !userSavedMovies
    ? `movie-card__button`
    : `movie-card__button_saved-ok`

  function handleDeleteMovie() {
    onDeleteMovie(movie)
  }

  return (
    <li className="movie-card">
      <div className="movie-card__info">
        <h1 className="movie-card__title">{movie.nameRU}</h1>
        <span className="movie-card__duration">{durationMovie}</span>
      </div>
      <Switch>
        <Route path="/movies">
          <img
            className="movie-card__image"
            src={`${Movies_URL}${movie.image.url}`}
            alt={movie.nameRU}
            onClick={onClickUrl(`${movie.trailerLink}`)}
          />
        </Route>
      </Switch>
      <Switch>
        <Route path="/saved-movies">
          <img
            className="movie-card__image"
            src={movie.image}
            alt={movie.nameRU}
            onClick={onClickUrl(`${movie.trailerLink}`)}
          />
        </Route>
      </Switch>
      <Switch>
        <Route path="/movies">
          <input
            className={movieSaveButtonClassName}
            type="button"
            onClick={handleSaveMovie}
            name="button"
            value="Сохранить"
          />
        </Route>
      </Switch>
      <Switch>
        <Route path="/saved-movies">
          <button
            type="button"
            onClick={handleDeleteMovie}
            className="movie-card__button movie-card__delete-button"
          ></button>
        </Route>
      </Switch>
    </li>
  )
}

export default MovieCard
