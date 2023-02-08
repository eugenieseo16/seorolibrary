import React from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from '@components/Header/Header';
import RegisterDetail from '@components/BookRegister/RegisterDetail';

import './BookRegister.styles.scss';

function BookRegister() {
  const location = useLocation();

  const title = location.state?.title;
  const author = location.state?.author;

  const { handleSubmit, setValue } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  return (
    <div className="book-register-container">
      <Header text="도서 등록" />
      <RegisterDetail />

      <div className="book-detail-register-container">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="book-detail-register-item">
            <input
              type="text"
              onChange={getChangeHandlerWithEvent('title')}
              placeholder="책 제목"
              value={title}
            />
          </div>

          <div className="book-detail-register-item">
            <input
              type="text"
              onChange={getChangeHandlerWithEvent('author')}
              placeholder="작가"
              value={author}
            />
          </div>

          <div className="book-detail-register-item">
            <textarea
              onChange={getChangeHandlerWithEvent('comment')}
              placeholder="한줄평을 간단히 적어주세요."
            ></textarea>
          </div>
        </form>
        <div className="submit-button">
          <button
            onClick={handleSubmit(onValid)}
            id="submit-button"
            type="submit"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookRegister;
