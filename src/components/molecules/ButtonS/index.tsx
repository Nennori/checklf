import React from 'react';
import Button from '../../atoms/Button';
import Title from '../../atoms/Title';

interface ButtonSProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  children: React.ReactChild;
  src?: string | undefined;
  className: string;
}

const ButtonS: React.FC<ButtonSProps> = ({ disabled = false, onClick, children, src, className }: ButtonSProps) => {
  let button;
  if (src !== undefined) {
    button = (
      <Button className={className} onClick={onClick} disabled={disabled}>
        <img className="button__image" src={src} alt="img" />
        <Title header="h6">{children}</Title>
      </Button>
    );
  } else {
    button = (
      <Button className={className} onClick={onClick} disabled={disabled}>
        <Title header="h6">{children}</Title>
      </Button>
    );
  }
  return button;
};

export default ButtonS;
