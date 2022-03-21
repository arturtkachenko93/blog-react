import React, { useState, useEffect } from 'react';
import uniqueId from 'lodash.uniqueid';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getArticles } from '../../api/api';
import 'antd/dist/antd.min.css';

import styles from './Articles.module.scss';
import Article from '../Article';

const Articles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(1);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setLoading(true);
    getArticles(currentPage)
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [currentPage]);

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
                favoritesCount={favoritesCount}
              />
            );
          })}
      </ul>
      <Pagination
        className={styles.pagination}
        current={currentPage}
        onChange={changePage}
        total={data.articlesCount}
        showSizeChanger={false}
      />
    </>
  );
};

export default Articles;
