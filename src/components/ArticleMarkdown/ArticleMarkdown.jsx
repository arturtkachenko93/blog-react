import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import uniqueId from 'lodash.uniqueid';
import { format } from 'date-fns';
import { getArticleSlug } from '../../api/api';
import styles from '../Article/Article.module.scss';
import Avatar from '../Article/Avatar.png';

const ArticleMarkdown = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getArticleSlug(slug).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [slug]);
  console.log(data.article);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const tags = loading
    || data.article.tagList.map((tag) => (
      <li className={styles.tag} key={uniqueId('tag_')}>
        {tag}
      </li>
    ));

  return loading ? (
    <Spin indicator={antIcon} />
  ) : (
    <article className={styles.article} style={{ marginTop: '25px' }}>
      <div className={styles['col-1']}>
        <h2 className={styles.title}>{data.article.title}</h2>
        <button className={styles.like} type="button">
          {data.article.favoritesCount}
        </button>
        <ul className={styles['tag-list']}>{tags}</ul>
        <p className={styles.text}>{data.article.description}</p>
      </div>
      <div className={styles['col-2']}>
        <div className={styles['user-wrapper']}>
          <h3 className={styles.name}>{data.article.author.username}</h3>
          <h4 className={styles.date}>{format(new Date(data.article.createdAt), 'MMMM dd, yyyy')}</h4>
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
