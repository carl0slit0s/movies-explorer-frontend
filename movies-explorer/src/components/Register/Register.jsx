import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

export default function Register(props) {
  const [formParams, setFormParams] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    let { name, email, password } = formParams;
    props.handleRegister({ name, email, password }).catch((err) => {
      console.log(err);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='register'>
      <Form
        title={'Рады видеть!'}
        submit={'Зарегистрироваться'}
        handleSubmit={handleSubmit}
        children={
          <>
            <Input
              type={'text'}
              name={'name'}
              placeholder={'Виталий'}
              label={'Имя'}
              value={formParams.name}
              onChange={handleChange}
            />
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
      <p className='register__text'>
        Уже зарегистрированы?
        <Link className='register__link' to='/signin'>
          Войти
        </Link>
      </p>
    </div>
  );
}
