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

export {
  getArticles, getArticleSlug, getRegisterUser, getLoginUser,
};
