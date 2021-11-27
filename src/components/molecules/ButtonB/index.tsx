import React from 'react';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';

interface ButtonBProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  children: React.ReactChild;
  className?: string;
}

const ButtonS: React.FC<ButtonBProps> = ({ onClick, children, disabled = false, className = '' }: ButtonBProps) => {
  return (
    <Button className={className} onClick={onClick} disabled={disabled}>
      <Title header="h5">{children}</Title>
    </Button>
  );
};

export default ButtonS;
