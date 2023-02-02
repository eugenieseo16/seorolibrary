import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import './UserAddressToggle.styles.scss';

const ExchangeAvailable = () => {
  const is_available = Math.floor(Math.random() * 2);
  return (
    <div>
      {is_available ? (
        <Tag icon={<CheckCircleOutlined />} color="#31C454">
          바꿔읽기 가능
        </Tag>
      ) : (
        <Tag icon={<CloseCircleOutlined />} color="error">
          바꿔읽기 불가
        </Tag>
      )}
    </div>
  );
};

export default ExchangeAvailable;
