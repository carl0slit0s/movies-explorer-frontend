import React, { useState } from 'react';
import './MoviesCard.css';
import moviesCard from '../../images/movies-card.jpg';
import iconDelete from '../../images/icon-delete.svg';
import iconSave from '../../images/icon-save.svg';
import ButtonSave from '../ButtonSave/ButtonSave';
import ButtonCardStatus from '../ButtonCardStatus/ButtonCardStatus';

export default function MoviesCard({ mySaveMovies }) {
  const [myCard, setMyCard] = useState(false);
  const [iconStatus, setIconStatus] = useState(iconSave);
  const [visibilityIconSave, setVisibilityIconSave] = useState(false);

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

  return (
    <div onMouseOver={showIconSave} onMouseOut={hideIconSave} className='card'>
      <img className='card__image' src={moviesCard} alt='здесь будет название фильма'/>
      <div className='card__info'>
        <p className='card__name'>33 слова о дизайне</p>
        <p className='card__duration'>1ч 17м</p>
      </div>
      <div
        onMouseOver={changeIconOnDelete}
        onMouseOut={changeIconOnOk}
        className='card__icon'
      >
      <ButtonCardStatus mySaveMoviesPage={mySaveMovies} visibilityIconSave={visibilityIconSave}/>
        {/* {myCard ? (
          <img className='card__icon-status' src={iconStatus} />
        ) : visibilityIconSave ? (
          <ButtonSave handleClick={handleCardIcon} />
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}
