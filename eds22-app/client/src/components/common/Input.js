import React from 'react';
import '../../styles/components.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  options = [],
  rows = 3
}) => {
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className="form-textarea"
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-select"
        >
          <option value="">Sélectionner...</option>
          {options.map((option) => (
            <option
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="form-input"
      />
    );
  };

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      {renderInput()}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;
