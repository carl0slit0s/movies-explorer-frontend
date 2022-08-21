import React from 'react';
import './ButtonCardStatus.css';
import { useState } from 'react';

import iconSave from '../../images/icon-save.svg';
import iconDelete from '../../images/icon-delete.svg';
import ButtonSave from '../ButtonSave/ButtonSave';

export default function ButtonCardStatus({
  mySaveMoviesPage,
  visibilityIconSave,
}) {
  const [myCard, setMyCard] = useState(false);
  const [iconStatus, setIconStatus] = useState(iconSave);
  // const [visibilityIconSave, setVisibilityIconSave] = useState(false);

  const handleCardIcon = () => {
    setMyCard(true);
  };

  // видимость кнопки сохранить
  // const showIconSave = () => {
  //   setVisibilityIconSave(true);
  // };
  // const hideIconSave = () => {
  //   setVisibilityIconSave(false);
  // };

  // статус иконки
  // const changeIconOnDelete = () => {
  //   setIconStatus(iconDelete);
  // };
  // const changeIconOnOk = () => {
  //   setIconStatus(iconSave);
  // };

  return (
    <div>
      {mySaveMoviesPage ? (
        <img src={iconDelete} />
      ) : myCard ? (
        <img src={iconSave} />
      ) : visibilityIconSave ? (
        <ButtonSave handleClick={handleCardIcon} />
      ) : (
        <></>
      )}
    </div>
  );
}
