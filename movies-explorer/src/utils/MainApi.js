const BASE_URL = 'https://api.diplomalit0s.nomoredomains.xyz';
const MOVIE_API_URL = 'https://api.nomoreparties.co';
class MainApi {
  constructor(server, option) {
    this.option = option;
    this.server = server;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      throw new Error(data.message);
    });
  }
  rebderError(err) {
    console.log(`Ошибка: ${err}`);
  }

  // показать мои фильмы
  getMyMovies(token) {
    return fetch(`${this.server}/movies`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    }).then(this._checkResponse);
  }

  // сохранить в мои фильмы
  seveMovie(data, token) {
    const filmData = {
      country: data.country,
      duration: data.duration,
      director: data.director,
      year: data.year,
      description: data.description,
      image: MOVIE_API_URL + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: MOVIE_API_URL + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN
    };
    return fetch(`${this.server}/movies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(filmData)
    }).then(this._checkResponse);
  }

  deleteMovie(id, token) {
    return fetch(`${this.server}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    }).then(this._checkResponse);
  }

  updateUserData(name, email, token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi(BASE_URL, {
  headers: {
    'Content-Type': 'application/json'
  }
});
