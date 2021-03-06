import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import uniqueId from 'lodash.uniqueid';
import { format } from 'date-fns';
import Popup from '../Popup/Popup';
import { getArticleSlug, setFavorite } from '../../api/api';
import { AuthContext } from '../../hoc/AuthProvider';
import styles from '../Article/Article.module.scss';
import Avatar from '../Article/Avatar.png';

const ArticleMarkdown = () => {
  const [data, setData] = useState([]);
  const {
    user,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({
    state: false,
    count: 0,
  });
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getArticleSlug(slug)
      .then((res) => {
        if (res === 404) {
          navigate('/');
          return;
        }
        if (isMounted) {
          setData(res);
          setLoading(false);
        }

        setFavorites({
          state: res.article.favorited,
          count: res.article.favoritesCount,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeLike = () => {
    const type = favorites.state ? 'DELETE' : 'POST';

    setFavorite(slug, type)
      .then(() => {
        setFavorites((prev) => ({
          state: !prev.state,
          count: prev.state ? prev.count - 1 : prev.count + 1,
        }));
      });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const tags = loading
    || data.article.tagList.map((tag) => (tag
      ? (
        <li className={styles.tag} key={uniqueId('tag_')}>
          {tag}
        </li>
      ) : null
    ));

  const btnsUser = data.article?.author?.username === JSON.parse(user)?.username ? (
    <div className={styles['user-btns']}>
      <Popup>
        <button className={styles.delete} type="button">Delete</button>
      </Popup>
      <button
        className={styles.edit}
        type="button"
        onClick={() => {
          navigate(`/articles/${slug}/edit`);
        }}
      >Edit
      </button>
    </div>
  ) : null;

  // eslint-disable-next-line no-nested-ternary
  return loading ? (
    <Spin indicator={antIcon} />
  ) : (
    <article className={styles.article} style={{ marginTop: '25px' }}>
      <div className={styles['col-1']}>
        <h2 className={styles.title}>{data.article.title}</h2>
        <button
          className={[styles.like, favorites.state ? styles.liked : ''].join(' ')}
          type="button"
          onClick={user ? changeLike : () => {
          }}
        >
          {favorites.count}
        </button>
        <ul className={styles['tag-list']}>{tags}</ul>
        <p className={styles.text}>{data.article.description}</p>
      </div>
      <div className={styles['col-2']}>
        <div className={styles['user-wrapper']}>
          <h3 className={styles.name}>{data.article.author.username}</h3>
          <h4 className={styles.date}>{format(new Date(data.article.createdAt), 'MMMM dd, yyyy')}</h4>
          {user ? btnsUser : null}
        </div>
        <img className={styles.avatar} src={Avatar && data.article.author.image} alt="Avatar" width="46" height="46" />
      </div>
      <div className={styles.markdown}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.article.body}</ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleMarkdown;
