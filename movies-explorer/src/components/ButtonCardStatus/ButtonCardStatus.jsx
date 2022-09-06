import React from 'react';
import './ButtonCardStatus.css';
import { useState } from 'react';

import iconSave from '../../images/icon-save.svg';
import iconDelete from '../../images/icon-delete.svg';
import ButtonSave from '../ButtonSave/ButtonSave';

export default function ButtonCardStatus({
  mySaveMoviesPage,
  visibilityIconSave,
  clickButtonSave,
  handleIconDelete,
  myCard
}) {
  const [visibilityIconDelete, setVisibilityIconDelete] = useState(false);

  function showIconDelete() {
    setVisibilityIconDelete(true);
  }
  function hideIconDelete() {
    setVisibilityIconDelete(false);
  }

  return (
    <div>
      {mySaveMoviesPage || visibilityIconDelete ? (
        <button
          onMouseOut={hideIconDelete}
          className='button-status button-status_status_delete'
          type='button'
          src={iconDelete}
          alt='иконка удалить'
          onClick={handleIconDelete}
        />
      ) : myCard ? (
        <button
          onMouseOver={showIconDelete}
          onMouseOut={hideIconDelete}
          className='button-status button-status_status_save'
          type='button'
          src={iconSave}
          alt='иконка сохрнить'
        />
      ) : visibilityIconSave ? (
        <ButtonSave handleClick={clickButtonSave} />
      ) : (
        <></>
      )}
    </div>
  );
}
