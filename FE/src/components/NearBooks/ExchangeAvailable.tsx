import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import './UserAddressToggle.styles.scss';

interface IExchangeAvailableProps {
  is_available: boolean;
}
const ExchangeAvailable = (is_available: IExchangeAvailableProps) => {
  return (
    <div>
      {is_available.is_available ? (
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
