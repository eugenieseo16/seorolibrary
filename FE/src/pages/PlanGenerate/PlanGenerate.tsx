import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './PlanGenerate.styles.scss';
function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}
function PlanGenerate() {
  const [form] = Form.useForm();
  const onSubmit = (data: any) => {
    console.log(data.date.format('YYYY-MM-DD'));
  };
  return (
    <>
      <SearchHeader text="멀멀멀" search={false} />
      <div className="club-generate-container">
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            label={<Label text="일정제목" />}
            name="planName"
            rules={[{ required: true, message: '일정제목을 알려주세요' }]}
          >
            <Input placeholder="일정제목을 입력해주세요" />
          </Form.Item>
          <Form.Item
            label={<Label text="모임소개" />}
            name="groupIntroduction"
            rules={[{ required: true, message: '모임소개를 해주세요' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '날짜를 선택 해주세요' }]}
            label={<Label text="일정" />}
            name="date"
            initialValue={dayjs()}
          >
            <DatePicker
              format={'YYYY-MM-DD'}
              locale={locale}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </div>
      <FixedBottomButton
        text="일정 생성하기"
        onClick={() => {
          form.submit();
        }}
      />
    </>
  );
}

export default PlanGenerate;
