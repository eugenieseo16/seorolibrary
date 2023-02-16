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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { bookApiUrls } from '@src/API/apiUrls';
import axios from 'axios';

interface IBookReviewProps {
  isbn: any;
}

function BookReview({ isbn }: IBookReviewProps) {
  const queryCache = useQueryClient();
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

  const { isLoading, isError, error, mutate } = useMutation(submitReview, {
    onMutate: async updateData => {
      // Save the original todo in case we need to roll back the update
      await queryCache.cancelQueries(`${bookApiUrls.bookReview}/${isbn}`);
      const previousTodos = queryCache.getQueryData(
        `${bookApiUrls.bookReview}/${isbn}`,
      );
      queryCache.setQueryData(
        `${bookApiUrls.bookReview}/${isbn}`,
        (old: any) => {
          console.log(old, updateData);
          return {
            ...old,
            data: {
              result: true,
              reviews: [
                {
                  memberId: user?.memberId,
                  memberName: user?.memberName,
                  memberProfile: user?.memberProfile,
                  reviewContent: updateData.reviewContent,
                },
                ...old.data.reviews,
              ],
            },
          };
        },
      );

      return { previousTodos };
    },
  });

  async function submitReview(createValues: any) {
    const response = await axios.post(
      `${bookApiUrls.editBookReview}/${createValues.isbn}`,
      createValues,
    );
    return response.data;
  }
  // 리뷰 생성
  const onValid = (values: any) => {
    setToReview(false);
    mutate({
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
