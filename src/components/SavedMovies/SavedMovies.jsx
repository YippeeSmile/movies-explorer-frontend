import './SavedMovies.css';
import React, { useEffect, useState} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import filterMovies from '../../hooks/FilterMovies'

function SavedMovies({savedMovies, onDeleteMovie}) {
  const [preloader, setPreloader] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);

  function handleSearchSavedMovie(request, checkboxStatus) {
    launchPreloader();
    
    const searchResult = filterMovies(savedMovies, request, checkboxStatus);
    setFilteredSavedMovies(searchResult);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);
    setIsSearchDone(true);
  }

  function launchPreloader() {
    setPreloader(true);
    setTimeout(() => setPreloader(false), 700);
  }

  useEffect(() => {
    if (filteredSavedMovies.length > 0) {
      const searchResult = filterMovies(savedMovies, request, checkboxStatus);
      setFilteredSavedMovies(searchResult);
    }
  }, [savedMovies]);

    return (
      <section className="saved-movies">
        <SearchForm onSearch={handleSearchSavedMovie}/>
        {preloader
        ? <div className="saved-movies__preloader-container">
            <Preloader /> 
          </div>
        : isSearchDone
          ? filteredSavedMovies.length > 0
            ? <MoviesCardList 
              movies={filteredSavedMovies}
              savedMovies={savedMovies}
              onDeleteMovie={onDeleteMovie} /> : (
                <span className="saved-movies__error">Ничего не найдено</span>
            )
          : (
            <MoviesCardList 
                movies={savedMovies}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
              />
            )
      }
      </section>
    )
  }
  
  export default SavedMovies;