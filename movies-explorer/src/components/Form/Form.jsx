import React from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Form({ title, submit, children, handleSubmit, disabled }) {
  function onSubmit(e) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <form className='form' onSubmit={onSubmit} noValidate>
      <Link className='form__logo' to='/'>
        <img src={logo} alt='лого сайта' />
      </Link>
      <h2 className='form__title'>{title}</h2>
      {children}
      <button className='form__submit' type='submit' disabled={disabled}>
        {submit}
      </button>
    </form>
  );
}
