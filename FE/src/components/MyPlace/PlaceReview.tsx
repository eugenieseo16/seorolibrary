import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Image, Space } from 'antd';

import './PlaceReview.styles.scss';
import AddPlaceReviewModal from './AddPlaceReviewModal';

function PlaceReview() {
  const navigate = useNavigate();
  const getPlaceReview = async () =>
    await (await fetch('/placeReview.json')).json();
  const { data } = useQuery('place-review', getPlaceReview);

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
        {data?.data?.map((review: any, i: number) => (
          <div className="place-review-item" key={i}>
            <div className="place-review-user-info">
              <img
                src={review.profile_img}
                alt=""
                onClick={() => navigate(`/profile/${i}`)}
              />
              <p
                className="place-review-user-name"
                onClick={() => navigate(`/profile/${i}`)}
              >
                {review.nickname}
              </p>
            </div>
            <div className="place-review-detail">
              {review.placeReviewPhotos ? (
                <Row gutter={[4, 4]}>
                  {/* Left column with full content */}
                  <Col span={18}>
                    {showFullContent[i] ? (
                      <p>{review.content}</p>
                    ) : (
                      <p>
                        {review.content.substring(
                          0,
                          Math.min(review.content.length, 70),
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
                      <Image src={review.placeReviewPhotos} alt="" />
                    </Col>
                  </Image.PreviewGroup>
                </Row>
              ) : (
                /* Content without image */
                <>
                  {showFullContent[i] ? (
                    <p>{review.content}</p>
                  ) : (
                    <p>
                      {review.content.substring(
                        0,
                        Math.min(review.content.length, 70),
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
