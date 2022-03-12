import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../SignUp/SignUp.module.scss';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(navigate);

  const fromPage = location.state?.from?.pathname || '/';

  return (
    <div className={styles.signup}>
      <h2 className={styles['signup-title']}>Sign In</h2>
      <form className={styles.form} action="#" method="post">
        <ul className={styles['form-list']}>
          <li>
            <label>
              Email address
              <input type="email" placeholder="Email address" />
            </label>
          </li>
          <li>
            <label>
              Password
              <input type="password" placeholder="Password" />
            </label>
          </li>
        </ul>
        <button type="submit">Login</button>
        <p className={styles['sign-link']}>
          Don’t have an account?
          <Link to="/sign-in">Sign Up.</Link>
        </p>
      </form>
      {fromPage}
    </div>
  );
};

export default SignIn;
