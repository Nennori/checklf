import React from 'react';
import LoginForm from '../../organisms/LoginForm';
import RegisterForm from '../../organisms/RegisterForm';
import Title from '../../atoms/Title';

interface AuthTemplateProps {
  type: string;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ type }: AuthTemplateProps) => {
  let form;
  switch (type) {
    case 'login':
      form = <LoginForm />;
      break;
    case 'register':
      form = <RegisterForm />;
      break;
    default:
      form = <LoginForm />;
  }

  return (
    <div className="auth">
      <div className="auth__title">
        <Title header="h1">CheckList</Title>
      </div>
      {form}
    </div>
  );
};

export default AuthTemplate;
