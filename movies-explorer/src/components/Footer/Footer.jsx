import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <Switch>
      <Route exact path={['/', '/movies', '/save-movies']}>
        <footer className='footer'>
          <p className='footer__title'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className='footer__info'>
            <p className='footer__copyright'>&copy; 2022</p>
            <ul className='footer__contact-list'>
              <li className='footer__contact-item'>
                <a
                  className='footer-contact-link'
                  href='https://practicum.yandex.ru/'
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className='footer__contact-item'>
                <a
                  className='footer-contact-link'
                  href='https://github.com/carl0slit0s?tab=repositories'
                >
                  Github
                </a>
              </li>
              <li className='footer__contact-item'>
                <a className='footer-contact-link' href='#'>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
    </Switch>
  );
}
