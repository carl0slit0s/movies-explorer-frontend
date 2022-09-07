import React, { useState } from 'react';
import './MoviesCard.css';
import iconDelete from '../../images/icon-delete.svg';
import iconSave from '../../images/icon-save.svg';
import ButtonCardStatus from '../ButtonCardStatus/ButtonCardStatus';
import { mainApi } from '../../utils/MainApi';

export default function MoviesCard({
  movie,
  mySaveMovies,
  movieData,
  saveMovie,
  deleteMovie,
  showErrorLike,
  myCard,
  clickButtonSave,
}) {
  const [iconStatus, setIconStatus] = useState(iconSave);
  const [visibilityIconSave, setVisibilityIconSave] = useState(false);
  const [movieCard, setMovieCard] = useState(movie);
  // const [myCard, setMyCard] = useState(false);
  // видимость кнопки сохранить
  const showIconSave = () => {
    setVisibilityIconSave(true);
  };
  const hideIconSave = () => {
    setVisibilityIconSave(false);
  };

  // статус иконки
  const changeIconOnDelete = () => {
    setIconStatus(iconDelete);
  };
  const changeIconOnOk = () => {
    setIconStatus(iconSave);
  };

  function handleIconDelete(e) {
    console.log(movieCard)
    deleteMovie(movieCard);
  }



  function saveMovie() {
    clickButtonSave(movie);
  }

  return (
    <div onMouseOver={showIconSave} onMouseOut={hideIconSave} className='card'>
      <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
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
          clickButtonSave={saveMovie}
          handleIconDelete={handleIconDelete}
          myCard={myCard}
        />
      </div>
    </div>
  );
}
