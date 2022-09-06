import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './Login.css';

export default function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    let { email, password } = formParams;
    props.handleLogin({ email, password }).catch((err) => {
      console.log(err);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
    console.log(isValid);
  };

  return (
    <>
      <Form
        title={'Рады видеть!'}
        submit={'Войти'}
        handleSubmit={handleSubmit}
        disabled={!isValid}
        children={
          <>
            <Input
              type={'email'}
              name={'email'}
              placeholder={'pochta@yandex.ru'}
              label={'E-mail'}
              value={formParams.email}
              onChange={handleChange}
              validate={{minLength: '', maxLength: ''}}
              errorMessage={errors.email}
            />
            <Input
              type={'password'}
              name={'password'}
              label={'Пароль'}
              value={formParams.password}
              onChange={handleChange}
              validate={{minLength: 8, maxLength: ''}}
              errorMessage={errors.password}
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
