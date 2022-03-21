import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { getDelArticle } from '../../api/api';
import { AuthContext } from '../../hoc/AuthProvider';

const Popup = ({ children }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const confirm = () => {
    getDelArticle(slug, JSON.parse(user).token)
      .then(() => navigate('/'));
    message.success('Article delete :D');
  };

  return (
    <Popconfirm
      placement="right"
      title="Are you sure to delete this task?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default Popup;
