import React, { useState, useEffect, useContext } from 'react';
import uniqueId from 'lodash.uniqueid';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AuthContext } from '../../hoc/AuthProvider';
import { getArticles } from '../../api/api';
import 'antd/dist/antd.min.css';

import styles from './Articles.module.scss';
import Article from '../Article';

const Articles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(1);

  const {
    user,
  } = useContext(AuthContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setLoading(true);
    getArticles(currentPage, JSON.parse(user)?.token)
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [currentPage, user]);

  const changePage = (page) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setPage(page);
  };

  return (
    <>
      <ul className={styles.articles}>
        {loading ? <Spin indicator={antIcon} />
          : data.articles.map((article) => {
            const {
              author,
              slug,
              title,
              description,
              body,
              createdAt,
              tagList,
              favorited,
              favoritesCount,
            } = article;
            return (
              <Article
                key={uniqueId('article_')}
                username={author.username}
                avatar={author.image}
                slug={slug}
                title={title}
                description={description}
                text={body}
                date={createdAt}
                tagList={tagList}
                favorited={favorited}
                favoritesCount={favoritesCount}
              />
            );
          })}
      </ul>
      <Pagination
        className={styles.pagination}
        pageSize={5}
        current={currentPage}
        onChange={changePage}
        total={data.articlesCount}
        showSizeChanger={false}
      />
    </>
  );
};

export default Articles;
