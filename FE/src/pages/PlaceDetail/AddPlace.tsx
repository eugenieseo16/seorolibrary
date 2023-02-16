import React, { useRef, useState, useEffect } from 'react';
import type { UploadProps } from 'antd';
import { Form, Upload, Input, InputNumber } from 'antd';
import { UserOutlined, FileImageOutlined } from '@ant-design/icons';
import { useUser } from '@src/hooks/useUser';
import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';
import { useNavigate } from 'react-router-dom';
import './AddPlace.styles.scss';
import { dongcodeAPI } from '@src/API/geoAPI';
import { placeGenerateAPI } from '@src/API/placeAPI';
import AddPlaceHeader from '@components/MyPlace/AddPlaceHeader';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';

// 지도 api 가져오기
declare global {
  interface Window {
    kakao: any;
  }
}

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function AddPlace() {
  const user = useUser();
  // const dongCode = useRef<any>();
  const navigate = useNavigate();
  const [file, setFile] = useState<any>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  // 주소 받으면 위도 경도로 변환하기
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const autoCompleteEl = document.getElementById('autocomplete');
    if (autoCompleteEl) {
      const autoComplete = new window.kakao.maps.services.Autocomplete({
        element: autoCompleteEl,
      });
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        if (place) {
          geocoder.addressSearch(place.address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setLongitude(result[0].x);
              setLatitude(result[0].y);
            }
          });
        }
      });
    }
  }, []);

  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);

    let placePhoto;
    if (file) {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', 'quzqjwbp');
      placePhoto = await axios.post(
        'https://api.cloudinary.com/v1_1/dohkkln9r/image/upload',
        form,
      );
    }
    // const dongData = await dongcodeAPI(dongCode.current);

    // 이미지는 리스트형식으로 보내야함
    const { data: response } = await placeGenerateAPI({
      ...values,
      placeMaker: user?.memberId,
      longitude: longitude,
      latitude: latitude,
      placePhoto: placePhoto?.data?.url,
    });
    console.log(response);
    navigate('/places');
    setLoading(false);
  };

  //  사진 multiple 되도록 수정하고, 리스트로 반환받도록 수정
  const props: UploadProps = {
    multiple: true,
    customRequest: ({ onSuccess }: any) => onSuccess('ok'),
    itemRender: (_: any, file: any, fileList: any, { remove }: any) => {
      const url = URL.createObjectURL(file.originFileObj);
      setFile(file.originFileObj);
      return <img src={url} width="100%" />;
    },
  };

  return (
    <>
      <AddPlaceHeader />
      <div className="place-generate-container">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={<Label text="장소 이름" />}
            name="placeName"
            rules={[{ required: true, message: '장소이름을 알려주세요' }]}
          >
            <Input placeholder="장소이름을 입력해주세요" />
          </Form.Item>

          <div style={{ marginBottom: '1rem' }}>
            <Label text="장소 위치" />
            <Autocomplete
              style={{
                width: '100%',
                padding: '0 10px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              }}
              placeholder="장소 위치를 입력해주세요"
              apiKey={'AIzaSyAhj152xH7BYpQQic-syvvx_j0tvjny2sM'}
              options={{ types: ['establishment'] }}
            />
          </div>
          <Form.Item
            label={<Label text="장소소개" />}
            name="placeDescrib"
            rules={[{ required: true, message: '장소소개를 해주세요' }]}
          >
            <Input.TextArea rows={3} placeholder="장소를 소개 해주세요" />
          </Form.Item>
          <Form.Item
            label={<Label text="장소 사진" />}
            name="placePhoto"
            valuePropName="any"
            rules={[
              { required: true, message: '사진을 한장이상 추가해주세요' },
            ]}
          >
            <Upload.Dragger {...props}>
              <div className="ant-upload-container">
                <FileImageOutlined className="image-icon" />
                <p>사진을 추가해주세요</p>
              </div>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </div>
      <FixedBottomButton
        text="장소 추가하기"
        onClick={() => {
          console.log(form.submit());
        }}
      />
    </>
  );
}

export default AddPlace;
