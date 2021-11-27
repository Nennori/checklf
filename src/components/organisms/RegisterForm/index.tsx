/* eslint-disable no-console */
import React, { useState } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Title from '../../atoms/Title';
import Field from '../../atoms/Field';
import ButtonB from '../../molecules/ButtonB';
import SCREENS from '../../../routes/endpoints';
import { register } from '../../../redux/actions';

interface RegisterFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Username is required')
      .min(2, 'Username must be at least 3 characters')
      .max(50, 'Username must be at most 50 characters'),
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  })
  .required();

const RegisterForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInput>({ resolver: yupResolver(schema) });
  const onSubmit = (data: RegisterFormInput) => {
    register(data)
      .then(() => {
        navigate(SCREENS.SCREEN_MAIN);
      })
      .catch((error) => {
        if (error.toString().includes('422')) {
          setErrorMessage('User with that email already exists');
        }
      });
  };
  return (
    <form className="register-form" method="post" id="register">
      <Title header="h2">Register</Title>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Field
            label="Username"
            placeholder="Enter username"
            id="name"
            type="text"
            errorMessage={errors.name?.message}
            invalid={!isValid}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Field
            label="Email"
            placeholder="Enter email"
            id="email"
            type="text"
            errorMessage={errors.email?.message}
            invalid={!isValid}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Field
            label="Password"
            placeholder="Enter password"
            id="password"
            type="password"
            invalid={!isValid}
            errorMessage={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="passwordConfirmation"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Field
            label="Password confirmation"
            placeholder="Repeat the password"
            id="password_confirmation"
            type="password"
            invalid={!isValid}
            errorMessage={errors.passwordConfirmation?.message}
            {...field}
          />
        )}
      />
      {errorMessage !== '' && <p>{errorMessage}</p>}
      <ButtonB className="button--b" onClick={handleSubmit(onSubmit)}>
        REGISTER
      </ButtonB>
      <p>or</p>
      <Link to={SCREENS.SCREEN_LOGIN} className="auth-link">
        <Title header="h5">LOGIN</Title>
      </Link>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  register: (user: { name: string; email: string; password: string; passwordConfirmation: string }) =>
    dispatch(register(user)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
