import React from 'react';
import './Input.css';

export default function Input({ type, name, placeholder, label }) {
  return (
    <label className='label'>{label}
      <input className='input' type={type} name={name} id={name} placeholder={placeholder} />
    </label>
  );
}
