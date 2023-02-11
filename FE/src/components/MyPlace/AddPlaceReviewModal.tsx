import React, { useEffect, useState } from 'react';
import { Button, Modal, Rate, Form, Upload, Input } from 'antd';

import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import './AddPlaceReviewModal.styles.scss';

function AddPlaceReviewModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  const title = '가게이름';

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <Rate defaultValue={5} />
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
          <Rate defaultValue={5} onChange={setValue} value={value} />
          <div> {value} / 5</div>
        </div>
        <Form.Item
          name="upload"
          // label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="사진을 올려주세요"
          className="ant-modal-items"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button
              icon={<MdOutlineAddPhotoAlternate size={'3rem'} />}
              style={{ width: 150, height: 150 }}
            />
          </Upload>
        </Form.Item>
        <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
          <Form.Item
            // name="placereview"

            rules={[{ required: true }]}
            // , message: '리뷰를 작성해주세요'
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
