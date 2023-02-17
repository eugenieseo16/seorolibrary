import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RiChatQuoteLine,
  RiFileList3Line,
  RiBookOpenLine,
} from 'react-icons/ri';

import './BookStat.styles.scss';
import { bookDetailAPI } from '@src/API/bookAPI';
import { useUser } from '@src/hooks/useUser';

interface IBookStatProps {
  isbn: any;
}
function BookStat({ isbn }: IBookStatProps) {
  const navigate = useNavigate();
  const user = useUser();
  const data = bookDetailAPI(isbn, user?.memberId);

  return (
    <div className="book-stat-summary">
      <div
        className="community"
        onClick={() =>
          navigate(`/book/${isbn}/log`, {
            state: { isbn: isbn, selectedTab: 'reader' },
          })
        }
      >
        <h2>읽은 유저 수</h2>
        <RiBookOpenLine size={'1.5rem'} />
        <br />
        <p>{data?.countReader}명</p>
      </div>
      <div className="vertical-line"></div>
      <div
        className="comment"
        onClick={() =>
          navigate(`/book/${isbn}/log`, {
            state: { isbn: isbn, selectedTab: 'comment' },
          })
        }
      >
        <h2>한줄평</h2>
        <RiChatQuoteLine size={'1.5rem'} />
        <br />
        <p>{data?.countComment}개</p>
      </div>
      <div className="vertical-line"></div>
      <div
        className="review"
        onClick={() =>
          navigate(`/book/${isbn}/log`, {
            state: { isbn: isbn, selectedTab: 'review' },
          })
        }
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
