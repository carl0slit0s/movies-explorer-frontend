import Header from '../components/Header/Header';

const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor(server, option) {
    this.option = option;
    this.server = server;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  rebderError(err) {
    console.log(`Ошибка: ${err}`);
  }

  getFilms() {
    return fetch(`${this.server}/`, {
      headers: this.option.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi(BASE_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
