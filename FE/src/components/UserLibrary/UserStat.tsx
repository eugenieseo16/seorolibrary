import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RiChatQuoteLine,
  RiFileList3Line,
  RiBookOpenLine,
} from 'react-icons/ri';

import './UserStat.styles.scss';

function UserStat({ libraryData }: any) {
  const navigate = useNavigate();
  console.log('여기 여기 여기', libraryData);

  return (
    <div className="user-stat-summary">
      <div
        className="community"
        onClick={() =>
          navigate(`/profile/log/${libraryData.memberInfo.memberId}`, {
            state: 'club',
          })
        }
      >
        <h2>참여 모임 수</h2>
        <RiBookOpenLine size={'1.5rem'} />
        <br />
        <p>{libraryData?.myGroups?.length}개</p>
      </div>
      <div className="vertical-line"></div>

      <div
        className="review"
        onClick={() =>
          navigate(`/profile/log/${libraryData.memberInfo.memberId}`, {
            state: 'review',
          })
        }
      >
        <h2>독서 리뷰</h2>
        <RiFileList3Line size={'1.5rem'} />
        <br />
        <p>{libraryData?.myReview}개</p>
      </div>
      <div className="vertical-line"></div>
      <div
        className="comment"
        onClick={() =>
          navigate(`/profile/log/${libraryData.memberInfo.memberId}`, {
            state: 'comment',
          })
        }
      >
        <h2>한줄평</h2>
        <RiChatQuoteLine size={'1.5rem'} />
        <br />
        <p>{libraryData?.myOwnComment}개</p>
      </div>
    </div>
  );
}
export default UserStat;
