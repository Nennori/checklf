import React from 'react';
import TrashIcon from '../../../assets/images/trash.svg';

interface ButtonTrashProps {
  onClick: React.MouseEventHandler<HTMLElement>;
}

const ButtonTrash: React.FC<ButtonTrashProps> = ({ onClick }: ButtonTrashProps) => {
  return (
    <button className="button-trash" type="submit" onClick={onClick}>
      <img className="button-trash__icon" src={TrashIcon} alt="trash" />
    </button>
  );
};

export default ButtonTrash;
