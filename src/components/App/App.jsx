import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {


    return (
        <div className='page'>
        <Header />

        <Switch>
            <Route exact path='/'>
                <Main />
            </Route>

            <Route path="/profile">
                <Profile />
            </Route>

            <Route path="/movies">
                <Movies />
            </Route>

            <Route path="/saved-movies">
                <SavedMovies />
            </Route>

            <Route path="/signup">
                <Register />
            </Route>

            <Route path="/signin">
                <Login />
            </Route>


            <Route path="*">
                <NotFound />
            </Route>

        </Switch>
       
        </div>
    );
}

export default App;