import React, { useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import type { UploadChangeParam } from 'antd/es/upload';
import { RiCameraLine } from 'react-icons/ri';

import {
  UserOutlined,
  FileImageOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { Form, Input, Select, Upload } from 'antd';
// import type { UploadProps } from 'antd';
import { Button, Modal } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import './Modal.styles.scss';
import { editProfileAPI } from '@src/API/memberAPI';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

const App: React.FC = () => {
  const categoriesRes = useMyQuery('/categories.json');

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // console.log('Success:', values);
    if (!loading) {
      setLoading(true);
      const { data: response }: any = editProfileAPI(values);
      setLoading(false);
    }
  };

  const dongCode = useMyQuery('/dongcode.json');

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

  // 프로필 사진
  const [imageUrl, setImageUrl] = useState<string>(
    'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfNTEg/MDAxNjE1MTg3MTQwMTYw.zHRr__ZxSvKC7umKmXkX2a0_9n8OU5oieyDdsLXLt_cg.Hc68luHvoivGy_I1n8AcbAUC-NsZXzJKuAqXXqNpN6cg.JPEG.aksen244/MBC_%E3%80%BBWattpad.jpg?type=w800',
  );
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
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
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                memberName: '나미리선생님',
                memberDongcode: '864 Grand Avenue, Ivanhoe, Guam',
              }}
            >
              <Form.Item
                // label={<Label text="사진" />}
                name="image"
                valuePropName="any"
                rules={[
                  { required: true, message: '프로필 사진을 등록해주세요' },
                ]}
              >
                <Upload
                  name="memberProfile"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <div className="image-item">
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />

                      <div className="add-item">
                        <RiCameraLine size={'1.5rem'} />
                      </div>
                    </div>
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label={<Label text="닉네임" />}
                name="memberName"
                rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
              >
                <Input placeholder="닉네임을 입력해주세요" />
              </Form.Item>

              <Form.Item
                label={<Label text="위치" />}
                rules={[{ required: true, message: '위치를 선택해주세요' }]}
                name="memberDongcode"
              >
                <Select
                  allowClear
                  placeholder="Please select"
                  options={dongCode}
                />
              </Form.Item>

              <Form.Item
                label={<Label text="카테고리" />}
                rules={[{ required: true, message: '카테고리를 선택해주세요' }]}
                name="memberGenre"
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="카테고리를 선택해주세요."
                  options={categoriesRes}
                  className="selector"
                />
              </Form.Item>
            </Form>
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
