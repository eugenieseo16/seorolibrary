import { Carousel } from 'antd';
import { BiMap } from 'react-icons/bi';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '@pages/Loading';

import './BookClubMain.styles.scss';
import { clubDetailAPI, clubPostAPI } from '@src/API/clubAPI';

function MultiPreviewImage({ images }: any) {
  return (
    <Carousel dots={false} style={{ marginBottom: '1rem' }}>
      {images.map((el: any) => (
        <div key={el.imageId}>
          <img src={el.image} alt="" />
        </div>
      ))}
    </Carousel>
  );
}
interface IPost {
  postId: string;
  memberProfile: string;
  memberName: string;
  postCategory: 'FREE' | 'NOTICE' | 'RECOMMEND' | 'GREET';
  postTitle: string;
  postContent: string;
  images: any;
}
const CATEGORY_FILTER = {
  FREE: '자유글',
  NOTICE: '공지사항',
  RECOMMEND: '책 추천',
  GREET: '가입인사',
};
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
  console.log(clubDetail);

  return clubDetail ? (
    <>
      <div className="book-club-main-container">
        <div className="book-club-main-header">
          <img src={clubDetail.groupProfile} alt="" />
          <h2 style={{ marginBottom: 8 }}>{clubDetail.groupName}</h2>
          <h4
            style={{
              fontSize: 12,
              paddingLeft: 10,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BiMap size={16} />
            {clubDetail.groupDongCode}
          </h4>
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
            className={filter === 'GREET' ? 'selected' : ''}
            value={'GREET'}
          >
            가입인사
          </button>
        </div>
        <div className="posts-container">
          {posts?.map((post: IPost) => (
            <div key={post.postId} className="post-container">
              <div className="post-header">
                <div className="profile">
                  <img src={post.memberProfile} alt="" />
                  <span>{post.memberName}</span>
                </div>

                <div className="category">
                  {post.postCategory in CATEGORY_FILTER
                    ? CATEGORY_FILTER[post.postCategory]
                    : ''}
                </div>
              </div>
              <h3>{post.postTitle}</h3>
              <div>
                {post?.images && <MultiPreviewImage images={post.images} />}
                <p>{post.postContent}</p>
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
