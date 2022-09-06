import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { MoviesContext } from '../Context/MoviesContext';
import Preloader from '../Preloader/Preloader';

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
// список сохранённых фильмов
  const { myMovies, setMyMovies } = useContext(MoviesContext);
  const [filterMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem('filterMovies')) || []
  );
  console.log(myMovies)
  console.log(filterMovies)
  
  

  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');


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
  }


  function checkLike() {
    
  }
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

  function deleteMovie(movie) {
    const token = localStorage.getItem('token');
    console.log(movie);
    mainApi.deleteMovie(movie._id, token).then(() => {
      setMyMovies(myMovies.filter((n) => n !== movie));
      console.log(myMovies);
      console.log('карточка удалена');
    });
  }

  function showMorMovies() {
    setShowCardCount(showCardCount + moreCard);
    console.log(showCardCount);
  }

  function showMessage(message) {
    setOpenPopup(true);
    console.log('ОТкрЫть');
    setMessage(message);
  }

  function closePopup() {
    setOpenPopup(false);
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
        <MoviesCardList
          children={
            filterMovies.length ? (
              filterMovies.slice(0, showCardCount).map((movie) => (
                <MoviesCard
                  movie={movie}
                  myListMovies={false}
                  movieData={{
                    nameRU: movie.nameRU,
                    duration: movie.duration,
                    image: 'https://api.nomoreparties.co' + movie.image.url,
                    trailerLink: movie.trailerLink
                  }}
                  key={movie._id}
                  deleteMovie={deleteMovie}
                  showErrorLike={showMessage}
                />
              ))
            ) : (
              <>ничего не найдено</>
            )
          }
        />
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
