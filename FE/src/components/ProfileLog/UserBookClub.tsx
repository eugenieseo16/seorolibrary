import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

import { BiMap } from 'react-icons/bi';
import './UserBookClub.styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { apiBaseUrl } from '@src/API/apiUrls';

function UserBookClub() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const clubs = useMyQuery(`${apiBaseUrl}/librarys/${userId}/groups`);
  console.log(clubs);

  return (
    <div>
      <div>
        {!clubs ? (
          <div>
            <h1>독서 모임에 참여해보세요!</h1>
          </div>
        ) : (
          <div className="bookclub-container">
            {/* 독서 모임 카드 */}

            {clubs?.map((bookClub: any, i: number) => (
              <div
                onClick={() => navigate(`/book-club/${bookClub.groupId}`)}
                className="bookclub-card"
                key={bookClub.groupId}
              >
                <div className="bookclub-item">
                  <img src={bookClub.groupProfile} alt="" />
                  <div className="shadow-wrapper">
                    <div className="content">
                      <div className="bookclub-title">
                        <h1>{bookClub.groupName}</h1>
                        <div className="bookclub-location">
                          <BiMap />
                          <span>{'역삼동'}</span>
                        </div>
                      </div>
                      <h2>{bookClub.groupDescrib}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookClub;
