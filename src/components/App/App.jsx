import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom'
import { mainApi } from '../../utils/MainApi'
import { moviesApi } from '../../utils/MoviesApi'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import NotFound from '../NotFound/NotFound'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import InfoToolTip from '../InfoTooltip/InfoTooltip'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import FilterMovies from '../../hooks/FilterMovies'
import Footer from '../Footer/Footer'



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isSuccessInfoTooltipOpen, setIsSuccessInfoTooltipOpen] = useState(
    false,
  )
  const [isErrorInfoTooltipOpen, setIsErrorInfoTooltipOpen] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [moviesCollection, setMoviesCollection] = useState([])
  const [renderedMovies, setRenderedMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [request, setRequest] = useState('')
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const [preloader, setPreloader] = useState(false)
  const [searchStatus, setSearchStatus] = useState('')
  const [isSearchDone, setIsSearchDone] = useState(false)
  const [firstResults, setFirstResults] = useState(0)
  const [moreResults, setMoreResults] = useState(0)
  const [moreButtonVisibility, setMoreButtonVisibility] = useState(false)

  const [savedMovies, setSavedMovies] = useState([])

  const history = useHistory()
  const pathname = useLocation()

  const currentViewport = document.documentElement.clientWidth

  useEffect(() => {
    checkToken()
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'))
      const searchResult = FilterMovies(initialSearch, request, checkboxStatus)
      setFilteredMovies(searchResult)
      setIsSearchDone(true)
    }
  }, [currentUser])

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((savedMoviesData) => {
          setSavedMovies(
            savedMoviesData.filter((m) => m.owner === currentUser._id),
          )
        })
        .catch(() => setIsErrorInfoTooltipOpen(true))
    }
  }, [loggedIn])

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            history.push(pathname)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function updateProfileInfo({ name, email }) {
    const token = localStorage.getItem('jwt') //jwt
    mainApi
      .editProfile({ token, name, email })
      .then((newUser) => {
        setLoggedIn(true)
        setCurrentUser(newUser)
        localStorage.setItem('name', newUser.name)
        localStorage.setItem('email', newUser.email)
        setProfileMessage('Данные профиля успешно изменены')
      })
      .catch((err) =>
        setProfileMessage('Произошла ошибка при обновлении профиля'),
      )
  }

  const handleRegister = ({ name, email, password }) => {
    return mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        /*setIsSuccessInfoTooltipOpen(true);*/
        //history.push('/signin');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogin = ({ email, password }) => {
    return mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          history.push('/movies')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function launchPreloader() {
    setPreloader(true)
    setTimeout(() => setPreloader(false), 700)
  }

  function handleSearchMovie(request, checkboxStatus) {
    launchPreloader()
    setRenderedMovies([])
    setRequest(request)
    setCheckboxStatus(checkboxStatus)

    const moviesCollectionInLocalStorage = JSON.parse(
      localStorage.getItem('moviesCollection'),
    )

    if (!moviesCollectionInLocalStorage) {
      setPreloader(true)
      moviesApi
        .getMovies()
        .then((moviesData) => {
          setMoviesCollection(moviesData)
          localStorage.setItem('moviesCollection', JSON.stringify(moviesData))
          console.log(moviesData, 'moviesData')
        })
        .catch(() => {
          setSearchStatus(
            'Во время запроса произошла ошибка. Попробуйте ещё раз.',
          )
        })
        .finally(() => {
          setPreloader(false)
        })
    } else {
      setMoviesCollection(moviesCollectionInLocalStorage)
    }
  }

  useEffect(() => {
    if (moviesCollection.length > 0) {
      const moviesStorage = FilterMovies(
        moviesCollection,
        request,
        checkboxStatus,
      )

      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage))
      localStorage.setItem('request', request)
      localStorage.setItem('checkboxStatus', checkboxStatus)

      setFilteredMovies(moviesStorage)
      setIsSearchDone(true)
    }
  }, [moviesCollection, request, checkboxStatus])

  function renderMovies() {
    setRenderedMovies((state) =>
      filteredMovies.slice(0, state.length + moreResults),
    )
  }

  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreButtonVisibility(false)
    }
  }, [renderedMovies, filteredMovies])

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies((movies) => [newMovie, ...movies])
      })
      .catch(() => setIsErrorInfoTooltipOpen(true))
  }

  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id))
      })
      .catch(() => setIsErrorInfoTooltipOpen(true))
  }

  useEffect(() => {
    if (currentViewport <= 480) {
      setFirstResults(5)
      setMoreResults(2)
    } else if (currentViewport <= 1024) {
      setFirstResults(8)
      setMoreResults(2)
    } else if (currentViewport > 1024) {
      setFirstResults(12)
      setMoreResults(3)
    }
  }, [currentViewport])

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResults) {
        setRenderedMovies(filteredMovies.slice(0, firstResults))
        setMoreButtonVisibility(true)
      } else {
        setRenderedMovies(filteredMovies)
      }
    }
  }, [filteredMovies, firstResults])

  function handleUserSignOut() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('request')
    localStorage.removeItem('checkboxStatus')
    localStorage.removeItem('moviesCollection')
    localStorage.removeItem('moviesStorage')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    setMoviesCollection([])
    setSavedMovies([])
    setFilteredMovies([])
    setRequest('')
    setCheckboxStatus(false)
    setLoggedIn(false)
    setCurrentUser({})
    history.push('/')
  }

  const closeInfoToolTip = () => {
    setIsSuccessInfoTooltipOpen(false)
    setIsErrorInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onSignOut={handleUserSignOut}
              onUpdateUser={updateProfileInfo}
              profileMessage={profileMessage}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              loggedIn={loggedIn}
              onSearch={handleSearchMovie}
              preloader={preloader}
              isSearchDone={isSearchDone}
              searchStatus={searchStatus}
              renderedMovies={renderedMovies}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              moreButtonVisibility={moreButtonVisibility}
              onRenderMovies={renderMovies}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
            />
          </ProtectedRoute>

          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={handleRegister} />
            )}
          </Route>

          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {loggedIn && <Footer />}

        <InfoToolTip
          isOpen={isSuccessInfoTooltipOpen || isErrorInfoTooltipOpen}
          isSuccess={isSuccessInfoTooltipOpen}
          isError={isErrorInfoTooltipOpen}
          onClose={closeInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
