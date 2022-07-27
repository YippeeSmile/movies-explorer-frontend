import './SearchForm.css';
import React from 'react';
import zoom from '../../images/zoom-icon.svg';
import FilterSearch from '../FilterSearch/FilterSearch';

const SearchForm = () => {

    return (
        <section className='search-form'>
            <form className='search-form__container'>
                <input type='text' className='search-form__input' placeholder='Фильм' minLength="2" required ></input>
                <button type='submit' className='search-form__button'><img src={zoom} className='search-form__icon-button' alt='лупа' /></button>
                <FilterSearch />
            </form>
        </section>
    )
}

export default SearchForm;