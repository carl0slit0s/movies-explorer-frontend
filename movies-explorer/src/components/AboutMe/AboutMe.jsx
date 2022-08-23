import React from 'react';
import './AboutMe.css';
import TitleSecond from '../TitleSecond/TitleSecond';
import myPhoto from '../../images/my-photo.jpg';

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
              <a
                className='about-me-contact-link'
                href='https://vk.com/lit0s'
                target='_blank'
                rel='noreferrer'
              >
                VK
              </a>
            </li>
            <li className='about-me__contact-item'>
              <a
                className='about-me-contact-link'
                href='https://github.com/carl0slit0s?tab=repositories'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img className='about-me__photo' src={myPhoto} alt='моя фотография' />
      </div>

      <div className='about-me__portfolio'>
        <h3 className='about-me__portfolio-title'>Портфолио</h3>
        <ul className='about-me__portfolio-list'>
          <li className='about-me__portfolio-item'>
            <a
              className='about-me__website'
              href='https://carl0slit0s.github.io/how-to-learn/'
              target='_blank'
              rel='noreferrer'
            >
              Статичный сайт
              <p className='about-me__website-cursor'>&#8599;</p>
            </a>
          </li>
          <li className='about-me__portfolio-item'>
            <a
              className='about-me__website'
              href='https://carl0slit0s.github.io/russian-travel/'
              target='_blank'
              rel='noreferrer'
            >
              Адаптивный сайт
              <p className='about-me__website-cursor'>&#8599;</p>
            </a>
          </li>
          {/* удалил из яндекс облака, чтобы деньги не ел */}
          {/* <li className='about-me__portfolio-item'>
            <a className='about-me__website' href='#' target='_blank'>
              Одностраничное приложение
              <span className='about-me__website-cursor'>&#8599;</span>
            </a>
          </li> */}
        </ul>
      </div>
    </section>
  );
}
