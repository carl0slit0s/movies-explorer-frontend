import React, { useState } from 'react';
import './MoviesCard.css';
import moviesCard from '../../images/movies-card.jpg';
import iconDelete from '../../images/icon-delete.svg';
import iconSave from '../../images/icon-save.svg';
import ButtonSave from '../ButtonSave/ButtonSave';
import ButtonCardStatus from '../ButtonCardStatus/ButtonCardStatus';
import { mainApi } from '../../utils/MainApi';
import { Link } from 'react-router-dom';

export default function MoviesCard({
  movie,
  mySaveMovies,
  movieData,
  saveMovie,
  deleteMovie,
}) {
  // console.log(movieData)
  // console.log(movie)
  const [myCard, setMyCard] = useState(false);
  const [iconStatus, setIconStatus] = useState(iconSave);
  const [visibilityIconSave, setVisibilityIconSave] = useState(false);
  const [movieCard, setMovieCard] = useState(movie);
  // console.log('123', movieData);
  // console.log(movie)
  // const movieImg = `https://api.nomoreparties.co${movieData.image.url}`;24

  // видимость кнопки сохранить
  const showIconSave = () => {
    setVisibilityIconSave(true);
  };
  const hideIconSave = () => {
    setVisibilityIconSave(false);
    console.log(movieData)
  };

  // статус иконки
  const changeIconOnDelete = () => {
    setIconStatus(iconDelete);
  };
  const changeIconOnOk = () => {
    setIconStatus(iconSave);
  };

  function clickButtonSave() {
    saveMovie(movieCard);
  }

  function handleIconDelete() {
    deleteMovie(movieCard);
  }

  return (
    <div onMouseOver={showIconSave} onMouseOut={hideIconSave} className='card'>
      <a href={movieData.trailerLink} target='_blank'>
        <img
          className='card__image'
          src={movieData.image}
          alt='здесь будет картинка фильма'
        />
      </a>
      <div className='card__info'>
        <p className='card__name'>{movieData.nameRU}</p>
        <p className='card__duration'>{`${movieData.duration} мин`}</p>
      </div>
      <div
        onMouseOver={changeIconOnDelete}
        onMouseOut={changeIconOnOk}
        className='card__icon'
      >
        <ButtonCardStatus
          mySaveMoviesPage={mySaveMovies}
          visibilityIconSave={visibilityIconSave}
          clickButtonSave={clickButtonSave}
          handleIconDelete={handleIconDelete}
        />
      </div>
    </div>
  );
}
