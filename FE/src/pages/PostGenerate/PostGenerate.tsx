import React, { useState } from 'react';
import { Input, Form, Upload, Select, Carousel } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';

function PostGenerate() {
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    console.log(info);
    // Get this url from response in real world.
    const urls = info.fileList.map((file: any) =>
      URL.createObjectURL(file.originFileObj),
    );
    setImagePreview(urls);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange: handleChange,
    customRequest: ({ onSuccess }: any) => onSuccess('ok'),
    itemRender: (_, file: any, __, { remove }) => {
      console.log(file);
      const url = URL.createObjectURL(file.originFileObj);
      return (
        <div>
          <img src={url} alt="" />
        </div>
      );
    },
  };
  return (
    <>
      <div>
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item initialValue={'free'} label="Select" name="category">
            <Select>
              <Select.Option value="free">자유글</Select.Option>
              <Select.Option value="notice">공지사항</Select.Option>
              <Select.Option value="recommend">책 추천</Select.Option>
              <Select.Option value="greeting">가입인사</Select.Option>
            </Select>
          </Form.Item>
          <div>
            <Carousel style={{ marginBottom: '1rem' }}>
              {imagePreview?.map((url, i) => (
                <div key={i}>
                  <img
                    src={url}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <Upload.Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Upload.Dragger>
          </div>
          <Form.Item label="TextArea" name="payload">
            <Input.TextArea rows={4} />
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
