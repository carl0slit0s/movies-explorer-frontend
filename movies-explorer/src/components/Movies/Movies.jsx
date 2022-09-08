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

export default function Movies({ loggedIn }) {
  const { currentUser } = useContext(CurrentUser);
  // список сохранённых фильмов
  const {foundMovies, keyword, short} = JSON.parse(localStorage.getItem('foundMoviesData')) || {}
  const { myMovies, setMyMovies } = useContext(MoviesContext);
  const [filterMovies, setFilterMovies] = useState(foundMovies);

  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');
  // const [movieCard, setMovieCard] = useState(movie);

  useEffect(() => {
    if (!loggedIn) {
      setMyMovies([]);
      setFilterMovies([])
    }
  }, [loggedIn])


  



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

      const token = localStorage.getItem('token');
      mainApi
        .getMyMovies(token)
        .then((movies) => {
          // setMyMovies(movies)
          const myMovie = movies.filter((movie) => movie.owner === currentUser.id);
          setMyMovies(myMovie);
        })

  }, [currentUser]);

  // кликер по поиску
  function searchMovies(formParams, checked) {
    let movies = JSON.parse(localStorage.getItem('moviesList'));
    let movieName = formParams.movieName;

    const foundMoviesList = selectionFilm({ movies, movieName, checked });
    if (!foundMoviesList.length) {
      showMessage('Ничего не найдено');
    }

    const foundMoviesData = {
      short: checked,
      keyword: movieName,
      foundMovies: foundMoviesList
    };
    setFilterMovies(foundMoviesData.foundMovies)
    localStorage.setItem('foundMoviesData', JSON.stringify(foundMoviesData));
  }

  // Отбираем фильмы по пораметрам
  function selectionFilm({ movies, movieName, checked }) {
    let filterMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    if (checked) {
      filterMovies = filterMovies.filter(
        (movie) => Number(movie.duration) <= MAX_DURATION_SHORT_FILM
      );
    }
    return filterMovies;
  }

  function showMorMovies() {
    setShowCardCount(showCardCount + moreCard);
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
    const cardForDelete = myMovies.find((item) => item.movieId === movie.id);
    mainApi.deleteMovie(cardForDelete._id, token).then(() => {
      setMyMovies((myMovies) => myMovies.filter((n) => n.movieId !== movie.id));
    });
  }

  // кликер сохранение
  function clickButtonSave(movie) {
    let token = localStorage.getItem('token');
    mainApi
      .seveMovie(movie, token)
      .then((myMovie) => {
        setMyMovies((myMovies) => [...myMovies, myMovie]);

        // return filterMovies;
      })
      .then()
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
      <SearchForm onSubmit={searchMovies} keyword={keyword} short={short} />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList>
          {foundMovies
            ? filterMovies.slice(0, showCardCount).map(
                (movie) => (
                /* myMovies.some((i) => i.movieId === movie.id), */
                  (
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
                      // myCard={myMovies.some((i) => i.movieId === movie.id)}
                      clickButtonSave={clickButtonSave}
                      myMovies={myMovies}
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
