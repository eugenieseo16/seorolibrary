import React from 'react';

import { RiChatQuoteLine, RiFileList3Line } from 'react-icons/ri';

import './DataGrid.styles.scss';

function DataGrid() {
  return (
    <div>
      <div className="book-info-summary">
        <div className="community">
          읽은 유저 수
          <br />명
        </div>
        <div className="vertical-line"></div>

        <div className="comment">
          <p>한줄평</p>
          <RiChatQuoteLine size={'1.5rem'} />
          <br />개
        </div>
        <div className="vertical-line"></div>

        <div className="review">
          <p>독서 리뷰</p>
          <RiFileList3Line size={'1.5rem'} />
          <br />개
        </div>
      </div>
    </div>
  );
}

export default DataGrid;
