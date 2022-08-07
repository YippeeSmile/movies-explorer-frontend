import './Profile.css'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { useFormValidation } from '../../hooks/useForm'

const Profile = ({ onUpdateUser, onSignOut, profileMessage }) => {
  const location = useLocation()
  const currentUser = useContext(CurrentUserContext)
  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
  } = useFormValidation()

  const [profileMessageText, setProfileMessageText] = useState('')

  const handleChangeName = (e) => {
    console.log('e.target.value', e.target.value)
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
    ) {
      setIsValid(false)
      setErrors({
        errors: errors.name,
        [e.target.name]: 'Имя должно отличаться от текущего',
      })
    } else {
      handleChange(e)
    }
  }

  const handleChangeEmail = (e) => {
    if (e.target.value === currentUser.email) {
      setIsValid(false)
      setErrors({
        errors: errors.name,
        [e.target.name]: 'Email должен отличаться от текущего',
      })
    } else {
      handleChange(e)
    }
  }

  useEffect(() => {
    setProfileMessageText(profileMessage)
  }, [profileMessage])

  useEffect(() => {
    setProfileMessageText('')
  }, [location])

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser, setValues])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: values.name,
      email: values.email,
    })
  }

  useEffect(() => {
    setIsValid(false)
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [onUpdateUser])

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label htmlFor="name-input" className="auth__label profile__label">
            Имя
          </label>
          <input
            id="name-input"
            name="name"
            className="auth__input profile__input"
            type="text"
            value={values.name || ''}
            onChange={handleChangeName}
            minLength="2"
            maxLength="40"
            required
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
          />
          <span className="auth__input-error name-input-error">
            {errors.name || ''}
          </span>
          <label htmlFor="email-input" className="auth__label profile__label">
            E-mail
          </label>
          <input
            id="email-input"
            className="auth__input"
            type="text"
            name="email"
            required
            value={values.email || ''}
            onChange={handleChangeEmail}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            autoComplete="off"
          />
          <span className="auth__input-error email-input-error">
            {errors.email || ''}
          </span>
          <span className="profile__message-error">{profileMessageText}</span>
        </fieldset>
        <div className="profile__auth">
          <button
            type="submit"
            className="profile__auth-submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
          <p
            className="profile__signout-link"
            onClick={() => {
              onSignOut()
            }}
          >
            Выйти из аккаунта
          </p>
        </div>
      </form>
    </section>
  )
}

export default Profile
