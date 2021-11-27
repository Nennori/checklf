/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Title from '../../atoms/Title';
import Field from '../../atoms/Field';
import ButtonB from '../../molecules/ButtonB';
import SCREENS from '../../../routes/endpoints';
import { login } from '../../../redux/actions';

interface LoginFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Email is invalid').min(8).max(255).required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .required('Password is required'),
  })
  .required();

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInput>({ resolver: yupResolver(schema) });
  const onSubmit = (data: LoginFormInput) => {
    login(data)
      .then(() => {
        navigate(SCREENS.SCREEN_MAIN);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="login-form" method="post" id="login" onSubmit={handleSubmit(onSubmit)}>
      <Title header="h2">Login</Title>
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
      <ButtonB
        className="button--b"
        onClick={() => {
          return undefined;
        }}
      >
        LOGIN
      </ButtonB>
      <p>or</p>
      <ButtonB
        className="button--b-white"
        onClick={(e) => {
          e.preventDefault();
          navigate(SCREENS.SCREEN_REGISTER);
        }}
      >
        REGISTER
      </ButtonB>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (user: { email: string; password: string }) => dispatch(login(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
