import React, { useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';

import { UserOutlined, FileImageOutlined } from '@ant-design/icons';
import { Form, Input, Select, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { Button, Modal } from 'antd';

import './Modal.styles.scss';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const dongCode = useMyQuery('/dongcode.json');

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

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>수정</Button>
      <Modal
        open={open}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleOk}>
            제출
          </Button>,
        ]}
      >
        <div className="modal-container">
          <div className="edit-profile-container">
            <Form form={form} onFinish={onFinish}>
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

              <Form.Item
                label={<Label text="닉네임" />}
                rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
                name="nickname"
              >
                <Input
                  placeholder="닉네임을 입력해주세요"
                  // defaultValue="나미리선생님"
                />
              </Form.Item>
            </Form>

            <Form.Item
              label={<Label text="위치" />}
              rules={[{ required: true, message: '위치를 선택해주세요' }]}
              name="location"
            >
              <Select
                allowClear
                placeholder="위치를 선택해주세요"
                options={dongCode}
              />
            </Form.Item>
          </div>
          <div className="button-item">
            <button
              onClick={() => {
                console.log(form.submit());
              }}
            >
              수정
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
