import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import iconClose from '../../images/icon-close.svg';
import { BurgerMenuStateContext } from '../BurgerContext/BurgerContext';

export default function BurgerMenu({ closeMenu }) {
  const active = React.useContext(BurgerMenuStateContext);

  // function closeMenu() {
  //   active = false
  //   console.log(123)
  // }

  return (
    <div className={active ? 'burger-menu burger-menu_active' : 'burger-menu'}>
      <div className='burger-menu_opacity'> </div>
      <img
        className='burger-menu__icon-close'
        src={iconClose}
        onClick={closeMenu}
      />
      <nav className='burger-menu__nav'>
        <ul className='burger-menu__list'>
          <li className='burger-menu__item'>
            <Link
              className='burger-menu__item-link'
              to={'/'}
              onClick={closeMenu}
            >
              Главная
            </Link>
          </li>
          <li className='burger-menu__item'>
            <Link
              className='burger-menu__item-link burger-menu__item-link_active'
              to={'/movies'}
              onClick={closeMenu}
            >
              Фильмы
            </Link>
          </li>
          <li className='burger-menu__item'>
            <Link
              className='burger-menu__item-link'
              to={'/saved-movies'}
              onClick={closeMenu}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
