import React, { useState, useContext } from 'react';
import uniqueId from 'lodash.uniqueid';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { setFavorite } from '../../api/api';
import { AuthContext } from '../../hoc/AuthProvider';

import Avatar from './Avatar.png';
import styles from './Article.module.scss';

const Article = ({
  username,
  avatar,
  title,
  description,
  slug,
  date,
  tagList,
  favorited,
  favoritesCount,
}) => {
  const tags = tagList.map((tag) => (tag ? <li className={styles.tag} key={uniqueId('tag_')}>{tag}</li> : null));
  const {
    user,
  } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ state: favorited, count: favoritesCount });

  const changeLike = () => {
    const type = favorites.state ? 'DELETE' : 'POST';

    setFavorite(slug, JSON.parse(user)?.token, type)
      .then(() => {
        setFavorites((prev) => ({
          state: !prev.state,
          count: prev.state ? prev.count - 1 : prev.count + 1,
        }));
      });
  };

  return (
    <li className={styles.article}>
      <div className={styles['col-1']}>
        <Link className={styles.title} to={`/articles/${slug}`}>{title}</Link>
        <button
          className={[styles.like, favorites.state ? styles.liked : ''].join(' ')}
          type="button"
          onClick={user ? changeLike : () => { }}
        >
          {favorites.count}
        </button>
        <ul className={styles['tag-list']}>
          {tags}
        </ul>
        <p className={styles.text}>
          {description}
        </p>
      </div>
      <div className={styles['col-2']}>
        <div className={styles['user-wrapper']}>
          <h3 className={styles.name}>{username}</h3>
          <h4 className={styles.date}>{format(new Date(date), 'MMMM dd, yyyy')}</h4>
        </div>
        <img className={styles.avatar} src={Avatar && avatar} alt="Avatar" width="46" height="46" />
      </div>
    </li>
  );
};

export default Article;
