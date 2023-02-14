import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMap } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import sample1 from '@src/assets/images/sample1.png';
import sample2 from '@src/assets/images/sample2.png';
import sample3 from '@src/assets/images/sample3.png';
import crown from '@src/assets/crown.svg';

import { IClubDetail, IUserResponse } from '@src/types/types';
import './BookClubDetail.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import CarouselPlace from '@components/Carousel/CarouselPlace';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { useUser } from '@src/hooks/useUser';
import { clubDetailAPI, clubEnterAPI, clubMembersAPI } from '@src/API/clubAPI';

function BookClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const usersData: any = useMyQuery(`/userRecommend.json`);
  const detailData: any = useMyQuery(`/clubDetail.json`);

  const clubDetail = clubDetailAPI(id);
  const clubMembers = clubMembersAPI(id);

  const newData = [
    {
      title: clubDetail?.meetingCount + '번',
      image_url: sample1,
      header: '오늘까지',
      description: '모였어요',
    },
    {
      title: clubDetail?.postCount + '개',
      image_url: sample2,
      header: '맴버들이',
      description: '의 글을 썼어요',
    },
    {
      title: clubDetail?.bookCount + '권',
      image_url: sample3,
      header: '책을',
      description: ' 읽었어요',
    },
  ];
  const newUserData = clubMembers?.groupMembers?.map((user: any) => ({
    userId: user.userId,
    image_url: user.userProfile,
    title: user.userName,
  }));

  const enterClub = async () => {
    if (!id || !user || loading) return;
    setLoading(true);
    const response = await clubEnterAPI({
      groupId: +id,
      userId: user?.memberId,
      writePassword: '1234',
    });
    navigate('/book-club');

    setLoading(false);
  };

  console.log(clubDetail);
  console.log(clubMembers?.groupMembers);
  return (
    <>
      <div className="book-club-detail-container">
        <div className="book-club-detail-header">
          <img src={clubDetail?.groupProfile} alt="" />
          <h1>{clubDetail?.groupName}</h1>
          <p>
            <span>
              <BiMap />
            </span>
            <span>{clubDetail?.groupDongCode}</span>
          </p>
        </div>
        <div className="book-club-detail-users">
          <h2>모임 회원</h2>
          {newUserData && (
            <div style={{ position: 'relative' }}>
              <CarouselPlace
                items={newUserData}
                slidesToShow={6}
                infinite={false}
                className="club-members"
              />
              <img src={crown} alt="" />
            </div>
          )}
        </div>
        <div className="book-club-detail-meta">
          <h2>모임 정보</h2>
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
              {clubMembers?.groupMembers.length}명 / {clubDetail?.groupCapacity}
              명
            </span>
          </div>
        </div>
        <div className="book-club-detail-description">
          <h2 style={{ marginBottom: '1rem' }}>모임 소개</h2>
          <p>{clubDetail?.groupDescrib}</p>
        </div>
        <div className="meta-data-container">
          <h2>우리는 이만큼 활동했어요</h2>
          <CarouselPlace
            items={newData}
            slidesToShow={3}
            infinite={false}
            className="meta-data"
          />
        </div>
        <div className="recommend-container">
          <h2>독서모임 추천</h2>
          <ClubRecommendCarousel listView={false} />
        </div>
      </div>
      <FixedBottomButton text={'모임 가입하기'} onClick={enterClub} />
    </>
  );
}

export default BookClubDetail;
