import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav>
      <ul className='navtab'>
        <li>
          <a href='#progect'>
            <button type='button' className='button'>О проекте</button>
          </a>
        </li>
        <li>
          <a href='#techs'>
            <button type='button' className='button'>Технологии</button>
          </a>
        </li>
        <li>
          <a href='#student'>
            <button type='button' className='button'>Студент</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}
