import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../hoc/AuthProvider';
import { getLoginUser } from '../../api/api';
import styles from '../SignUp/SignUp.module.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const formSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required()
        .email('email is not correct'),
      password: Yup.string()
        .required()
        .min(6, 'Password length should be at least 6 characters')
        .max(40, 'Password cannot exceed more than 40 characters'),
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const loginUser = (data) => {
    const userData = {};
    userData.user = data;
    getLoginUser(userData)
      .then((res) => {
        if (res.errors) {
          setError('emailpass', {
            type: 'server',
            message: 'email or password is invalid',
          });
          return;
        }
        signin(JSON.stringify(res.user), () => navigate(fromPage, { replace: true }));
        localStorage.setItem('auth', JSON.stringify(res.user));
      });
  };

  const isErrorClasses = {
    emailError: errors.email,
    passwordError: errors.password,
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles['signup-title']}>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit(loginUser)}>
        <ul className={styles['form-list']}>
          <li>
            <label>
              Email address
              <input
                className={[isErrorClasses.emailError || errors.emailpass ? styles.error : ''].join('')}
                {...register('email', {
                  required: true,
                })}
                placeholder="Email address"
              />
            </label>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </li>
          <li style={{ position: 'relative' }}>
            <label>
              Password
              <input
                className={[isErrorClasses.passwordError ? styles.error : ''].join('')}
                {...register('password', {
                  required: true,
                })}
                type="password"
                placeholder="Password"
              />
            </label>
            {errors.emailpass && <p className={[styles.error]}>{errors.emailpass.message}</p>}
          </li>
        </ul>
        <button type="submit">Login</button>
        <p className={styles['sign-link']}>
          Don’t have an account?
          <Link to="/sign-in">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
