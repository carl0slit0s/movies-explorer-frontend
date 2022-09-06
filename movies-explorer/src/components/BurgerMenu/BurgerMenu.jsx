import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import iconClose from '../../images/icon-close.svg';
import { BurgerMenuStateContext } from '../Context/BurgerContext';

export default function BurgerMenu({closeMenu}) {
  const active = React.useContext(BurgerMenuStateContext);

  return (
    <div className={active ? 'burger-menu burger-menu_active' : 'burger-menu'}>
      <div className='burger-menu_opacity'> </div>
      <img
        className='burger-menu__icon-close'
        alt='кнопка меню'
        src={iconClose}
        onClick={closeMenu}
      />
      <nav className='burger-menu__nav'>
        <ul className='burger-menu__list'>
          <li className='burger-menu__item'>
            <NavLink
              exact
              className='burger-menu__item-link'
              activeClassName='burger-menu__item-link_active'
              to={'/'}
              onClick={closeMenu}
            >
              Главная
            </NavLink>
          </li>
          <li className='burger-menu__item'>
            <NavLink
              className='burger-menu__item-link'
              activeClassName='burger-menu__item-link_active'
              to={'/movies'}
              onClick={closeMenu}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='burger-menu__item'>
            <NavLink
              className='burger-menu__item-link'
              activeClassName='burger-menu__item-link_active'
              to={'/saved-movies'}
              onClick={closeMenu}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
