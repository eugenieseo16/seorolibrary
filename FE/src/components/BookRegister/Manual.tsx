import React, { useState } from 'react';

function Manual() {
  return (
    <div>
      <h1>직접 입력하여 등록</h1>
      <div>
        <input type="text" placeholder="책제목" />
      </div>

      <div>
        <input type="text" placeholder="작가" />
      </div>

      <div>
        <textarea
          cols="50"
          rows="5"
          placeholder="한줄평을 간단히 적어주세요."
        ></textarea>
      </div>

      <div>
        <button type="submit">등록하기</button>
      </div>
    </div>
  );
}

export default Manual;
