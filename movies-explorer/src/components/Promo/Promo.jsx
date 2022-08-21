import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

export default function Promo() {
  return (
    <section className='bunner'>
      <div className='bunner__conteiner'>
        <h1 className='bunner__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </section>
  );
}
