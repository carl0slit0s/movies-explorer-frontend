import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { mainApi } from '../../utils/MainApi';
import { MoviesContext } from '../Context/MoviesContext';
import { CurrentUser } from '../Context/CurrentUser';

export default function SavedMovies({ loggedIn }) {
  const { myMovies, setMyMovies } = useContext(MoviesContext);

  const [showMoviesCard, setShowMoviesCard] = useState(myMovies)
  console.log(showMoviesCard)
  useEffect(() => {
    if (!loggedIn) {
      setMyMovies([]);
      setShowMoviesCard([])
    }
  }, [loggedIn])

  function deleteMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.deleteMovie(movie._id, token).then(() => {
      setShowMoviesCard(showMoviesCard.filter((n) => n._id !== movie._id));
      setMyMovies(showMoviesCard.filter((n) => n._id !== movie._id))

    }).catch((err) => console.log(err));
  }

  function filterhMovies(formParams, checked) {
    const { movieName } = formParams;
    // setMyMovies(
    //   myMovies.filter((movie) =>
    //     movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    //   )
    // );
    setShowMoviesCard(
      myMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
      )
    );
    if (checked) {
      setShowMoviesCard(showMoviesCard.filter((movie) => Number(movie.duration) <= 40));
    }
  }

  return (
    <div className='movies'>
      <SearchForm onSubmit={filterhMovies} />
      <MoviesCardList
        children={
          showMoviesCard.map((movie) => (
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
                myMovies={myMovies}
              />
            ))
        }
      />
    </div>
  );
}
