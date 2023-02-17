import React, { useRef, useState, useEffect } from 'react';
import { Button, Image, UploadProps } from 'antd';
import { Form, Upload, Input, InputNumber } from 'antd';
import { CloseOutlined, FileImageOutlined } from '@ant-design/icons';
import { useUser } from '@src/hooks/useUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPlace.styles.scss';
import { placeGenerateAPI } from '@src/API/placeAPI';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import Autocomplete from 'react-google-autocomplete';
import { dongcodeAPI } from '@src/API/geoAPI';

// 지도 api 가져오기
declare global {
  interface Window {
    kakao: any;
  }
}

function Label({ text }: { text: string }) {
  return (
    <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON', display: 'flex' }}>
      {text}
    </h3>
  );
}

let images: any = [];
let globalLoading = false;
//  사진 multiple 되도록 수정하고, 리스트로 반환받도록 수정
const props: UploadProps = {
  name: 'file',
  multiple: true,

  customRequest: async (data: any) => {
    globalLoading = true;
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('upload_preset', 'quzqjwbp');
    const { data: response } = await axios.post(
      'https://api.cloudinary.com/v1_1/dohkkln9r/image/upload',
      formData,
    );
    images.push({ uid: data.file.uid, url: response.url });
    globalLoading = false;
    data.onSuccess('ok');
  },
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
          onClick={() => {
            images = images.filter((image: any) => image.uid != file.uid);
            remove();
          }}
          danger
          shape="circle"
          icon={<CloseOutlined />}
        />
      </div>
    );
  },
};

function AddPlace() {
  const user = useUser();
  const dongCode = useRef<any>();
  const navigate = useNavigate();
  const [file, setFile] = useState<any>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);

    // 이미지는 리스트형식으로 보내야함
    const { data: response } = await placeGenerateAPI({
      ...values,
      placeMaker: user?.memberId,
      longitude: dongCode.current.longitude,
      latitude: dongCode.current.latitude,
      placePhoto: images.map((image: any) => image.url),
    });
    console.log(response);
    navigate('/places');
    setLoading(false);
  };

  return (
    <>
      <SearchHeader text="장소 등록하기" search={false} />
      <div className="post-generate-container">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={<Label text="장소이름" />}
            name="placeName"
            rules={[{ required: true, message: '장소이름을 알려주세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<Label text="장소소개" />}
            name="placeDescrib"
            rules={[{ required: true, message: '장소소개를 알려주세요' }]}
          >
            <Input.TextArea rows={4} />
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
              options={{ types: ['geocode', 'establishment'] }}
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
          </div>

          <Form.Item
            label={<Label text="장소사진" />}
            name="postImage"
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

export default AddPlace;
