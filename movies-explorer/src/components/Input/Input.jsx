import React from 'react';
import './Input.css';

export default function Input({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
  validate,
  errorMessage
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
        maxLength={validate.maxLength}
        minLength={validate.minLength}
        required
      />
      <span className='input-error'>{errorMessage}</span>
    </label>
  );
}
