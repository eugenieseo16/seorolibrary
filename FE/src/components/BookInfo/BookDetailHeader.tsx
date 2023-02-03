import React, { useState } from 'react';
  import { Button, Popover, Typography } from 'antd';

import { RiAddLine } from 'react-icons/ri';

import './BookDetailHeader.styles.scss';

function BookDetailHeader() {
  const { Title } = Typography;
  const text = (
    <div className="popover-item-container">
      <button>
        <Title level={5}>⠀⠀읽은 도서로 추가</Title>
      </button>
      <br />
      <button>
        <Title level={5}>⠀⠀보유 도서로 추가</Title>
      </button>
    </div>
  );
  
  const buttonWidth = 70;

  return (
    <div className="header-container">
      <div className="header-text">
        <h1>도서 정보</h1>
      </div>
      <div className="header-icon-container">
        <div className="header-icon-item">
          <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
            <Popover placement="bottomRight" title={text} trigger="click">
              <RiAddLine size={'2rem'}/>
            </Popover>

          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetailHeader;
