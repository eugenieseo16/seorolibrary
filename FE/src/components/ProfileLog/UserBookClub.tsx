import React from 'react';

import { useMyQuery } from '@src/hooks/useMyQuery';

function UserBookClub() {
  const data = useMyQuery(
    'https://dcdf1cac-0867-4f6b-baa5-0ac675f4d6e1.mock.pstmn.io/user-bookclub',
  );

  return (
    <div>
      <div>
        {!data ? (
          <div>
            <h1>독서 모임에 참여해보세요!</h1>
          </div>
        ) : (
          <div className="bookclub-container">
            {/* 독서 모임 카드 */}

            {data?.map((bookclub: any, i: number) => (
              <div className="bookclub-item" key={i}>
                <h1>{bookclub.title}</h1>
                <h2>{bookclub.content}</h2>
                <img src={bookclub.image_url} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookClub;
