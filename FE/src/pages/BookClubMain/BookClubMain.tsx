import { Carousel } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '@pages/Loading';

import './BookClubMain.styles.scss';
import { clubDetailAPI, clubPostAPI } from '@src/API/clubAPI';

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
  const [filter, setFilter] = useState<string>('ALL');

  const clubDetail = clubDetailAPI(id);
  const posts = clubPostAPI({
    groupId: id,
    startIdx: 1,
    limit: 10,
    postCategory: filter,
  });
  console.log(posts);

  return clubDetail ? (
    <>
      <div className="book-club-main-container">
        <div className="book-club-main-header">
          <img src={clubDetail.groupProfile} alt="" />
          <h2>{clubDetail.groupName}</h2>
          <div>
            <h3>게시판</h3>
            <button onClick={() => navigate(`/book-club/${id}/generate-post`)}>
              글쓰기
            </button>
          </div>
        </div>
        <div
          onClick={(e: any) => setFilter(e.target.value)}
          className="categories-container"
        >
          <button className={filter === 'ALL' ? 'selected' : ''} value={'ALL'}>
            전체
          </button>
          <button
            className={filter === 'FREE' ? 'selected' : ''}
            value={'FREE'}
          >
            자유글
          </button>
          <button
            className={filter === 'NOTICE' ? 'selected' : ''}
            value={'NOTICE'}
          >
            공지사항
          </button>
          <button
            className={filter === 'RECOMMEND' ? 'selected' : ''}
            value={'RECOMMEND'}
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
          {posts?.map((post: any) => (
            <div key={post.postId} className="post-container">
              <div className="post-header">
                <div className="profile">
                  <img src={post.userName} alt="" />
                  <span>{post.userName}</span>
                </div>

                <div className="category">{post.postCategory}</div>
              </div>
              <h3>{post.postTitle}</h3>
              <div>
                {post.image_url && <MultiPreviewImage images={post.images} />}
                <p>{post.payload}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default BookClubMain;
