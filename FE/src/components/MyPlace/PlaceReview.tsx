import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Button, Form, Input } from 'antd';
import { RiEdit2Line } from 'react-icons/ri';

import './PlaceReview.styles.scss';

function PlaceReview() {
  const getBookReview = async () =>
    await (await fetch('/bookReview.json')).json();
  const { data } = useQuery('book-review', getBookReview);

  const [showInputForm, setShowInputForm] = useState(false);
  const onClickAddReview = () => {
    setShowInputForm(!showInputForm);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const writeIcon = <RiEdit2Line />;

  return (
    <div className="place-review-container">
      <div className="place-review-header" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <h2>리뷰</h2>
          {/* 클릭하면 리뷰작상 모달? 뭐든 .. */}
          <RiEdit2Line onClick={onClickAddReview} size={'2rem'} />
        </div>
        <div>
          {showInputForm && (
            <Form
              name="basic"
              placeholder="리뷰를 작성해주세요"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              // style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="review">
                <Input.TextArea />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    {writeIcon}
                  </Button>
                </Form.Item>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <div>
        {data?.data?.map((review: any, i: number) => (
          <div className="place-review-item" key={i}>
            <div className="place-review-user-info">
              <img src={review.profile_img} alt="" />
              <p>{review.nickname}</p>
            </div>
            <div className="place-review-detail">
              <a>{review.content}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceReview;
