import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Typography } from 'antd';
import { MdOutlineEditLocationAlt } from 'react-icons/md';
import { faker } from '@faker-js/faker';

import './UserAddressToggle.styles.scss';

function UserAddressToggle() {
  const location1 = faker.address.city();
  const location2 = faker.address.city();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <h6>{location1}</h6>,
    },
    {
      key: '2',
      label: <h6>{location2}</h6>,
    },
  ];

  return (
    <Dropdown
      menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }}
      trigger={['click']}
      className="location-container"
    >
      <Typography.Link>
        <h2>
          {location1}
          &nbsp;
          <MdOutlineEditLocationAlt />
        </h2>
      </Typography.Link>
    </Dropdown>
  );
}

export default UserAddressToggle;
