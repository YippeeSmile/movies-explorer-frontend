import { BASE_URL } from './constants';

class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    get _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        }
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    register = ({ name, email, password }) => {
        return fetch(`${this._baseUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, password: password, email: email })
            })
            .then(this._getResponse)
    }

    authorize = ({ email, password }) => {
            return fetch(`${this._baseUrl}/signin`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password: password, email: email })
                })
                .then(this._getResponse)
        }
        /*
            ///yнужен ли он
            tokenCheck = (token) => {
                    return fetch(`${this._baseUrl}/users/me`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                        })
                        .then(this._getResponse)
                }
                /// и этот
            getContent = (token) => {
                console.log(token, 'tokencheck')
                return fetch(`${this._baseUrl}/users/me`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`, //'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then(this._getResponse)
            }*/

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers,
            })
            .then(this._getResponse)
    }

    editProfile({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    email
                })
            })
            .then(this._getResponse)
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify(data)
            })
            .then(this._getResponse)
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
                headers: this._headers,
            })
            .then(this._getResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._getResponse)
    }
}

export const mainApi = new MainApi({
    baseUrl: `${BASE_URL}`,
});