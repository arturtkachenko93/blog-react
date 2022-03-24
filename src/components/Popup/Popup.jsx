import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { getDelArticle } from '../../api/api';

const Popup = ({ children }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const confirm = () => {
    getDelArticle(slug)
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
