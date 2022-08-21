import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList children={<MoviesCard mySaveMovies={true} />} />
    </div>
  );
}
