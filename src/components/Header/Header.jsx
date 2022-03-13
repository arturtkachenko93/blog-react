import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../hoc/AuthProvider';
import Logo from './Logo.png';
import styles from './Header.module.scss';

const Header = () => {
  // const [user, setUser] = useState(false);

  // useEffect(() => {
  //   try {
  //     const userLS = JSON.parse(localStorage.user);
  //     if (userLS) {
  //       setUser(true);
  //     }
  //   } catch {
  //     console.log('Юзер не авторизован!');
  //   }
  // }, [user]);
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <NavLink className={[styles['header-link'], styles.logo].join(' ')} to="/">
        <img src={Logo} alt="Logo" width="200" height="63" />
      </NavLink>
      {user ? (<><NavLink className={styles['header-link']} to="/create">Create article</NavLink><NavLink className={styles['header-link']} to="/profile">John Doe</NavLink><button type="button" className={styles['header-link']} onClick={() => signout(() => navigate('/', { replace: true }))}>Log out</button></>) : (<><NavLink className={styles['header-link']} to="/sign-in">Sign In</NavLink><NavLink className={[styles['header-link'], styles['header-link-btn']].join(' ')} to="/sign-up">Sign Up</NavLink></>)}
    </header>
  );
};

export default Header;
