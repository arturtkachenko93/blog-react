import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getArticleSlug, createArticle, getEditArticle } from '../../api/api';
import { AuthContext } from '../../hoc/AuthProvider';

import styles from './CreateArticle.module.scss';

const CreateArticle = () => {
  const [dataArticle, setDataArticle] = useState({
    article: {},
    loading: true,
  });
  const { user } = useContext(AuthContext);
  const [noacces, setNoAcces] = useState(false);

  const {
    slug,
    edit,
  } = useParams();

  const navigate = useNavigate();

  const isEdit = edit === 'edit';

  const formSchema = Yup.object()
    .shape(
      {
        title: Yup.string()
          .required()
          .min(1, 'Title is not correct'),
        description: Yup.string()
          .required(),
        body: Yup.string()
          .required(),
      },
    );

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [{ tag: '' }],
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'tagList',
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isEdit) {
      getArticleSlug(slug)
        .then((res) => {
          setDataArticle({
            article: res,
            loading: false,
          });
          if (JSON.parse(user).username !== res.article.author.username || !JSON.parse(user).username) {
            setNoAcces(true);
            // eslint-disable-next-line no-useless-return
            return;
          }
          setNoAcces(false);
        });
    }
  }, []);

  useEffect(() => {
    if (noacces) {
      navigate('/');
    }
  }, [noacces]);

  useEffect(() => {
    if (dataArticle.article) {
      reset({
        title: dataArticle.article?.article?.title,
        description: dataArticle.article?.article?.description,
        body: dataArticle.article?.article?.body,
        tagList: dataArticle.article?.article?.tagList.reduce((acc, tag) => {
          acc.push({ tag });
          return acc;
        }, []),
      });
    }
  }, [dataArticle.article]);

  const onSubmit = (data) => {
    const articleData = {};
    articleData.article = data;
    const { article } = articleData;
    article.tagList = article.tagList.map((tag) => (tag.tag));
    if (isEdit) {
      getEditArticle(slug, articleData, JSON.parse(localStorage.auth).token)
        .then((res) => {
          if (res) navigate('/');
        });
      return;
    }
    createArticle(articleData, JSON.parse(localStorage.auth).token)
      .then(() => navigate('/'));
  };

  const isErrorClasses = {
    titleError: errors.title,
    descriptionError: errors.description,
    bodydError: errors.body,
  };

  return (
    <section className={styles['create-article']}>
      <h2 className={styles.title}>{isEdit ? 'Edit article' : 'Create new article'}</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={styles['form-wrapper']}>
          <legend className={styles['visually-hidden']}>Create article data</legend>
          <ul className={styles['form-list']}>
            <li>
              <label htmlFor="title">
                Title
                <input
                  className={isErrorClasses.titleError ? styles.error : ''}
                  type="text"
                  placeholder="Title"
                  {...register('title', { required: true })}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
              </label>
            </li>
            <li>
              <label htmlFor="description">
                Short description
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="description"
                      className={isErrorClasses.descriptionError ? styles.error : ''}
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  )}
                />
                {errors.description && <p className={styles.error}>{errors.description.message}</p>}
              </label>
            </li>
            <li>
              <label htmlFor="text">
                Text
                <Controller
                  name="body"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="text"
                      className={isErrorClasses.textError ? styles.error : ''}
                      type="text"
                      placeholder="Text"
                      {...field}
                    />
                  )}
                />
                {errors.body && <p className={styles.error}>{errors.body.message}</p>}
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset className={styles['tags-wrapper']}>
          <legend className={styles['visually-hidden']}>Add tags on post</legend>
          <ul className={styles['tags-list']}>
            {fields.map((item, index) => (
              <li key={item.id}>
                <Controller
                  render={({ field }) => <input {...field} />}
                  name={`tagList.${index}.tag`}
                  control={control}
                />
                <button
                  className={[styles.button, styles['del-btn'], !(fields.length > 1) ? styles.disabled : ''].join(' ')}
                  type="button"
                  onClick={() => remove(index)}
                  disabled={!(fields.length > 1)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className={[styles.button, styles['add-btn']].join(' ')}
            type="button"
            onClick={() => {
              append({
                tag: '',
              });
            }}
          >
            Add tag
          </button>
        </fieldset>
        <button className={styles['submit-btn']} type="submit">Send</button>
      </form>
    </section>
  );
};

export default CreateArticle;
