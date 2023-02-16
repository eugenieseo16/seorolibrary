import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Image, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { placeDetailAPI } from '@src/API/placeAPI';

import './PlaceReview.styles.scss';
import AddPlaceReviewModal from './AddPlaceReviewModal';

function PlaceReview() {
  const navigate = useNavigate();
  // const getPlaceReview = async () =>
  //   await (await fetch('/placeReview.json')).json();
  // const { data } = useQuery('place-review', getPlaceReview);

  const param = useParams();
  const placeId = param?.id;
  const data = placeDetailAPI(placeId);
  console.log(data?.placeReview);

  const [showFullContent, setShowFullContent] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <div className="place-review-container">
      <div className="place-review-header-container">
        <div>
          <h2>리뷰</h2>
        </div>
        <div className="place-review-header-icon-container">
          <div className="place-review-header-icon-item">
            <AddPlaceReviewModal />
          </div>
        </div>
      </div>
      <div>
        {data?.placeReview?.map((review: any, i: number) => (
          <div className="place-review-item" key={i}>
            <div className="place-review-user-info">
              <img
                src={
                  review?.placeReviewPhotos
                    ? review?.placeReviewPhotos.length > 0
                      ? review?.placeReviewPhotos[0]
                      : ''
                    : ''
                }
                alt=""
                onClick={() => navigate(`/profile/${review?.memberName}`)}
              />
              <p
                className="place-review-user-name"
                onClick={() => navigate(`/profile/${review?.memberName}`)}
              >
                {review?.memberName}
              </p>
            </div>

            <div className="place-review-detail">
              {review?.placeReviewPhotos ? (
                <Row gutter={[4, 4]}>
                  {/* Left column with full content */}
                  <Col span={18}>
                    {showFullContent[i] ? (
                      <p>{review?.reviewContent}</p>
                    ) : (
                      <p>
                        {review?.reviewContent?.substring(
                          0,
                          Math.min(review?.reviewContent.length, 70),
                        )}
                        ...
                      </p>
                    )}
                    <p
                      onClick={() =>
                        setShowFullContent({
                          ...showFullContent,
                          [i]: !showFullContent[i],
                        })
                      }
                      className="place-review-more"
                    >
                      {showFullContent[i] ? '[닫기]' : '[더보기]'}
                    </p>
                  </Col>
                  {/* Right column with image */}
                  <Image.PreviewGroup>
                    <Col span={6}>
                      <Image src={review?.placeReviewPhotos} alt="" />
                    </Col>
                  </Image.PreviewGroup>
                </Row>
              ) : (
                /* Content without image */
                <>
                  {showFullContent[i] ? (
                    <p>{review?.reviewContent}</p>
                  ) : (
                    <p>
                      {review?.reviewContent.substring(
                        0,
                        Math.min(review?.reviewContent.length, 70),
                      )}
                      ...
                    </p>
                  )}
                  <p
                    onClick={() =>
                      setShowFullContent({
                        ...showFullContent,
                        [i]: !showFullContent[i],
                      })
                    }
                    className="place-review-more"
                  >
                    {showFullContent[i] ? '[닫기]' : '[더보기]'}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceReview;
