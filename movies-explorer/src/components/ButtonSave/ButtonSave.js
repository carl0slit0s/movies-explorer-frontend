import React from 'react';
import './ButtonSave.css';

export default function ButtonSave({ handleClick }) {
  return (
    <button className='button-save-film' onClick={handleClick}>
      Сохранить
    </button>
  );
}
