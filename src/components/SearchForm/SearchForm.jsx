import './SearchForm.css'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import zoom from '../../images/zoom-icon-btn.svg'
import FilterSearch from '../FilterSearch/FilterSearch'
import { useFormValidation } from '../../hooks/useForm'

const SearchForm = ({ onSearch }) => {
  const { handleChange, isValid } = useFormValidation()

  const [request, setRequest] = useState('')
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const location = useLocation()

  useEffect(() => {
    const disabled = !isValid
    setDisabled(disabled)
  }, [isValid])

  useEffect(() => {
    if (location.pathname === '/movies') {
      const checkbox = localStorage.getItem('checkboxStatus')
      const search = localStorage.getItem('request')

      if (search) {
        setRequest(search)
        setDisabled(!disabled)
      }
      if (JSON.parse(checkbox) === true) {
        setCheckboxStatus(true)
      } else {
        setCheckboxStatus(false)
      }
    }
  }, [location.pathname])

  function handleChangeRequest(e) {
    handleChange(e)
    setRequest(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(request, checkboxStatus)
  }

  function toggleCheckbox(checkboxStatus) {
    setCheckboxStatus(checkboxStatus)
    onSearch(request, checkboxStatus)
  }

  function handleChangeCheckbox(e) {
    toggleCheckbox(e.target.checked)
  }

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <div className="search-form__container_left-column">
          <input
            name="request"
            type="text"
            value={request || ''}
            className="search-form__input"
            onChange={handleChangeRequest}
            placeholder="Фильм"
            minLength="2"
            required
          ></input>
          <button
            type="submit"
            className="search-form__button"
            disabled={disabled}
          >
            <img
              src={zoom}
              className="search-form__icon-button"
              alt="увеличительная лупа"
            />
          </button>
        </div>
        <FilterSearch
          checkboxStatus={checkboxStatus}
          onChangeCheckbox={handleChangeCheckbox}
        />
      </form>
    </section>
  )
}

export default SearchForm
