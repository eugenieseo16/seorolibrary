import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input } from 'antd';

import Header from '@components/Header/Header';

import './ChangePassword.styles.scss';

function Label({ text }: { text: string }) {
  return <h3 style={{ fontSize: '1.2rem', fontFamily: 'NEXON' }}>{text}</h3>;
}

function ChangePassword() {
  const [form] = Form.useForm();
  const location = useLocation();

  const onFinish = (values: any) => {
    // values.current === 현재 유저의 찐 비밀번호 조건도 추가해야함
    if (values.current != values.new1 && values.new1 === values.new2) {
      console.log('Success:', values);
      window.location.href = '/profile/settings';
    } else if (values.current === values.new1) {
      alert('새로운 비밀번호를 입력해주세요.');
    } else if (values.new1 != values.new2) {
      alert('새 비밀번호를 확인해주세요.');
    }
    // else if( values.current != 현재 유저의 찐 비밀번호) {
    //   alert('현재 비밀번호를 확인해주세요.')
    // }
  };

  return (
    <div>
      <Header text="비밀번호 변경" />
      <div className="change-password-container">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={<Label text="현재 비밀번호" />}
            name="current"
            rules={[
              { required: true, message: '현재 비밀번호를 입력해주세요' },
            ]}
          >
            <Input.Password placeholder="현재 비밀번호를 입력해주세요" />
          </Form.Item>

          <Form.Item
            label={<Label text="새 비밀번호" />}
            name="new1"
            rules={[
              { required: true, message: '새로운 비밀번호를 입력해주세요' },
            ]}
          >
            <Input.Password placeholder="새로운 비밀번호를 입력해주세요" />
          </Form.Item>

          <Form.Item
            label={<Label text="새 비밀번호 확인" />}
            name="new2"
            rules={[
              {
                required: true,
                message: '새 비밀번호를 다시 한번 입력해주세요',
              },
            ]}
          >
            <Input.Password placeholder="새 비밀번호를 다시 한번 입력해주세요" />
          </Form.Item>
        </Form>
      </div>
      <div className="button-container">
        <button onClick={() => console.log(form.submit())}>변경</button>
      </div>
    </div>
  );
}
export default ChangePassword;
