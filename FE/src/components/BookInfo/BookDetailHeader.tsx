import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Popover, Typography } from 'antd';

import { RiAddLine } from 'react-icons/ri';

import './BookDetailHeader.styles.scss';

function BookDetailHeader() {
  const navigate = useNavigate();

  const { Title } = Typography;
  const text = (
    <div className="popover-item-container">
      {/* 나의 도서관으로 이동 */}
      {/* 읽은 도서 추가 API 데이터 보내기 */}
      <button onClick={() => navigate(`/profile`)}>
        <Title level={5}>⠀⠀읽은 도서로 추가</Title>
      </button>
      <br />
      {/* 보유도서 추가 페이지로 이동, 제목이랑 저자명만 보내기 */}
      <button
        onClick={() =>
          navigate(`/profile/register`, {
            state: { title: 'title', author: 'author' },
          })
        }
      >
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
          <div
            style={{
              marginLeft: buttonWidth,
              clear: 'both',
              whiteSpace: 'nowrap',
            }}
          >
            <Popover placement="bottomRight" title={text} trigger="click">
              <RiAddLine size={'2rem'} />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailHeader;
