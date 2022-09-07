import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { MoviesContext } from '../Context/MoviesContext';
import Preloader from '../Preloader/Preloader';
import { CurrentUser } from '../Context/CurrentUser';

import {
  MAX_DURATION_SHORT_FILM,
  MORE_CARD_AE_768W,
  MORE_CARD_FOR_1280W,
  MORE_CARD_FOR_768W,
  SHOW_CARD_AE_768W,
  SHOW_CARD_FOR_1280W,
  SHOW_CARD_FOR_768W
} from '../../utils/constants.js';
import MessagePopup from '../MessagePopup/MessagePopup';

export default function Movies({ listMovies }) {
  const { currentUser } = useContext(CurrentUser);
  // список сохранённых фильмов

  const { myMovies, setMyMovies } = useContext(MoviesContext);
  const [filterMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem('filterMovies'))
  );

  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');
  // const [movieCard, setMovieCard] = useState(movie);

  function changeWidth(widthWindow) {
    if (widthWindow >= 1280) {
      return { showCard: SHOW_CARD_FOR_1280W, moreCard: MORE_CARD_FOR_1280W };
    }
    if (widthWindow >= 768) {
      return { showCard: SHOW_CARD_FOR_768W, moreCard: MORE_CARD_FOR_768W };
    }
    return { showCard: SHOW_CARD_AE_768W, moreCard: MORE_CARD_AE_768W };
  }

  const { showCard, moreCard } = changeWidth(window.innerWidth);
  const [showCardCount, setShowCardCount] = useState(showCard);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
    moviesApi
      .getFilms()
      .then((moviesList) => {
        localStorage.setItem('moviesList', JSON.stringify(moviesList));
      })
      .catch((err) => console.log(err))
      .finally(() => setShowPreloader(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    mainApi
      .getMyMovies(token)
      .then((movies) => {
        // movies = movies.filter((movie) => movie.owner === currentUser.id);
        setMyMovies(movies.filter((movie) => movie.owner === currentUser.id));
      })
      .then(() => console.log(myMovies));
  }, []);

  useEffect(() => {
    // обновление стейта
  }, [myMovies]);

  function searchMovies(formParams, checked) {
    let movieName = formParams.movieName;
    let movies = JSON.parse(localStorage.getItem('moviesList'));

    searchFilm({ movies, movieName, checked });

    // список фильмов по поиску
    setFilterMovies(JSON.parse(localStorage.getItem('filterMovies')));
  }

  function searchFilm({ movies, movieName, checked }) {
    let filterMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    if (checked) {
      filterMovies = filterMovies.filter(
        (movie) => Number(movie.duration) <= MAX_DURATION_SHORT_FILM
      );
    }
    localStorage.setItem('filterMovies', JSON.stringify(filterMovies));
    console.log(filterMovies.length);
    if (filterMovies.length === 0) {
      showMessage('Ничего не найдено');
    }
  }

  // function checkLike(listMovie) {
  //   listMovie.
  // }
  // function onSaveMovie(movie) {
  //   let token = localStorage.getItem('token');
  //   console.log(movie)
  //   mainApi
  //     .seveMovie(movie, token)
  //     .then((res) => {
  //       movie = { ...movie, _id: res._id, myCard: true };
  //       console.log(res)
  //       return movie;
  //     })
  //     .catch((err) => console.log(err));
  // }



  function showMorMovies() {
    setShowCardCount(showCardCount + moreCard);
    console.log(showCardCount);
  }

  function showMessage(message) {
    setOpenPopup(true);
    setMessage(message);
  }

  function closePopup() {
    setOpenPopup(false);
  }

  function deleteMovie(movie) {
    const token = localStorage.getItem('token');
    console.log(movie.id);
    console.log(myMovies);
    const cardForDelete = myMovies.find((item) => item.movieId === movie.id);
    console.log(cardForDelete);
    mainApi.deleteMovie(cardForDelete._id, token).then(() => {
      setMyMovies((myMovies) => myMovies.filter((n) => n.movieId !== movie.id));
      console.log(myMovies);
      console.log('карточка удалена');
    });
  }

  function clickButtonSave(movie) {
    let token = localStorage.getItem('token');
    mainApi
      .seveMovie(movie, token)
      .then((myMovie) => {
        console.log(myMovie)
        setFilterMovies((filterMovies) =>
          filterMovies.map((movie) =>
            movie.id === myMovie.movieId ? myMovie : movie
          )
        );
        setMyMovies((myMovies) => [...myMovies, myMovie]);
        const myCard = myMovies.some((i) => i.movieId === movie.id);
        console.log(myMovies, myMovie, filterMovies);
        return filterMovies;
      }).then()
      .catch((err) => {
        showMessage(err.message);
        console.log(err);
      });
  }

  return (
    <div className='movies'>
      <MessagePopup
        message={message}
        isOpen={openPopup}
        closePopup={closePopup}
      />
      <SearchForm onSubmit={searchMovies} />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList>
          {filterMovies
            ? filterMovies.slice(0, showCardCount).map(
                (movie) => (
                  myMovies.some((i) => i.movieId === movie.id),
                  (
                    /* console.log(myCard), */
                    <MoviesCard
                      movie={movie}
                      myListMovies={myMovies}
                      movieData={{
                        nameRU: movie.nameRU,
                        duration: movie.duration,
                        image: 'https://api.nomoreparties.co' + movie.image.url,
                        trailerLink: movie.trailerLink
                      }}
                      key={movie._id}
                      deleteMovie={deleteMovie}
                      showErrorLike={showMessage}
                      myCard={myMovies.some((i) => i.movieId === movie.id)}
                      clickButtonSave={clickButtonSave}
                    />
                  )
                )
              )
            : null}
        </MoviesCardList>
      )}
      {filterMovies && filterMovies.length > showCardCount ? (
        <button
          type='button'
          className='movies__button-more'
          onClick={showMorMovies}
        >
          Ещё
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
