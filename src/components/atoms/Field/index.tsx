import React from 'react';

type Props = {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  errorMessage?: string | undefined;
  invalid: boolean;
  value: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
};

const Field: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, type, name, id, errorMessage = undefined, invalid, value, onChange }: Props, ref) => {
    const inputClass = invalid && errorMessage !== undefined ? 'field__input--error' : '';
    return (
      <div className="field">
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`field__input ${inputClass}`}
          id={id}
          placeholder={placeholder}
        />
        {invalid && errorMessage !== undefined && <p className="field__error-message">{errorMessage}</p>}
      </div>
    );
  },
);

export default Field;
