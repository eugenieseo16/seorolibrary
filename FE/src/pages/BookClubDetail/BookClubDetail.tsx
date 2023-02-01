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
import CarouselPlace, {
  ICarouselPlaceProps,
} from '@components/Carousel/CarouselPlace';

function fetchData(): Promise<IClubDetail> {
  return axios.get('/clubDetail.json').then(response => response.data);
}
const getPlacesData = async () => await (await fetch('/books.json')).json();

function BookClubDetail() {
  const { id } = useParams();
  const { data: detailData } = useQuery(`club-detail-${id}`, fetchData);
  const newData: ICarouselPlaceProps = {
    items: [
      { title: detailData?.meta.posts + '', image_url: '' },
      { title: detailData?.meta.posts + '', image_url: '' },
      { title: detailData?.meta.posts + '', image_url: '' },
      { title: detailData?.meta.posts + '', image_url: '' },
    ],
  };

  return (
    <>
      <div className="book-club-detail-container">
        <div className="book-club-detail-header">
          <img src={detailData?.image_url} alt="" />
          <h1>{detailData?.title}</h1>
          <p>
            <span>
              <BiMap />
            </span>
            <span>{detailData?.location}</span>
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
            <span>{detailData?.date}</span>
          </div>
          <div>
            <div>
              <HiUsers />
              <span>맴버 / 정원</span>
            </div>
            <span>
              {detailData?.club_members.length}명 / {detailData?.members_limit}
              명
            </span>
          </div>
        </div>
        <div className="book-club-detail-description">
          <h2>클럽 소개</h2>
          <p>{detailData?.description}</p>
        </div>
        <div>
          <h2>우리는 이만큼 활동했어요</h2>
          <CarouselPlace items={newData.items} slidesToShow={3} />
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
