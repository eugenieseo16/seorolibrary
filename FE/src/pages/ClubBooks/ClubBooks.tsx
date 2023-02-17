import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import React from 'react';
import './ClubBooks.styles.scss';
import { IBook, IUser } from '@src/types/types';

interface ClubBook extends IBook {
  read_users: IUser[];
}
function ClubBooks() {
  const books: ClubBook[] = useMyQuery('/clubReadBooks.json');
  return (
    <>
      <SearchHeader search={false} text="미라클 모닝 독서" />
      {/* <div className="club-books-container">
        {books?.map(book => (
          <div key={book.id} className="book">
            <div className="book-data">
              <div>
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <p>{book.description}</p>
              </div>
              <Avatar.Group
                maxCount={3}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {book.read_users.map((user, i) => (
                  <Tooltip
                    overlay={() => (
                      <div onClick={() => console.log(user.nickname)}>
                        {user.nickname}
                      </div>
                    )}
                    placement="top"
                  >
                    {user.image_url ? (
                      <Avatar key={i} src={user.image_url} />
                    ) : (
                      <Avatar key={i} style={{ backgroundColor: '#f56a00' }}>
                        K
                      </Avatar>
                    )}
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
            <img className="book-cover" src={book.image_url} alt="" />
          </div>
        ))}
      </div> */}
    </>
  );
}

export default ClubBooks;
