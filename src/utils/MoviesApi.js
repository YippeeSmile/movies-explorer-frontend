import { Movies_URL } from './constants';

class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _getResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(this._getResponse)
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: `${Movies_URL}`,
});