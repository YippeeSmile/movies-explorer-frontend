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
import filterMovies from '../../hooks/FilterMovies'
import Footer from '../Footer/Footer'
import useCurrentWidth from '../../hooks/useCurrentWidth'
//import { getInitialMoviesCount, getLoadStep } from '../../utils/getMoviesCount'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isSuccessInfoTooltipOpen, setIsSuccessInfoTooltipOpen] = useState(
    false,
  )
  const [isErrorInfoTooltipOpen, setIsErrorInfoTooltipOpen] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [moviesCollection, setMoviesCollection] = useState([])
  const [renderedMovies, setRenderedMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [request, setRequest] = useState('')
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const [preloader, setPreloader] = useState(false)
  const [searchStatus, setSearchStatus] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [firstMovieCount, setFirstMovieCount] = useState(0)
  const [moreResults, setMoreResults] = useState(0)
  const [getMoreMoviesButton, setGetMoreMoviesButton] = useState(false)

  const [savedMovies, setSavedMovies] = useState([])
  const width = useCurrentWidth();
  const history = useHistory()
  const pathname = useLocation()
  

  useEffect(() => {
    checkToken()
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'))
      const searchResult = filterMovies(initialSearch, request, checkboxStatus)
      console.log('initialSearch', initialSearch)
      console.log('searchResult', searchResult)
      setFilteredMovies(searchResult)
      setIsSearch(true)
    }
  }, [currentUser, loggedIn])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((savedMoviesData) => {
          console.log('savedMoviesData', savedMoviesData)
          setSavedMovies(
            savedMoviesData.filter((m) => m.owner === currentUser._id),
          )
        })
        .catch(() => setIsErrorInfoTooltipOpen(true));
    }
  }, [loggedIn, currentUser])

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
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
    const token = localStorage.getItem('jwt')
    mainApi
      .editProfile({ token, name, email })
      .then((newUser) => {
        setLoggedIn(true)
        setCurrentUser(newUser)
        localStorage.setItem('name', newUser.name)
        localStorage.setItem('email', newUser.email)
        setProfileMessage('Данные профиля успешно изменены')
      })
      .catch(() =>
        setProfileMessage('Произошла ошибка при обновлении профиля'),
      )
  }

  const handleRegister = ({ name, email, password }) => {
    return mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        /*setIsSuccessInfoTooltipOpen(true);*/
        history.push('/signin');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRegisterError('Данный email уже зарегистрирован');
        } else if (err === 'Ошибка: 400') {
          setRegisterError('Ошибка при регистрации пользователя');
        }
        console.log(err)
      });
  }

  const handleLogin = ({ email, password }) => {
    return mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoginError("Неправильный email или пароль");
        } else  {
        setLoginError("Поробуйте зарегистрироваться еще раз");
        }
      })
  }

  function launchPreloader() {
    setPreloader(true)
    setTimeout(() => setPreloader(false), 1000)
  }

  function searchMovie(request, checkboxStatus) {
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
        .then((movies) => {
          setMoviesCollection(movies)
          localStorage.setItem('moviesCollection', JSON.stringify(movies))
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
      const moviesStorage = filterMovies(
        moviesCollection,
        request,
        checkboxStatus,
      )
      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage))
      localStorage.setItem('request', request)
      localStorage.setItem('checkboxStatus', checkboxStatus)
      setFilteredMovies(moviesStorage)
      setIsSearch(true)
    }
  }, [moviesCollection, request, checkboxStatus])

  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setGetMoreMoviesButton(false)
    }
  }, [renderedMovies, filteredMovies])

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
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
    if (width <= 480) {
      setFirstMovieCount(5)
      setMoreResults(2)
    } else if (width <= 768) {
      setFirstMovieCount(8)
      setMoreResults(2)
    } else if (width > 1024) {
      setFirstMovieCount(12)
      setMoreResults(3)
    }
  }, [width])

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstMovieCount) {
        setRenderedMovies(filteredMovies.slice(0, firstMovieCount));
        setGetMoreMoviesButton(true);
      } else {
        setRenderedMovies(filteredMovies);
      }
    }
  }, [filteredMovies, firstMovieCount]);

  function renderMovies() {
    setRenderedMovies((prevState) => filteredMovies.slice(0, prevState.length + moreResults));
  }

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
    console.log(localStorage, 'localstorage')
  }

  const closeInfoToolTip = () => {
    setIsSuccessInfoTooltipOpen(false)
    setIsErrorInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn}/>
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
              onSearch={searchMovie}
              preloader={preloader}
              isSearchDone={isSearch}
              searchStatus={searchStatus}
              renderedMovies={renderedMovies}
              savedMovies={savedMovies}
              onSaveMovie={saveMovie}
              onDeleteMovie={handleDeleteMovie}
              getMoreMoviesButton={getMoreMoviesButton}
              renderMoreMovies={renderMovies}
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
              <Register onRegister={handleRegister}
              registerError={registerError} />
            )}
          </Route>

          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} loginError={loginError}/>}
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        </div>
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
