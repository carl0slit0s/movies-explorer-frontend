import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSubmit }) {
  const [formParams, setFormParams] = useState({
    movieName: '',
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmitSearch(e) {
    e.preventDefault();
    console.log(formParams);
    onSubmit(formParams, checked);
  }

  function chengeCheckbox() {
    setChecked(!checked);
    console.log(checked);
  }

  return (
    <div className='search'>
      <form className='search__form' onSubmit={handleSubmitSearch}>
        <fieldset className='search__fieldset'>
          <input
            onChange={handleChange}
            placeholder='Фильм'
            name='movieName'
            className='search__input'
            required
          />
          <button type='submit' className='search__submit'>
            Найти
          </button>
        </fieldset>
        <fieldset className='search__fieldset'>
          <p className='search__switch-name'>
            <label className='search__switch'>
              <input
                className='search__checkbox'
                type='checkbox'
                checked={checked}
                onChange={chengeCheckbox}
              />
              <span className='search__checkbox-label'></span>
            </label>
            Короткометражки
          </p>
        </fieldset>
      </form>
    </div>
  );
}
