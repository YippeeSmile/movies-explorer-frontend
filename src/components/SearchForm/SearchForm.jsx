import './SearchForm.css';
import React from 'react';
import zoom from '../../images/zoom-icon-btn.svg';
import FilterSearch from '../FilterSearch/FilterSearch';

const SearchForm = () => {

    return (
        <section className='search-form'>
            <form className='search-form__container'>
                <div className='search-form__container_left-column'>
                <input type='text' className='search-form__input' placeholder='Фильм' minLength="2" required ></input>
                <button type='submit' className='search-form__button'><img src={zoom} className='search-form__icon-button' alt='увеличительная лупа' /></button>
                </div>
                <FilterSearch />
            </form>
        </section>
    )
}

export default SearchForm;