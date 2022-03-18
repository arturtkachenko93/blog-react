import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert } from 'antd';

const NotFound = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/');
  };

  return (
    <Alert
      message="404"
      type="warning"
      closable
      onClose={onClose}
    />
  );
};

export default NotFound;
