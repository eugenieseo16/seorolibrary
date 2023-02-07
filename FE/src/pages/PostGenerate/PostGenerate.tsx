import React, { useState } from 'react';
import { Input, Form, Upload, Select, Image, Button } from 'antd';
import { CloseOutlined, FileImageOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

import './PostGenerate.styles.scss';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';

const props: UploadProps = {
  name: 'file',
  multiple: true,

  customRequest: ({ onSuccess }: any) => onSuccess('ok'),
  itemRender: (_, file: any, __, { remove }) => {
    const url = URL.createObjectURL(file.originFileObj);

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Image
          width={'100%'}
          style={{
            objectFit: 'cover',
            aspectRatio: '1',
            borderRadius: '1rem',
          }}
          src={url}
          alt=""
        />
        <Button
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          }}
          onClick={() => remove()}
          danger
          shape="circle"
          icon={<CloseOutlined />}
        />
      </div>
    );
  },
};

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function PostGenerate() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <SearchHeader text="게시글 작성하기" search={false} />
      <div className="post-generate-container">
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label={<Label text="제목" />}
            name="title"
            rules={[{ required: true, message: '제목을 알려주세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<Label text="내용" />}
            name="payload"
            rules={[{ required: true, message: '내용을 알려주세요' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label={<Label text="게시글 유형" />}
            rules={[{ required: true, message: '게시판을 선택해주세요' }]}
            initialValue={'free'}
            name="category"
          >
            <Select style={{ fontFamily: 'NEXON' }}>
              <Select.Option value="free">자유글</Select.Option>
              <Select.Option value="notice">공지사항</Select.Option>
              <Select.Option value="recommend">책 추천</Select.Option>
              <Select.Option value="greeting">가입인사</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<Label text="사진" />}
            name="images"
            valuePropName="any"
          >
            <Upload.Dragger {...props}>
              <div className="ant-upload-container">
                <p>사진추가</p>
                <FileImageOutlined className="image-icon" />
              </div>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </div>
      <FixedBottomButton
        text="등록하기"
        onClick={() => {
          console.log(form.submit());
        }}
      />
    </>
  );
}

export default PostGenerate;
