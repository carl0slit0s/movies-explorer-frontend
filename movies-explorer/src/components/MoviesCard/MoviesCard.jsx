import React, { useState } from 'react';
import './MoviesCard.css';
import moviesCard from '../../images/movies-card.jpg';
import iconDelete from '../../images/icon-delete.svg';
import iconSave from '../../images/icon-save.svg';
import ButtonSave from '../ButtonSave/ButtonSave';
import ButtonCardStatus from '../ButtonCardStatus/ButtonCardStatus';
import { mainApi } from '../../utils/MainApi';

export default function MoviesCard({movie, mySaveMovies, movieData, saveMovie }) {
  const [myCard, setMyCard] = useState(false);
  const [iconStatus, setIconStatus] = useState(iconSave);
  const [visibilityIconSave, setVisibilityIconSave] = useState(false);

  const movieImg = `https://api.nomoreparties.co${movieData.image.url}`;
  const handleCardIcon = (e) => {
    setMyCard(true);
  };

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

  function clickButtonSave() {
    saveMovie(movie);
  }

  return (
    <div onMouseOver={showIconSave} onMouseOut={hideIconSave} className='card'>
      <img
        className='card__image'
        src={movieImg}
        alt='здесь будет картинка фильма'
      />
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
        />
      </div>
    </div>
  );
}
