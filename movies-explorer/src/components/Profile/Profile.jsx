import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'

export default function Profile() {
  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <div className='profile__info'>
        <div className='profile__sector'>
          <p className='profile__text'>Имя</p>
          <p className='profile__text'>Виталий</p>
        </div>
        <div className='profile__sector'>
          <p className='profile__text'>E-mail</p>
          <p className='profile__text'>pochta@yandex.ru</p>
        </div>
      </div>
      <Link className='profile__link profile__link_type_edit'>Редактировать</Link>
      <Link className='profile__link profile__link_type_exit'>Выйти из аккаунта</Link>
    </div>
  );
}
