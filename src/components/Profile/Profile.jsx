import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../hoc/AuthProvider';
import { getEditUser, getUser } from '../../api/api';

import styles from '../SignUp/SignUp.module.scss';

const Profile = () => {
  const {
    user,
    signin,
  } = useContext(AuthContext);

  const [userImg, setUserImg] = useState();
  const navigate = useNavigate();

  const formSchema = Yup.object()
    .shape(
      {
        username: Yup.string()
          .required()
          .min(3)
          .max(20),
        email: Yup.string()
          .required()
          .email('email is not correct'),
        password: Yup.string()
          .nullable()
          .notRequired()
          .when('password', {
            is: (value) => value?.length,
            then: (rule) => rule.min(6, 'Password length should be at least 6 characters')
              .max(40, 'Password cannot exceed more than 40 characters'),
          }),
        image: Yup
          .string()
          .nullable()
          .notRequired()
          .when('image', {
            is: (value) => value?.length,
            then: (rule) => rule
              .url('Input correct image URL')
              .matches(/\.(jpg|jpeg|png|webp|bmp|avif|gif|svg)$/, 'Input correct image URL'),
          }),
      },
      [
        ['password', 'password'],
        ['image', 'image'],
      ],
    );

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
    setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: JSON.parse(user).username,
      email: JSON.parse(user).email,
      password: '',
      image: '',
    },
  });

  useEffect(() => {
    getUser()
      .then((res) => setUserImg(res.user?.image));
    reset({
      image: userImg,
    });
  }, [userImg]);

  useEffect(() => {
    if (errors?.image) {
      setError('image', {
        type: 'server',
        message: 'Input correct image URL',
      });
    }
  }, [errors]);

  const registerNewUser = (data) => {
    const userData = {};
    userData.user = data;
    const {
      username,
      email,
      password,
      image,
    } = userData.user;

    getEditUser(username, email, password, image)
      .then((res) => {
        if (res === 422) {
          setError('image', {
            type: 'server',
            message: 'Input correct image URL :D',
          });

          return;
        }
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
        signin(JSON.stringify(res.user), () => navigate('/', { replace: true }));
        localStorage.setItem('auth', JSON.stringify(res.user));
      });
  };

  const isErrorClasses = {
    usernameError: errors.username,
    emailError: errors.email,
    passwordError: errors.password,
    imageError: errors.image,
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles['signup-title']}>Edit Profile</h2>
      <form className={styles.form} onSubmit={handleSubmit(registerNewUser)}>
        <ul className={styles['form-list']}>
          <li>
            <label htmlFor="username">
              Username
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    id="username"
                    className={[styles.input, isErrorClasses.usernameError ? styles.error : ''].join('')}
                    type="text"
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
            </label>
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </li>
          <li>
            <label htmlFor="username">
              Email address
              <Controller
                id="email"
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    id="email"
                    className={[styles.input, isErrorClasses.emailError ? styles.error : ''].join('')}
                    type="text"
                    placeholder="Email address"
                    {...field}
                  />
                )}
              />
            </label>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </li>
          <li>
            <label htmlFor="password">
              New password
              <Controller
                id="password"
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    id="password"
                    className={[styles.input, isErrorClasses.passwordError ? styles.error : ''].join('')}
                    type="password"
                    placeholder="New password"
                    {...field}
                  />
                )}
              />
            </label>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </li>
          <li>
            <label htmlFor="image">
              Avatar image (url)
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    id="image"
                    type="text"
                    className={[styles.input, isErrorClasses.imageError ? styles.error : ''].join('')}
                    placeholder="Avatar image"
                    {...field}
                  />
                )}
              />
            </label>
            {errors.image && <p className={styles.error}>{errors.image.message}</p>}
          </li>
        </ul>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;
