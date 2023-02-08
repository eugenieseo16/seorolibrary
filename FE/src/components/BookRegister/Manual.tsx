import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './Manual.styles.scss';

function Manual() {
  const { handleSubmit, register, setValue, getValues } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const getChangeHandlerWithEvent = (name: string) => (e: any) =>
    setValue(name, e.target.value);

  return (
    <div className="book-register-container">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="book-register-item">
          <input
            type="text"
            onChange={getChangeHandlerWithEvent('title')}
            placeholder="책제목"
          />
        </div>

        <div className="book-register-item">
          <input
            type="text"
            onChange={getChangeHandlerWithEvent('author')}
            placeholder="작가"
          />
        </div>

        <div className="book-register-item">
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
  );
}

export default Manual;
