import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './Logo.png';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <NavLink className={[styles['header-link'], styles.logo].join(' ')} to="/">
      <img src={Logo} alt="Logo" width="200" height="63" />
    </NavLink>
    <NavLink className={styles['header-link']} to="/sign-in">Sign In</NavLink>
    <NavLink className={[styles['header-link'], styles['header-link-btn']].join(' ')} to="/sign-up">Sign Up</NavLink>
  </header>
);

export default Header;
