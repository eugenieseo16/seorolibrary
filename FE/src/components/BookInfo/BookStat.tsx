import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  RiChatQuoteLine,
  RiFileList3Line,
  RiBookOpenLine,
} from 'react-icons/ri';

import './BookStat.styles.scss';
import { bookDetailAPI } from '@src/API/BookAPI';
function BookStat() {
  const navigate = useNavigate();
  const location = useLocation();

  const isbn = location.pathname.replace('/book/', '');
  const data = bookDetailAPI(isbn);

  return (
    <div className="book-stat-summary">
      {/* navigate parameter에 book id 부분 바꿔줘야함 */}
      <div
        className="community"
        onClick={() => navigate(`/book/${isbn}/log`, { state: 'reader' })}
      >
        <h2>읽은 유저 수</h2>
        <RiBookOpenLine size={'1.5rem'} />
        <br />
        <p>{data?.countReader}명</p>
      </div>
      <div className="vertical-line"></div>
      {/* navigate parameter에 book id 부분 바꿔줘야함 */}
      <div
        className="comment"
        onClick={() => navigate(`/book/0/log`, { state: 'comment' })}
      >
        <h2>한줄평</h2>
        <RiChatQuoteLine size={'1.5rem'} />
        <br />
        <p>{data?.countComment}개</p>
      </div>
      <div className="vertical-line"></div>
      {/* navigate parameter에 book id 부분 바꿔줘야함 */}
      <div
        className="review"
        onClick={() => navigate(`/book/0/log`, { state: 'review' })}
      >
        <h2>독서 리뷰</h2>
        <RiFileList3Line size={'1.5rem'} />
        <br />
        <p>{data?.countReview}개</p>
      </div>
    </div>
  );
}
export default BookStat;
