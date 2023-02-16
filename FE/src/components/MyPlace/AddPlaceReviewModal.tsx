import React, { useEffect, useState } from 'react';
import { Button, Modal, Rate, Form, Upload, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import './AddPlaceReviewModal.styles.scss';
import { addPlaceReviewAPI } from '@src/API/placeAPI';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/hooks/useUser';
import axios from 'axios';
import type { UploadProps } from 'antd';

function AddPlaceReviewModal() {
  const user = useUser();
  const navigate = useNavigate();
  const [file, setFile] = useState<any>();
  const param = useParams();
  const placeId = param?.placeId;
  const placeName = param?.placeName;
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const onFinish = async (values: any) => {
    if (loading) return;
    setLoading(true);

    let placeReviewPhotos;
    if (file) {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', 'quzqjwbp');
      placeReviewPhotos = await axios.post(
        'https://api.cloudinary.com/v1_1/dohkkln9r/image/upload',
        form,
      );
    }
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
      setFile(file.originFileObj);
      return <img src={url} width="100%" />;
    },
  };

  const [form] = Form.useForm();
  const title = placeName;
  const score = { value };
  const memberName = user?.memberName;

  const data = addPlaceReviewAPI(
    {
      score,
      memberName,
    },
    param?.placeId,
  );

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <Rate defaultValue={0} />
      </div>

      <Modal
        title={title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        okText={'작성 완료'}
        //모달이 닫힌후에 function
        // afterClose={}
      >
        <div className="line"></div>
        <div className="ant-modal-items">
          <Rate defaultValue={0} onChange={setValue} value={value} />
          <div> {value} / 5</div>
        </div>
        <Form.Item
          name="placeReviewPhotos"
          // label="Upload"
          valuePropName="any"
          className="ant-modal-items"
        >
          <Upload.Dragger {...props}>
            <Button
              icon={<MdOutlineAddPhotoAlternate size={'3rem'} />}
              style={{ width: 150, height: 150 }}
            />
          </Upload.Dragger>
        </Form.Item>
        <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
          <Form.Item
            name="placeReview"
            rules={[{ required: true, message: '리뷰를 작성해주세요' }]}
          >
            <Input.TextArea
              showCount
              maxLength={255}
              style={{ height: 300 }}
              placeholder="리뷰를 작성해주세요"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddPlaceReviewModal;
