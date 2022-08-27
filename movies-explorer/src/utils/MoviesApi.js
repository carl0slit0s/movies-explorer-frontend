const MOVIE_SERVISE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const xhr = new XMLHttpRequest();

xhr.open('GET', MOVIE_SERVISE_URL);

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
    return fetch(this.server, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi(MOVIE_SERVISE_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
