import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSubmit }) {
  const [searchHappened, setSearchHappened] = useState(false);
  function searchMovies(e) {
    e.preventDefault();
    setSearchHappened(true);
  }

  return (
    <div className='search'>
      <form className='search__form' onSubmit={onSubmit}>
        <fieldset className='search__fieldset'>
          <input placeholder='Фильм' className='search__input' required />
          <button type='submit' className='search__submit'>
            Найти
          </button>
        </fieldset>
        <fieldset className='search__fieldset'>
          <p className='search__switch-name'>
            <label className='search__switch'>
              <input className='search__radio' type='checkbox' />
              <span className='search__radio-label'></span>
            </label>
            Короткометражки
          </p>
        </fieldset>
      </form>
    </div>
  );
}
