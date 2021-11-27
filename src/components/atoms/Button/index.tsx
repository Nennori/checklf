import React from 'react';

interface ButtonProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  children: React.ReactChild[] | React.ReactChild;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, onClick, children, className }: ButtonProps) => {
  return (
    <button type="submit" className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
