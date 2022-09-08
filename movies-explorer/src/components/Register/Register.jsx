import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import MessagePopup from '../MessagePopup/MessagePopup';

export default function Register(props) {
  const [formParams, setFormParams] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');

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
      [name]: value
    }));
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  function closePopup() {
    setOpenPopup(false);
  }

  function showMessage(message) {
    setOpenPopup(true);
    setMessage(message);
  }

  return (
    <div className='register'>
      <MessagePopup
        message={message}
        isOpen={openPopup}
        closePopup={closePopup}
      />
      <Form
        title={'Рады видеть!'}
        submit={'Зарегистрироваться'}
        handleSubmit={handleSubmit}
        disabled={!isValid}
        children={
          <>
            <Input
              type={'text'}
              name={'name'}
              placeholder={'Виталий'}
              label={'Имя'}
              value={formParams.name}
              onChange={handleChange}
              validate={{ minLength: 2, maxLength: 30 }}
              errorMessage={errors.name}
            />
            <Input
              type={'email'}
              name={'email'}
              placeholder={'pochta@yandex.ru'}
              label={'E-mail'}
              value={formParams.email}
              onChange={handleChange}
              validate={{ minLength: '', maxLength: '' }}
              errorMessage={errors.email}
            />
            <Input
              type={'password'}
              name={'password'}
              label={'Пароль'}
              value={formParams.password}
              onChange={handleChange}
              validate={{ minLength: 8, maxLength: '' }}
              errorMessage={errors.password}
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
