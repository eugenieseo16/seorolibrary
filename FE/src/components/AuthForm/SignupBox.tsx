import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';
import { LockOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './SignupBox.styles.scss';
import { ISignUpForm, signUpAPI } from '@src/API/authAPI';

function SignupBox() {
  const onSubmit = async (data: ISignUpForm) => {
    const { data: response } = await signUpAPI(data);
    console.log(response);
  };
  return (
    <div className="signup-box">
      {/* 로고 */}
      <div>
        <img src={logo} alt="" />
      </div>
      {/* input form */}
      <div className="signup-input-container">
        <Form onFinish={onSubmit}>
          <Form.Item
            name="memberEmail"
            // label="E-mail"
            rules={[
              {
                type: 'email',
                message: '이메일 형식으로 입력해주세요',
              },
              {
                required: true,
                message: '이메일을 알려주세요',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="EMAIL"
            />
          </Form.Item>
          <Form.Item
            name="memberName"
            rules={[
              {
                required: true,
                message: '닉네임을 알려주세요',
                whitespace: true,
              },
              {
                min: 3,
                message: '닉네임을 3글자 보다 길게 해주세요',
              },
            ]}
          >
            <Input
              prefix={<SmileOutlined className="site-form-item-icon" />}
              placeholder="NICKNAME"
            />
          </Form.Item>
          <Form.Item
            name="memberPassword"
            // label="Password"
            rules={[
              {
                required: true,
                message: '비밀번호를 알려주세요',
              },
              {
                min: 7,
                message: '비밀번호가 너무 짧아요(7글자 이상)',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="PASSWORD"
            />
          </Form.Item>

          <Form.Item
            name="dupchkPassword"
            // label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('memberPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다.'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="CONFIRM PASSWORD"
            />
          </Form.Item>
          <Form.Item className="signup-button-container">
            <Button htmlType="submit">회원가입</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignupBox;
