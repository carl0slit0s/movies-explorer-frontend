import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList children={<MoviesCard mySaveMovies={false} />} />
      <button className='movies__button-more'>Ещё</button>
    </div>
  );
}
