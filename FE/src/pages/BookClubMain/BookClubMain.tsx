import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import Loading from '@pages/Loading';
import { useMyQuery } from '@src/hooks/useMyQuery';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost, IClubDetail } from '@src/types/types';
import './BookClubMain.styles.scss';

function BookClubMain() {
  const { id } = useParams();
  const [filter, setFilter] = useState<string>('all');
  const posts: IPost[] = useMyQuery('/posts.json');
  const detailData: IClubDetail = useMyQuery(`/clubDetail.json`);

  return detailData ? (
    <>
      <div className="book-club-main-container">
        <div>
          <img src={detailData.image_url} alt="" />
          <h2>{detailData.title}</h2>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>게시판</h3>
            <button>글쓰기</button>
          </div>
          <div onClick={(e: any) => setFilter(e.target.value)}>
            <button value={'all'}>전체</button>
            <button value={'free'}>자유글</button>
            <button value={'notice'}>공지사항</button>
            <button value={'recommend'}>책 추천</button>
            <button value={'greet'}>가입인사</button>
          </div>
          {posts.map((post, i: number) => (
            <div key={i} className="post-container">
              <h3>{post.title}</h3>
              <div>
                <p>{post.payload}</p>
                {/* {post.image_url && <img src={post.image_url} alt="" />} */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClubBottomNav />
    </>
  ) : (
    <Loading />
  );
}

export default BookClubMain;
