import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import locale from 'antd/es/calendar/locale/ko_KR';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import './PlanGenerate.styles.scss';
import { clubPlanGenerateAPI } from '@src/API/clubAPI';
import { useUser } from '@src/hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}
function PlanGenerate() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = useUser();
  const { id: groupId } = useParams();
  const onSubmit = async (data: any) => {
    const res = await clubPlanGenerateAPI({
      ...data,
      date: data.date.format('YYYY-MM-DD'),
      groupId: groupId ? +groupId : undefined,
      writerId: user?.memberId,
    });
    navigate(`/book-club/${groupId}/plan`);
    console.log(res);
  };
  return (
    <>
      <SearchHeader text="일정 등록" search={false} />
      <div className="club-generate-container">
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            label={<Label text="일정제목" />}
            name="groupScheduleTitle"
            rules={[{ required: true, message: '일정제목을 알려주세요' }]}
          >
            <Input placeholder="일정제목을 입력해주세요" />
          </Form.Item>
          <Form.Item
            label={<Label text="일정소개" />}
            name="groupScheduleContent"
            rules={[{ required: true, message: '일정소개를 해주세요' }]}
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
