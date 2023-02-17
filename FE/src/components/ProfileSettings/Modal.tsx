import React, { useRef, useState } from 'react';
import { RiCameraLine } from 'react-icons/ri';
import Autocomplete from 'react-google-autocomplete';
import { login } from '@src/store/slices/userSlice';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Form, Input, Select, Upload } from 'antd';
import { Button, Modal } from 'antd';

import './Modal.styles.scss';
import { editProfileAPI } from '@src/API/memberAPI';
import { useUser } from '@src/hooks/useUser';
import { dongcodeAPI } from '@src/API/geoAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const user = useUser();

  const dongCode = useRef<any>();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    user?.memberProfile,
  );
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    let newProfile;
    if (file) {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', 'quzqjwbp');
      newProfile = await axios.post(
        'https://api.cloudinary.com/v1_1/dohkkln9r/image/upload',
        form,
      );
    }

    let dongData = user?.memberDongCode;
    if (dongCode.current) {
      dongData = await dongcodeAPI(dongCode.current);
    }

    const newProfileData = {
      memberDongCode: dongData,
      memberGenre: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      memberName: values.memberName,
      memberProfile: newProfile?.data?.url
        ? newProfile?.data?.url
        : user?.memberProfile,
    };
    const { data: response }: any = await editProfileAPI({
      ...newProfileData,
      exist: user?.memberName,
    });

    dispatch(
      login({
        ...user,
        ...newProfileData,
      }),
    );
    navigate('/profile');
    console.log('프로필 수정', response);
    setLoading(false);
  };
  console.log(user);

  const handleChange = (info: any) => {
    if (info.file.originFileObj) {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
      setFile(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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

              <Form.Item label={<Label text="내 위치" />} name="position">
                <Autocomplete
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                  }}
                  apiKey={'AIzaSyAhj152xH7BYpQQic-syvvx_j0tvjny2sM'}
                  options={{ types: ['geocode'] }}
                  defaultValue={user?.memberDongCode}
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
        {loading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: '0px',
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1
              style={{ fontSize: '2rem', fontFamily: 'BM-Pro', color: 'beige' }}
            >
              Loading...
            </h1>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
