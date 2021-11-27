/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  id: number;
  onCheckboxDown: React.KeyboardEventHandler<HTMLElement>;
  onCheckboxClick: React.MouseEventHandler<HTMLElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, id, onCheckboxDown, onCheckboxClick }: CheckboxProps) => {
  return (
    <label className="checkbox__container" htmlFor={`checkin.${id}`}>
      <input
        name="checkin"
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={() => {
          return undefined;
        }}
      />
      <span
        id={`check${id}`}
        tabIndex={0}
        aria-checked={checked}
        role="checkbox"
        className="checkbox__checkmark"
        onKeyDown={onCheckboxDown}
        onClick={onCheckboxClick}
      />
    </label>
  );
};

export default Checkbox;
