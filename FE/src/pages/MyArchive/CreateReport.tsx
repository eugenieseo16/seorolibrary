import React from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import { Form, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';

import Header from '@components/Header/Header';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';

import './CreateReport.styles.scss';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function CreateReport() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

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
      <div className="create-report-container">
        <Header text={'기록하기'} />
        <div className="my-archive-report-generate-container">
          <Form form={form} onFinish={onFinish}>
            <Upload.Dragger {...props}>
              <div className="ant-upload-container">
                <p>사진추가</p>
                <FileImageOutlined className="image-icon" />
              </div>
            </Upload.Dragger>

            <Form.Item
              label={<Label text="제목" />}
              name="title"
              rules={[{ required: true, message: '제목을 입력해주세요' }]}
            >
              <Input placeholder="제목을 입력해주세요" />
            </Form.Item>

            <Form.Item
              label={<Label text="내용" />}
              name="payload"
              rules={[{ required: true, message: '내용을 입력해주세요' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </div>
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

export default CreateReport;
