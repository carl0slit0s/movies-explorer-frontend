import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { MoviesContext } from '../Context/MoviesContext';
import Preloader from '../Preloader/Preloader';

export default function Movies({ listMovies }) {
  const { myMovies, setMyMovies } = useContext(MoviesContext);
  const [searchHappened, setSearchHappened] = useState(false);
  const [filterMovies, setFilterMovies] = useState({});
  const [mySaveMovies, setMySaveMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  function changeWidth(widthWindow) {
    if (widthWindow >= 1280) {
      return { showCard: 12, moreCard: 3 };
    }
    if (widthWindow >= 768) {
      return { showCard: 8, moreCard: 2 };
    }
    return { showCard: 5, moreCard: 1 };
  }

  const { showCard, moreCard } = changeWidth(window.innerWidth);
  console.log(showCard, moreCard);
  const [showCardCount, setShowCardCount] = useState(showCard);
  const [showPreloader, setShowPreloader] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   mainApi
  //     .getMyMovies(token)
  //     .then((res) => {
  //       setMyMovies(res);
  //     })
  //     .then(() => console.log(myMovies));
  // }, [setMyMovies.length]);

  // useEffect(() => {
  //   console.log(123)
  //   const token = localStorage.getItem('token');
  //   mainApi
  //     .getMyMovies(token)
  //     .then((res) => {
  //       setMyMovies(res);
  //     })
  //     .then(() => console.log(myMovies));
  // }, [myMovies.length]);

  // useEffect(() => {
  //   console.log('showCardCount', showCardCount)
  // }, [showCardCount])

  useEffect(() => {
    moviesApi
      .getFilms()
      .then((moviesList) => {
        setMovies(moviesList);
        localStorage.setItem('moviesList', JSON.stringify(moviesList));
      })
      .catch((err) => console.log(err))
  }, []);

  function searchMovies(formParams, checked) {
    setShowPreloader(true);
    let movieName = formParams.movieName;
    let movies = JSON.parse(localStorage.getItem('moviesList'));

    searchFilm({ movies, movieName, checked });
    setSearchHappened(true);
    setFilterMovies(JSON.parse(localStorage.getItem('filterMovies')));
    setShowPreloader(false);
  }

  function searchFilm({ movies, movieName, checked }) {
    // const film = Array.map(movieList, movie => movie.name.includes(movieName))
    let filterMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    if (checked) {
      filterMovies = filterMovies.filter(
        (movie) => Number(movie.duration) <= 40
      );
    }
    localStorage.setItem('filterMovies', JSON.stringify(filterMovies));
  }

  function onSaveMovie(movie) {
    let token = localStorage.getItem('token');
    mainApi
      .seveMovie(movie, token)
      .then((res) => {
        movie = { ...movie, _id: res._id };
        return movie;
      })
      .catch((err) => console.log(err));
  }

  function deleteMovie(movie) {
    // доработать
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

  return (
    <div className='movies'>
      <SearchForm onSubmit={searchMovies} />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          children={
            searchHappened ? (
              filterMovies.slice(0, showCardCount).map((movie) => (
                <MoviesCard
                  movie={movie}
                  myListMovies={false}
                  movieData={{
                    nameRU: movie.nameRU,
                    duration: movie.duration,
                    image: 'https://api.nomoreparties.co' + movie.image.url,
                    trailerLink: movie.trailerLink,
                  }}
                  saveMovie={onSaveMovie}
                  key={movie._id}
                  deleteMovie={deleteMovie}
                />
              ))
            ) : (
              <></>
            )
          }
        />
      )}

      {searchHappened && filterMovies.length > showCardCount ? (
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
