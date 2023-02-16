import React, { useRef, useState } from 'react';
import { useMyQuery } from '@src/hooks/useMyQuery';
import type { UploadChangeParam } from 'antd/es/upload';
import { RiCameraLine } from 'react-icons/ri';
import Autocomplete from 'react-google-autocomplete';

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
import { useUser } from '@src/hooks/useUser';
import { dongcodeAPI } from '@src/API/geoAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const categoriesRes = useMyQuery('/categories.json');
  const dongCode = useRef<any>();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const user = useUser();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    user?.memberProfile,
  );
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    let newProfile;
    if (imageUrl) {
      const form = new FormData();
      form.append('file', imageUrl);
      form.append('upload_preset', 'quzqjwbp');
      newProfile = await axios.post(
        'https://api.cloudinary.com/v1_1/dohkkln9r/upload',
        form,
      );
    }
    const dongData = await dongcodeAPI(dongCode.current);

    const { data: response }: any = await editProfileAPI({
      memberDongCode: dongData,
      exist: user?.memberName,
      memberGenre: values.memberGenre,
      memberName: values.memberName,
      memberProfile: newProfile?.data?.url,
    });
    navigate('/profile');
    console.log('프로필 수정', response);
    setLoading(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.originFileObj)
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>수정</Button>
      <Modal
        open={open}
        title=""
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="submit" onClick={() => setOpen(false)}>
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
                memberName: user?.memberName,
                memberDongcode: user?.memberDongCode,
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
                  customRequest={({ onSuccess }: any) => onSuccess('ok')}
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

              <Label text="모임장소" />
              <Autocomplete
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                }}
                apiKey={'AIzaSyAhj152xH7BYpQQic-syvvx_j0tvjny2sM'}
                options={{ types: ['geocode'] }}
                onPlaceSelected={place => {
                  try {
                    dongCode.current = {
                      latitude: place.geometry.location.lat(),
                      longitude: place.geometry.location.lng(),
                    };
                  } catch (error) {
                    dongCode.current = 'eee';
                  }
                }}
              />

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
