import { Carousel } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ClubBottomNav from '@components/BottomNav/ClubBottomNav';
import Loading from '@pages/Loading';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { IPost, IClubDetail } from '@src/types/types';
import './BookClubMain.styles.scss';

function MultiPreviewImage({ images }: { images: string[] }) {
  return (
    <Carousel dots={false} style={{ marginBottom: '1rem' }}>
      {images.map((url, i) => (
        <div key={i}>
          <img src={url} alt="" />
        </div>
      ))}
    </Carousel>
  );
}

function BookClubMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const posts: IPost[] = useMyQuery('/posts.json');
  const detailData: IClubDetail = useMyQuery(`/clubDetail.json`);

  return detailData ? (
    <>
      <div className="book-club-main-container">
        <div className="book-club-main-header">
          <img src={detailData.image_url} alt="" />
          <h2>{detailData.title}</h2>
          <div>
            <h3>게시판</h3>
            <button onClick={() => navigate('./generate-post')}>글쓰기</button>
          </div>
        </div>
        <div
          onClick={(e: any) => setFilter(e.target.value)}
          className="categories-container"
        >
          <button className={filter === 'all' ? 'selected' : ''} value={'all'}>
            전체
          </button>
          <button
            className={filter === 'free' ? 'selected' : ''}
            value={'free'}
          >
            자유글
          </button>
          <button
            className={filter === 'notice' ? 'selected' : ''}
            value={'notice'}
          >
            공지사항
          </button>
          <button
            className={filter === 'recommend' ? 'selected' : ''}
            value={'recommend'}
          >
            책 추천
          </button>
          <button
            className={filter === 'greet' ? 'selected' : ''}
            value={'greet'}
          >
            가입인사
          </button>
        </div>
        <div className="posts-container">
          {posts?.map((post, i: number) => (
            <div key={i} className="post-container">
              <div className="category">{post.category}</div>
              <h3>{post.title}</h3>
              <div>
                {post.image_url && (
                  <MultiPreviewImage images={post.image_url} />
                )}
                <p>{post.payload}</p>
              </div>
              <div>{post.user.nickname}</div>
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
