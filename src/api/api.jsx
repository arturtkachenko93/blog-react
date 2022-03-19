const baseUrl = 'https://kata.academy:8021/api';

const getArticles = async (page) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles?limit=5&offset=${page * 5 - 5}`);
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getArticleSlug = async (slug) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}`);
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
const getUser = async (token) => {
  try {
    const resolve = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getEditUser = async (username, email, password, image, token) => {
  try {
    const resolve = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
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
    throw new Error(err);
  }
};

const createArticle = async (article, token) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const getEditArticle = async (slug, article, token) => {
  try {
    const resolve = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  getArticles, getArticleSlug, getRegisterUser, getLoginUser, getUser, getEditUser, createArticle, getEditArticle,
};
