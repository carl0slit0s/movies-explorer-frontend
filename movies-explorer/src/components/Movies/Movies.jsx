import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

export default function Movies({ listMovies }) {
  const [searchHappened, setSearchHappened] = useState(false);

  function searchMovies(e) {
    e.preventDefault();
    setSearchHappened(true);
  }

  function onSaveMovie(movie) {
    mainApi.seveMovie(movie).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <div className='movies'>
      <SearchForm onSubmit={searchMovies} />
      <MoviesCardList
        children={
          searchHappened ? (
            listMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                myListMovies={false}
                movieData={movie}
                saveMovie={onSaveMovie}
                key={movie._id}
              />
            ))
          ) : (
            <></>
          )
        }
      />
      {searchHappened ? (
        <button type='button' className='movies__button-more'>
          Ещё
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
