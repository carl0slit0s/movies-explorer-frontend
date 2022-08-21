import React from 'react';
import './MoviesCardList.css';

export default function MoviesCardList({myListMovies, children }) {
  return (
    <div className='card-list'>
      {children}
      {children}
      {children}
      {children}
      {children}
      {children}
    </div>
  );
}
