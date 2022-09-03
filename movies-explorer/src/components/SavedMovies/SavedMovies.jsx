import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { mainApi } from '../../utils/MainApi';
import { MoviesContext } from '../Context/MoviesContext';
import { CurrentUser } from '../Context/CurrentUser';

export default function SavedMovies({ listMovies }) {
  const { myMovies, setMyMovies } = useContext(MoviesContext);
  console.log('listMovies', myMovies);
  const { currentUser } = useContext(CurrentUser);
  console.log('currentUser', currentUser);

  useEffect(() => {
    console.log(123);
    const token = localStorage.getItem('token');
    mainApi
      .getMyMovies(token)
      .then((movies) => {
        console.log(currentUser);
        movies = movies.filter((movie) => movie.owner === currentUser.id);
        setMyMovies(movies);
      })
      .then(() => console.log(myMovies));
  }, [myMovies.length]);

  function deleteMovie(movie) {
    const token = localStorage.getItem('token');
    console.log(myMovies);
    mainApi.deleteMovie(movie._id, token).then(() => {
      setMyMovies(myMovies.filter((n) => n._id !== movie._id));
      console.log(movie);
      console.log('карточка удалена');
    });
  }

  function filterhMovies(formParams, checked) {
    const { movieName } = formParams;
    setMyMovies(
      myMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
      )
    );
    if (checked) {
      setMyMovies(myMovies.filter((movie) => Number(movie.duration) <= 40));
    }
  }

  return (
    <div className='movies'>
      <SearchForm onSubmit={filterhMovies} />
      <MoviesCardList
        children={myMovies.map((movie) => (
          <MoviesCard
            movie={movie}
            mySaveMovies={true}
            movieData={{
              nameRU: movie.nameRU,
              duration: movie.duration,
              image: movie.image,
              trailerLink: movie.trailerLink,
            }}
            // saveMovie={onSaveMovie}
            key={movie._id}
            deleteMovie={deleteMovie}
          />
        ))}
      />
    </div>
  );
}
