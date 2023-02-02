import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Divider, Space, Tag } from 'antd';

import './UserAddressToggle.styles.scss';

const ExchangeAvailable = () => {
  return (
    <div>
      <Tag icon={<CheckCircleOutlined />} color="#31C454">
        바꿔읽기 가능
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error">
        바꿔읽기 불가
      </Tag>
    </div>
  );
};

export default ExchangeAvailable;
