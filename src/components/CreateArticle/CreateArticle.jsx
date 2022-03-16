import React, { useState } from 'react';
import styles from './CreateArticle.module.scss';

const CreateArticle = () => {
  const [tags, setTags] = useState([]);

  const addTag = () => {
    setTags([...tags, { placeholder: 'Tag', button: 'Delete' }]);
  };

  const delTag = () => {
    setTags([...tags, { placeholder: 'Tag', button: 'Delete' }]);
  };

  const tagsList = tags.map((item) => (
    <p>
      <input id="tag" type="text" placeholder={item.placeholder} />
      <button className={styles['del-btn']} type="button" onClick={delTag}>{item.button}</button>
    </p>
  ));

  return (
    <section className={styles['create-article']}>
      <h2 className={styles.title}>Create new article</h2>
      <form className={styles.form} onSubmit={() => { }}>
        <fieldset className={styles['form-wrapper']}>
          <legend className={styles['visually-hidden']}>Create article data</legend>
          <ul className={styles['form-list']}>
            <li>
              <label htmlFor="title">
                Title
                <input id="title" type="text" placeholder="Title" />
              </label>
            </li>
            <li>
              <label htmlFor="short-title">
                Short description
                <input id="short-title" type="text" placeholder="Title" />
              </label>
            </li>
            <li>
              <label htmlFor="text">
                Text
                <textarea id="text" type="text" placeholder="Text" />
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend className={styles['visually-hidden']}>Add tags on post</legend>
          <div className={styles['tags-wrapper']}>
            <label htmlFor="tag">
              Tags
              <p>
                <input id="tag" type="text" placeholder="Tag" />
                <button className={[styles['del-btn'], styles.disabled].join(' ')} type="button">Delete</button>
              </p>
              {tagsList || null}
            </label>
            <button className={styles['add-btn']} type="button" onClick={addTag}>Add tag</button>
          </div>
        </fieldset>
        <button className={styles['submit-btn']} type="submit">Send</button>
      </form>
    </section>
  );
};

export default CreateArticle;
