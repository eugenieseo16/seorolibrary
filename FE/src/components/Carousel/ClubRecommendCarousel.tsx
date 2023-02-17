import React, { Suspense } from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ClubRecommendCarousel.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { IGroup, useClubMainAPI } from '@src/API/clubAPI';
import { useUser } from '@src/hooks/useUser';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function ClubRecommendCarousel({
  listView,
}: {
  listView: boolean;
}) {
  const user = useUser();
  const clubData = useClubMainAPI(user?.memberName);
  const navigate = useNavigate();
  console.log('CLUBDATA', clubData);
  return (
    <Suspense fallback={<span>Loading... </span>}>
      {listView ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
          className="my-slider"
        >
          {clubData?.myGroups?.map((el, i: number) => (
            <div
              key={i}
              className="carousel-container"
              onClick={() => navigate(`/book-club/${el.groupId}`)}
            >
              <img
                src={
                  el.groupProfile
                    ? el.groupProfile
                    : 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'
                }
                alt=""
              />
              <div className="shadow-wrapper" />
              <div className="content">
                <h1>{el.groupName}</h1>
                <h3>{el.groupDescrib}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings} className="my-slider">
          {clubData?.recommendGroups?.map((el, i: number) => (
            <div
              key={i}
              className="carousel-container"
              onClick={() => navigate(`/book-club/${el.groupId}`)}
            >
              <img
                src={
                  el.groupProfile
                    ? el.groupProfile
                    : 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'
                }
                alt=""
              />
              <div className="shadow-wrapper" />
              <div className="content">
                <h1>{el.groupName}</h1>
                <h3>{el.groupDescrib}</h3>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </Suspense>
  );
}
