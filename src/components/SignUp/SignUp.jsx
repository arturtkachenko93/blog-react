import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { getRegisterUser } from '../../api/api';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const formSchema = Yup.object()
    .shape({
      username: Yup.string()
        .required()
        .min(3)
        .max(20),
      email: Yup.string()
        .required()
        .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
      password: Yup.string()
        .required()
        .min(6, 'Password length should be at least 6 characters')
        .max(40, 'Password cannot exceed more than 40 characters'),
      cpassword: Yup.string()
        .required('Passwords must match')
        .min(6, 'Password length should be at least 6 characters')
        .max(40, 'Password cannot exceed more than 40 characters')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    });
  ы;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const registerNewUser = (data) => {
    const userData = {};
    userData.user = data;
    getRegisterUser(userData)
      .then((res) => {
        if (res.errors) {
          if (res.errors.username) {
            setError('username', {
              type: 'server',
              message: 'is already taken.',
            });
          }
          if (res.errors.email) {
            setError('email', {
              type: 'server',
              message: 'is already taken.',
            });
          }
          return;
        }
        localStorage.setItem('token', res.user.token);
      });
  };

  const isErrorClasses = {
    usernameError: errors.username,
    emailError: errors.email,
    passwordError: errors.password,
    cpasswordError: errors.cpassword,
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles['signup-title']}>Create new account</h2>
      <form className={styles.form} onSubmit={handleSubmit(registerNewUser)}>
        <ul className={styles['form-list']}>
          <li>
            <label>
              Username
              <input
                className={[styles.input, isErrorClasses.usernameError ? styles.error : ''].join('')}
                {...register('username', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                type="text"
                placeholder="Username"
              />
            </label>
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </li>
          <li>
            <label>
              Email address
              <input
                className={[styles.input, isErrorClasses.emailError ? styles.error : ''].join('')}
                {...register('email', {
                  required: true,
                  pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
                })}
                placeholder="Email address"
              />
            </label>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </li>
          <li>
            <label>
              Password
              <input
                className={[styles.input, isErrorClasses.passwordError ? styles.error : ''].join('')}
                {...register('password')}
                name="password"
                type="password"
                placeholder="Password"
              />
            </label>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </li>
          <li>
            <label>
              Repeat Password
              <input
                className={[styles.input, isErrorClasses.cpasswordError ? styles.error : ''].join('')}
                {...register('cpassword')}
                name="cpassword"
                type="password"
                placeholder="Password"
              />
            </label>
            {errors.cpassword && <p className={styles.error}>{errors.cpassword.message}</p>}
          </li>
        </ul>
        <span className={styles.line} />
        <label className={styles['label-checkbox']}>
          <input type="checkbox" required />
          I agree to the processing of my personal
          information
        </label>
        <button type="submit">Create</button>
        <p className={styles['sign-link']}>
          Already have an account?
          <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
