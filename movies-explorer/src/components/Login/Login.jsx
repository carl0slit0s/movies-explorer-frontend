import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './Login.css';
import logo from '../../images/logo.svg';

export default function Login() {
  return (
    <>
      <Form
        title={'Рады видеть!'}
        submit={'Войти'}
        children={
          <>
            <Input
              type={'email'}
              name={'email'}
              placeholder={'pochta@yandex.ru'}
              label={'E-mail'}
            />
            <Input type={'password'} name={'password'} label={'Пароль'} />
          </>
        }
      />
      <p className='login__text'>
        Ещё не зарегистрированы?
        <Link className='login__text-link' to='/signup'>
          Регистрация
        </Link>
      </p>
    </>
  );
}
