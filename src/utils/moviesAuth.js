export const BASE_URL = 'http://localhost:3000/'; //сверить с доменом диплома https://api.yippee.diploma.nomoreparties.co

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject('Error' + res.status)
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, email: email })
        })
        .then(checkResponse)
}

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, email: email })
        })
        .then(checkResponse)
}

export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, //ваш токен JWT
            },
        })
        .then(checkResponse);
}