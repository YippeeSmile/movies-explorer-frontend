import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({
    onSearch,
    preloader,
    isSearchDone,
    searchStatus,
    renderedMovies,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    moreButtonVisibility,
    onRenderMovies
}) => {

    return (
        <section className='movies'>
            <SearchForm 
            onSearch={onSearch}
            />
            {preloader 
        ? <div className="movies__preloader-container">
            <Preloader /> 
          </div>
        : isSearchDone
          ? renderedMovies.length > 0
            ? <MoviesCardList 
              movies={renderedMovies}
              savedMovies={savedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              preloader={preloader}
              isSearchDone={isSearchDone}
              onRenderMovies={onRenderMovies}
              moreButtonVisibility={moreButtonVisibility}
            />: (!preloader ?
                <div className="movies__span">
                  <span className="movies__span-item">Ничего не найдено</span>
                </div>
                :
                <div className="movies__span"> 
                  <span className="movies__span-item">{searchStatus}</span>
                </div>
              )
            : ("")
          }
        </section>
    )
}

export default Movies;