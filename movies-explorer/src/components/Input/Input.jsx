import React from 'react';
import './Input.css';

export default function Input({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
}) {
  return (
    <label className='label'>
      {label}
      <input
        className='input'
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
