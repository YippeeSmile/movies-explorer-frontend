import './SearchForm.css';
import React from 'react';
import zoom from '../../images/zoom-icon.svg';
import FilterSearch from '../FilterSearch/FilterSearch';

const SearchForm = () => {

    return (
        <section className='search-form'>
            <form className='search-form__container'>
                <input type='text' className='search-form__input' placeholder='Фильм' minLength="2" required ></input>
                <button type='submit' className='search-form__button'><img src={zoom} alt='лупа' /></button>
            </form>
            <FilterSearch />
        </section>
    )
}

export default SearchForm;