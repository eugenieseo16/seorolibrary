import React, { useState } from 'react';

import './Manual.styles.scss';

function Manual() {
  return (
    <div>
      <h1>직접 입력하여 등록</h1>
      <div className="book-register-item">
        <input type="text" placeholder="책제목" />
      </div>

      <div className="book-register-item">
        <input type="text" placeholder="작가" />
      </div>

      <div className="book-register-item">
        <textarea placeholder="한줄평을 간단히 적어주세요."></textarea>
      </div>

      <div className="submit-button">
        <button id="submit-button" type="submit">
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Manual;
