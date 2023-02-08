import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RiChatQuoteLine, RiFileList3Line, RiBookOpenLine } from 'react-icons/ri';

import './BookStat.styles.scss'

function BookStat() {
  const navigate = useNavigate();
  return(
    <div className="book-stat-summary">
    <div className="community" onClick={() => navigate(`log`, {state: 'reader'})}>
      <h2>읽은 유저 수</h2>
      <RiBookOpenLine size={'1.5rem'}/>
      <br />
      <p>21명</p>
    </div>
    <div className="vertical-line"></div>
    <div className="comment" onClick={() => navigate(`log`, {state: 'comment'})}>
      <h2>한줄평</h2>
      <RiChatQuoteLine size={'1.5rem'} />
      <br />
      <p>16개</p>
    </div>
    <div className="vertical-line"></div>
    <div className="review" onClick={() => navigate(`log`, {state: 'review'})}>
      <h2>독서 리뷰</h2>
      <RiFileList3Line size={'1.5rem'} />
      <br />
      <p>5개</p>
    </div>
    </div>);
}
export default BookStat;