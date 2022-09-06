import React, { useState } from 'react';
import './MessagePopup.css';

export default function MessagePopup({ isOpen, message, closePopup }) {
  // const [isOpen, setIsOpen] = useState(false)
  // function closePopup() {
  //   setIsOpen(false)
  // }

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className='popup__conteiner'>
        <button
          type='button'
          className='popup__close-icon'
          onClick={closePopup}
        >
          Закрыть
        </button>
        <h2>{message}</h2>
      </div>
    </div>
  );
}
