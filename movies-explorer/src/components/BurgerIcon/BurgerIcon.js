import React, { useState } from 'react';
import './BurgerIcon.css';

export default function BurgerIcon({ changeStatusMenu }) {
  return (
    <div onClick={changeStatusMenu} className='burger-icon'>
      <span />
    </div>
  );
}
