import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
  favoritesCount,
}) => {
  const tags = tagList.map((tag) => <li className={styles.tag} key={uniqueId('tag_')}>{tag}</li>);

  return (
    <li className={styles.article}>
      <div className={styles['col-1']}>
        <Link className={styles.title} to={`/articles/${slug}`}>{title}</Link>
        <button className={styles.like} type="button">{favoritesCount}</button>
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
