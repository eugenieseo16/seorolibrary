import React from 'react';
import { RiChatQuoteLine, RiFileList3Line, RiBookOpenLine } from 'react-icons/ri';

import './BookStat.styles.scss'

function BookStat() {
  return(
    <div className="book-stat-summary">
    <div className="community">
      <p>읽은 사람 수</p>
      <RiBookOpenLine size={'1.5rem'}/>
      <br />
      <p>21명</p>
    </div>
    <div className="vertical-line"></div>
    <div className="comment">
      <p>한줄평</p>
      <RiChatQuoteLine size={'1.5rem'} />
      <br />
      <p>16개</p>
    </div>
    <div className="vertical-line"></div>
    <div className="review">
      <p>독서 리뷰</p>
      <RiFileList3Line size={'1.5rem'} />
      <br />
      <p>5개</p>
    </div>
    </div>);
}
export default BookStat;