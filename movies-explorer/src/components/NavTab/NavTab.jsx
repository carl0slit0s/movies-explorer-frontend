import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav>
      <ul className='navtab'>
        <li>
          <a href='#progect'>
            <button className='button'>О проекте</button>
          </a>
        </li>
        <li>
          <a href='#techs'>
            <button className='button'>Технологии</button>
          </a>
        </li>
        <li>
          <a href='#student'>
            <button className='button'>Студент</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}
