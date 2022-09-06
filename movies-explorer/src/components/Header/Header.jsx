import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import BurgerIcon from '../BurgerIcon/BurgerIcon';

export default function Header({ loggedIn, changeStatusMenu }) {
  return loggedIn ? (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='лого сайта' className='header__logo' />
      </Link>
      <ul className='header__links'>
        <div className='header__links-left-block'>
          <li>
            <NavLink className='header__link' activeClassName='header__link_active' to='/movies'>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink className='header__link' activeClassName='header__link_active' to='/saved-movies'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </div>
        <li>
          <Link to={'/profile'}>
            <button className='header__button-account'>Аккаунт</button>
          </Link>
        </li>
      </ul>

      <BurgerIcon changeStatusMenu={changeStatusMenu} />
    </header>
  ) : (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='лого сайта' className='header__logo' />
      </Link>
      <div className='header__auth-links'>
        <Link className='header__button-sign' to='/signup'>
          Регистрация
        </Link>
        <Link
          className='header__button-sign header__button-sign_active'
          to='/signin'
        >
          Войти
        </Link>
      </div>
    </header>
  );
}
