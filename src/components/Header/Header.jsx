import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hoc/AuthProvider';
import Logo from './Logo.png';
import styles from './Header.module.scss';
import Avatar from '../Article/Avatar.png';

const Header = () => {
  const {
    user,
    signout,
  } = useContext(AuthContext);
  useEffect(() => {

  }, [user]);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <NavLink className={[styles['header-link'], styles.logo].join(' ')} to="/">
        <img src={Logo} alt="Logo" width="200" height="63" />
      </NavLink>
      {user ? (
        <>
          <NavLink className={[styles['header-link'], styles['header-link-btn']].join(' ')} to="/create">Create article</NavLink>
          <NavLink className={styles['header-link']} to="/profile">
            {JSON.parse(user).username}
            <img src={JSON.parse(user).image || Avatar} alt="Avatar" width="46" height="46" />
          </NavLink>
          <button
            type="button"
            className={[styles['header-link'], styles['header-link-btn']].join(' ')}
            onClick={() => signout(() => navigate('/', { replace: true }))}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <NavLink className={styles['header-link']} to="/sign-in">
            Sign In
          </NavLink>
          <NavLink className={[styles['header-link'], styles['header-link-btn']].join(' ')} to="/sign-up">
            Sign Up
          </NavLink>
        </>
      )}
    </header>
  );
};

export default Header;
