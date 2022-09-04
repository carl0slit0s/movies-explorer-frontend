import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import BurgerIcon from '../BurgerIcon/BurgerIcon';

export default function Header({ changeStatusMenu }) {
  return (
    <Switch>
      <Route exact path='/'>
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
      </Route>
      <Route path={['/movies', '/profile', '/saved-movies']}>
        <header className='header'>
          <Link to='/'>
            <img src={logo} alt='лого сайта' className='header__logo' />
          </Link>
          <ul className='header__links'>
            <div className='header__links-left-block'>
              <li>
                <Link className='header__link header__link_active' to='/movies'>
                  Фильмы
                </Link>
              </li>
              <li>
                <Link className='header__link header__link' to='/saved-movies'>
                  Сохранённые фильмы
                </Link>
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
      </Route>
    </Switch>
  );
}
