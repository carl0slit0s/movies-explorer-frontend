import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

import './PageNotFound.css';

export default function PageNotFound() {
  const history = useHistory();

  return (
    <div className='not-page'>
      <h3 className='not-page__title'>404</h3>
      <p className='not-page__text'>Страница не найдена</p>
      <Link className='not-page__link-back' to={'#'} onClick={() => history.goBack()}>
        Назад
      </Link>
    </div>
  );
}
