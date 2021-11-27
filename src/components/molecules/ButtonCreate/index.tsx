import React from 'react';
import Button from '../../atoms/Button';
import CreateButtonIcon from '../../../assets/images/create-button-pink.svg';

interface ButtonCreateProps {
  onClick: React.MouseEventHandler<HTMLElement>;
}

const ButtonCreate: React.FC<ButtonCreateProps> = ({ onClick }: ButtonCreateProps) => {
  return (
    <li className="create-button">
      <Button onClick={onClick} className="create-button__button">
        <img src={CreateButtonIcon} alt="create" className="create-button__icon" />
      </Button>
    </li>
  );
};

export default ButtonCreate;
