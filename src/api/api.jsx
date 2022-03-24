import { isImage } from '../utils/isImage';
import { getTokenFromLocalStorage } from '../utils/getTokenFromLocalStorage';

const baseUrl = 'https://kata.academy:8021/api';

const getArticles = async (page) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles?limit=5&offset=${page * 5 - 5}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
    });
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getArticleSlug = async (slug) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
    });
    if (!resolve.ok) {
      return resolve.status;
    }
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getRegisterUser = async (user) => {
  try {
    const resolve = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getLoginUser = async (user) => {
  try {
    const resolve = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

// eslint-disable-next-line consistent-return
const getUser = async () => {
  try {
    const resolve = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
    });
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getEditUser = async (username, email, password, image) => {
  try {
    const imageChecked = await isImage(image);
    if (!imageChecked && image) {
      const error = new Error();
      error.code = 422;
      throw error;
    }
    const resolve = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
      body: JSON.stringify({
        user: {
          email,
          username,
          image: image || undefined,
          password: password || undefined,
        },
      }),
    });
    const json = await resolve.json();
    return json;
  } catch (err) {
    if (err.code === 422) return err.code;
    throw new Error(err);
  }
};

const createArticle = async (article) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(article),
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getEditArticle = async (slug, article) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(article),
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getDelArticle = async (slug) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
    });
    return resolve;
  } catch (err) {
    throw new Error(err);
  }
};

const setFavorite = async (slug, type) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getTokenFromLocalStorage()}`,
      },
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  getArticles, getArticleSlug, getRegisterUser, getLoginUser, getUser, getEditUser, createArticle, getEditArticle, getDelArticle, setFavorite,
};
