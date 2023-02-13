import React, { useRef, useState } from 'react';
import { UserOutlined, FileImageOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Upload } from 'antd';
import type { UploadProps } from 'antd';
import Autocomplete from 'react-google-autocomplete';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './BookClubGenerate.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function BookClubGenerate() {
  const dongCode = useRef<any>();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log(dongCode.current);
  };
  const categoriesRes = useMyQuery('/categories.json');

  const props: UploadProps = {
    multiple: false,
    customRequest: ({ onSuccess }: any) => onSuccess('ok'),
    itemRender: (_: any, file: any, fileList: any, { remove }: any) => {
      if (fileList.length > 1) {
        if (file != fileList[1]) remove();
        return '';
      }
      const url = URL.createObjectURL(file.originFileObj);
      return <img src={url} width="100%" />;
    },
  };

  return (
    <>
      <SearchHeader text="독서모임 생성" search={false} />
      <div className="club-generate-container">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={<Label text="모임이름" />}
            name="title"
            rules={[{ required: true, message: '모임이름을 알려주세요' }]}
          >
            <Input placeholder="모임이름을 입력해주세요" />
          </Form.Item>
          <Form.Item
            label={<Label text="모임소개" />}
            name="payload"
            rules={[{ required: true, message: '모임소개를 해주세요' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label={<Label text="카테고리" />}
            rules={[{ required: true, message: '카테고리를 선택해주세요' }]}
            name="category"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={categoriesRes}
            />
          </Form.Item>
          <Form.Item
            label={<Label text="모임정원" />}
            name="num"
            initialValue={1}
          >
            <InputNumber
              min={1}
              addonBefore={<UserOutlined />}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <div style={{ marginBottom: '1rem' }}>
            <Label text="모임장소" />
            <Autocomplete
              style={{
                width: '100%',
                padding: '0 10px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              }}
              apiKey={'AIzaSyAhj152xH7BYpQQic-syvvx_j0tvjny2sM'}
              options={{ types: ['geocode'] }}
              onPlaceSelected={place => {
                try {
                  dongCode.current = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  };
                } catch (error) {
                  dongCode.current = 'eee';
                }
              }}
            />
          </div>
          <Form.Item
            label={<Label text="사진" />}
            name="image"
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
        text="모임 생성하기"
        onClick={() => {
          console.log(form.submit());
        }}
      />
    </>
  );
}

export default BookClubGenerate;
