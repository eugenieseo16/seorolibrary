import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {useForm} from 'react-hook-form';

import { RiAddFill, RiSubtractFill } from 'react-icons/ri';

import './BookReview.styles.scss';

function BookReview() {
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

  const [toReview, setToReview] = useState(true);

  const { handleSubmit, setValue } = useForm();

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
  setValue(name, e.target.value);

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div className="book-review-container">
      {/* 리뷰 작성 */}
        { toReview ? (
          <div className="review-header-container">
            <h1>리뷰</h1>
            <RiAddFill size={'2rem'} onClick={() => setToReview(!toReview)}/>
          </div>
        ) : (
          <div>
            <div className="review-header-container">
              <h1>리뷰</h1>
              <RiSubtractFill size={'2rem'} onClick={() => setToReview(!toReview)}/>
            </div>

            <div className="create-review-form">
              <form onSubmit={handleSubmit(onValid)}>
                
                <div className="create-review-header">

                <div className="user-detail-section">
                  <img src="https://enewstoday.co.kr/news/photo/201706/1075992_238703_2853.jpg" alt="" />
                  <span>우주최강미녀</span>
                </div>
                  
                  <div className="button-section">
                    <button
                      onClick={handleSubmit(onValid)}
                      id="submit-button"
                      type="submit"
                      >
                      등록</button>
                  </div>  
                </div>

                  <textarea 
                    name="review" 
                    placeholder='리뷰를 작성해주세요'
                    onChange={getChangeHandlerWithEvent('review')}
                  ></textarea>
              </form>

            </div>
          </div>
        )}

    {/* 리뷰 조회 */}
      <div>
        {data?.data?.map((review: any, i: number) => (
          <div className="review-item" key={i}>
            <div className="review-user-info">
              <img src={review.profile_img} alt="" />
              <p>{review.nickname}</p>
            </div>

            <div className="review-detail">
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookReview;
