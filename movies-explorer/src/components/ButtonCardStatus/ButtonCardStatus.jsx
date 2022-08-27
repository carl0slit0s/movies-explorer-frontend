import React from 'react';
import './ButtonCardStatus.css';
import { useState } from 'react';

import iconSave from '../../images/icon-save.svg';
import iconDelete from '../../images/icon-delete.svg';
import ButtonSave from '../ButtonSave/ButtonSave';
import SavedMovies from '../SavedMovies/SavedMovies';

export default function ButtonCardStatus({
  mySaveMoviesPage,
  visibilityIconSave,
  clickButtonSave
}) {
  const [myCard, setMyCard] = useState(false);

  const handleIconSave = () => {
    setMyCard(true);
    clickButtonSave()
  };

  return (
    <div>
      {mySaveMoviesPage ? (
        <button
          className='button-status button-status_status_delete'
          type='button'
          src={iconDelete}
          alt='иконка удалить'
        />
      ) : myCard ? (
        <button
          className='button-status button-status_status_save'
          type='button'
          src={iconSave}
          alt='иконка сохрнить'
        />
      ) : visibilityIconSave ? (
        <ButtonSave handleClick={handleIconSave} />
      ) : (
        <></>
      )}
    </div>
  );
}
