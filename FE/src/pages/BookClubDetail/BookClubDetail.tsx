import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMap } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';

import { IClubDetail } from '@src/types/types';
import './BookClubDetail.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import CarouselPlace from '@components/Carousel/CarouselPlace';

function fetchClubDetail(): Promise<IClubDetail> {
  return axios.get('/clubDetail.json').then(response => response.data);
}

function BookClubDetail() {
  const { id } = useParams();
  const { data } = useQuery(`club-detail-${id}`, fetchClubDetail);

  return (
    <>
      <div className="book-club-detail-container">
        <CarouselPlace url="/places.json" />
        <div className="book-club-detail-header">
          <img src={data?.image_url} alt="" />
          <h1>{data?.title}</h1>
          <p>
            <span>
              <BiMap />
            </span>
            <span>{data?.location}</span>
          </p>
        </div>
        <div>
          <h2>모임회원</h2>
        </div>
        <div className="book-club-detail-meta">
          <h2>클럽 정보</h2>
          <div>
            <div>
              <BsCalendarDate />
              <span>개설일</span>
            </div>
            <span>{data?.date}</span>
          </div>
          <div>
            <div>
              <HiUsers />
              <span>맴버 / 정원</span>
            </div>
            <span>
              {data?.club_members.length}명 / {data?.members_limit}명
            </span>
          </div>
        </div>
        <div className="book-club-detail-description">
          <h2>클럽 소개</h2>
          <p>{data?.description}</p>
        </div>
        <div>
          <h2>우리는 이만큼 활동했어요</h2>
          <div>
            <div>오늘까지 7번 모였어요</div>
            <div>맴버들이 13개 의 글을 썼어요</div>
            <div>가장 최근 3일전 에 모였어요</div>
          </div>
        </div>
        <ClubRecommendCarousel />
      </div>
      <FixedBottomButton
        text={'모임 가입하기'}
        onClick={() => console.log('hello')}
      />
    </>
  );
}

export default BookClubDetail;
