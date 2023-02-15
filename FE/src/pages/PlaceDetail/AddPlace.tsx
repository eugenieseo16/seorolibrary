import React, { useRef, useState } from 'react';
import { Form, Upload, Input, InputNumber } from 'antd';

import Autocomplete from 'react-google-autocomplete';
import { scroller, Element } from 'react-scroll';
import type { UploadProps } from 'antd';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import { UserOutlined, FileImageOutlined } from '@ant-design/icons';

import { checkValid } from '@src/utils/arrUtils';
import { autoCompleteFilter } from '@src/utils/utils';
import AddPlaceHeader from '@components/MyPlace/AddPlaceHeader';
import './AddPlace.styles.scss';
import { useMyQuery } from '@src/hooks/useMyQuery';
import { placeGenerateAPI } from '@src/API/placeAPI';
import { useUser } from '@src/hooks/useUser';
import { dongcodeAPI } from '@src/API/geoAPI';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function AddPlace() {
  const user = useUser();
  const dongCode = useRef<any>();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);
    const dongData = await dongcodeAPI(dongCode.current);
    const { data: response } = await placeGenerateAPI({
      ...values,
      latitude: dongData,
      placeMaker: user?.memberId,
    });
    setLoading(false);
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
          </div>
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
          {/* <Form.Item
            label={<Label text="장소소개" />}
            name="groupIntroduction"
            rules={[{ required: true, message: '장소소개를 해주세요' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item> */}
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
