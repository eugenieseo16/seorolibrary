import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  RiAddFill,
  RiSubtractFill,
  RiEdit2Line,
  RiDeleteBinLine,
} from 'react-icons/ri';

import './BookReview.styles.scss';
import {
  bookReviewAPI,
  bookReviewCreateAPI,
  bookReviewDeleteAPI,
  bookDetailAPI,
} from '@src/API/bookAPI';
import { useUser } from '@src/hooks/useUser';
import { useMutation } from 'react-query';
import { bookApiUrls } from '@src/API/apiUrls';

interface IBookReviewProps {
  isbn: any;
}

function BookReview({ isbn }: IBookReviewProps) {
  const reviews = bookReviewAPI(isbn);
  const user = useUser();
  const memberName = user?.memberName;
  const bookData = bookDetailAPI(isbn, user?.memberId);
  const bookTitle = bookData?.bookTitle;
  const bookImage = bookData?.bookImage;

  const [toReview, setToReview] = useState(true);

  const { handleSubmit, setValue } = useForm();

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  // 리뷰 생성
  const onValid = (values: any) => {
    setToReview(false);
    const { data: response }: any = bookReviewCreateAPI({
      isbn,
      bookTitle,
      bookImage,
      memberName,
      reviewContent: values?.reviewContent,
    });
  };

  // 리뷰 삭제
  const toDelete = (review: any) => {
    const { data: response }: any = bookReviewDeleteAPI(
      {
        memberName,
        reviewId: review?.reviewId,
      },
      isbn,
    );
  };

  return (
    <div className="book-review-container">
      {/* 리뷰 작성 */}
      {toReview ? (
        <div className="review-header-container">
          <h1>리뷰</h1>
          <RiAddFill size={'2rem'} onClick={() => setToReview(!toReview)} />
        </div>
      ) : (
        <div>
          <div className="review-header-container">
            <h1>리뷰</h1>
            <RiSubtractFill
              size={'2rem'}
              onClick={() => setToReview(!toReview)}
            />
          </div>

          <div className="create-review-form">
            <form onSubmit={handleSubmit(onValid)}>
              <div className="create-review-header">
                <div className="user-detail-section">
                  <img src={user?.memberProfile} alt="" />
                  <span>{user?.memberName}</span>
                </div>

                <div className="button-section">
                  <button
                    onClick={handleSubmit(onValid)}
                    id="submit-button"
                    type="submit"
                  >
                    등록
                  </button>
                </div>
              </div>

              <textarea
                name="reviewContent"
                placeholder="리뷰를 작성해주세요"
                onChange={getChangeHandlerWithEvent('reviewContent')}
              ></textarea>
            </form>
          </div>
        </div>
      )}

      {/* 리뷰 조회 */}
      <div>
        {reviews?.reviews?.map((review: any, i: number) => (
          <div className="review-item" key={i}>
            {review?.memberName === user?.memberName ? (
              <div
                className="review-user-info-self"
                style={{ display: 'flex' }}
              >
                <div className="review-user-info">
                  <img src={review.memberProfile} alt="" />
                  <p>{review.memberName}</p>
                </div>

                <div className="review-user-self-item">
                  {/* 리뷰 수정 */}
                  <div className="edit" onClick={() => {}}>
                    <RiEdit2Line size={'1.5rem'} />
                  </div>
                  {/* 리뷰 삭제 */}
                  <div className="delete" onClick={() => toDelete(review)}>
                    <RiDeleteBinLine size={'1.5rem'} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="review-user-info">
                <img src={review.memberProfile} alt="" />
                <p>{review.memberName}</p>
              </div>
            )}

            <div className="review-detail">
              <p>{review.reviewContent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookReview;
