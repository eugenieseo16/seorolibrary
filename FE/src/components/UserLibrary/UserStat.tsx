import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { RiChatQuoteLine, RiFileList3Line, RiBookOpenLine } from 'react-icons/ri';

import './UserStat.styles.scss'

function UserStat() {
  const navigate = useNavigate();

  return(
    <div className="user-stat-summary">
    <div className="community" onClick={() => navigate(`/profile/log`, { state: 'club'})}>
      <p>참여 모임 수</p>
      <RiBookOpenLine size={'1.5rem'}/>
      <br />
      <p>3개</p>
    </div>
    <div className="vertical-line"></div>

    <div className="review" onClick={() => navigate(`/profile/log`, { state: 'review'})}>
      <p>독서 리뷰</p>
      <RiFileList3Line size={'1.5rem'} />
      <br />
      <p>5개</p>
    </div>
    <div className="vertical-line"></div>
      <div className="comment" onClick={() => navigate(`/profile/log`, { state: 'comment'})}>
        <p>한줄평</p>
        <RiChatQuoteLine size={'1.5rem'} />
        <br />
        <p>16개</p>
      </div>
    </div>);
}
export default UserStat;