import React from 'react';
import { useQuery } from 'react-query';

function BookInfo() {
  const getBookInfo = async () => await (await fetch('/bookInfo.json')).json();
  const { data } = useQuery('book-info', getBookInfo);

  return (
    <div>
      <img src={data?.image_url} alt="" />
      <h1>{data?.title}</h1>
      <p>
        {data?.author} 지음 · {data?.publisher} · {data?.date} 출간
      </p>

      <p>한줄평</p>

      <h2>책 소개</h2>
      <p>{data?.description}</p>
      <div>
        <div>읽은 유저 수{data?.readUsers.length}명</div>

        <div>
          한줄평
          {data?.comment.length}개
        </div>

        <div>
          독서 리뷰
          {data?.review.length}개
        </div>
      </div>

      {/* 사용자의 보유도서 상세를 클릭한 경우 */}
      <div>보유도서</div>
      <p>carousel</p>
      {/* 표준 도서상세 */}
      <div>보유사용자</div>
      <p>carousel</p>
    </div>
  );
}
export default BookInfo;
