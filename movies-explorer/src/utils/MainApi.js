const BASE_URL = 'http://api.diplomalit0s.nomoredomains.xyz/';

class MainApi {
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

  // показать мои фильмы
  getMyMovies() {
    return fetch(`${this.server}/movies`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  // сохранить в мои фильмы
  seveMovie(data) {
    return fetch(`${this.server}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: data.nameRu,
        image: data.image,
        duration: data.duration,
        movieId: data.movieId
      }),
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi(BASE_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
