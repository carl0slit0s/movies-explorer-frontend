import React from 'react';
import './AboutMe.css';
import TitleSecond from '../TitleSecond/TitleSecond';
import myPhoto from '../../images/my-photo.jpg';
import { Link } from 'react-router-dom';

export default function AboutMe() {
  return (
    <section className='about-me' id='student'>
      <TitleSecond text='Студент' />
      <div className='about-me__info'>
        <div className='about-me__text'>
          <p className='about-me__name'>Алексей</p>
          <p className='about-me__about'>Фронтенд-разработчик, 33 года</p>
          <p className='about-me__detail'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>

          <ul className='about-me__contact-list'>
            <li className='about-me__contact-item'>
              <a className='about-me-contact-link' href='#'>
                Facebook
              </a>
            </li>
            <li className='about-me__contact-item'>
              <a
                className='about-me-contact-link'
                href='https://github.com/carl0slit0s?tab=repositories'
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img className='about-me__photo' src={myPhoto} />
      </div>

      <div className='about-me__portfolio'>
        <h3 className='about-me__portfolio-title'>Портфолио</h3>
        <ul className='about-me__portfolio-list'>
          <li className='about-me__portfolio-item'>
            <a className='about-me__website' href='#'>
              Статичный сайт
              <p className='about-me__website-cursor'>&#8599;</p>
            </a>
          </li>
          <li className='about-me__portfolio-item'>
            <a className='about-me__website' href='#'>
              Адаптивный сайт
              <p className='about-me__website-cursor'>&#8599;</p>
            </a>
          </li>
          <li className='about-me__portfolio-item'>
            <a className='about-me__website' href='#'>
              Одностраничное приложение
              <span className='about-me__website-cursor'>&#8599;</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
