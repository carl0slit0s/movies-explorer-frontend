import React from 'react';
import './AboutProject.css';
import TitleSecond from '../TitleSecond/TitleSecond';

export default function AboutProject() {
  return (
    <section className='about' id='progect'>
      <TitleSecond text='О проекте' />
      <ul className='about__info'>
        <li className='about__item'>
          <h3 className='about__info-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__info-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about__item'>
          <h3 className='about__info-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__info-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className='chart'>
        <div className='chart__area'>
          <div className='chart__graph chart__graph_active'>1 неделя</div>
          <div className='chart__tag'>Back-end</div>
        </div>
        <div className='chart__area'>
          <div className='chart__graph'>4 недели</div>
          <div className='chart__tag'>Front-end</div>
        </div>
      </div>
    </section>
  );
}
