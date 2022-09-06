import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { CurrentUser } from '../Context/CurrentUser';
import { mainApi } from '../../utils/MainApi';
import MessagePopup from '../MessagePopup/MessagePopup';

export default function Profile({ handleOut }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [formParams, setFormParams] = useState(currentUser);
  const [disabled, setDisabled] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (
      formParams.name !== currentUser.name ||
      formParams.email !== currentUser.email
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [formParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  function editProfile(e) {
    e.preventDefault();
    let token = localStorage.getItem('token');
    mainApi
      .updateUserData(formParams.name, formParams.email, token)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, email: res.email });
        showMessage('Аккаунт успешно изменён');
      })
      .catch((err) => {
        console.log(err);
        showMessage(err.message);
      });
  }

  function showMessage(message) {
    setOpenPopup(true);
    setMessage(message);
  }

  function closePopup() {
    setOpenPopup(false);
  }

  return (
    <form className='profile' onSubmit={editProfile}>
      <MessagePopup
        message={message}
        isOpen={openPopup}
        closePopup={closePopup}
      />
      <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
      <div className='profile__info'>
        <label className='profile__sector'>
          <p className='profile__text'>Имя</p>
          <input
            className='profile__text'
            name='name'
            onChange={handleChange}
            placeholder={currentUser.name}
          />
        </label>
        <label className='profile__sector'>
          <p className='profile__text'>E-mail</p>
          <input
            className='profile__text'
            name='email'
            onChange={handleChange}
            placeholder={currentUser.email}
          />
        </label>
      </div>
      <button
        type='submit'
        className='profile__button profile__button_type_edit'
        disabled={disabled}
      >
        Редактировать
      </button>
      <button
        type='button'
        onClick={handleOut}
        className='profile__button profile__button_type_exit'
      >
        Выйти из аккаунта
      </button>
    </form>
  );
}
