import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({myListMovies, children }) {
  return (
    <div className='card-list'>
      {children}
    </div>
  );
}
