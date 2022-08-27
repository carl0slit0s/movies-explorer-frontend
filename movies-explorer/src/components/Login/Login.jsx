import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './Login.css';
import logo from '../../images/logo.svg';

export default function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmitRegister() {
    let { email, password } = formParams;
    props.handleLogin({ email, password }).catch((err) => {
      setMessage(err.message);
    });;
  }

  return (
    <>
      <Form
        title={'Рады видеть!'}
        submit={'Войти'}
        handleSubmit={handleSubmitRegister}
        children={
          <>
            <Input
              type={'email'}
              name={'email'}
              placeholder={'pochta@yandex.ru'}
              label={'E-mail'}
              value={formParams.email}
              onChange={handleChange}
            />
            <Input
              type={'password'}
              name={'password'}
              label={'Пароль'}
              value={formParams.password}
              onChange={handleChange}
            />
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
