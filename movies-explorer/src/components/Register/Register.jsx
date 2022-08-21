import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Register() {
  return (
    <div className='register'>
      <Form
        title={'Рады видеть!'}
        submit={'Войти'}
        children={
          <>
            <Input
              type={'text'}
              name={'name'}
              placeholder={'Виталий'}
              label={'Имя'}
            />
            <Input
              type={'email'}
              name={'email'}
              placeholder={'pochta@yandex.ru'}
              label={'E-mail'}
            />
            <Input
              type={'password'}
              name={'password'}
              label={'Пароль'}
            />
          </>
        }
      />
      <p className='register__text'>
        Уже зарегистрированы?
        <Link className='register__link' to='/signin'>Войти</Link>
      </p>
    </div>
  );
}
