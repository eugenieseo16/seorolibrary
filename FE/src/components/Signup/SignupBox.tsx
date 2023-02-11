import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';
import { LockOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './SignupBox.styles.scss';

function SignupBox() {
  // const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  // };
  return (
    <div className="signup-box">
      {/* 로고 */}
      <div>
        <img src={logo} alt="" />
      </div>
      {/* input form */}
      <div className="signup-input-container">
        <Form>
          <Form.Item
            name="email"
            // label="E-mail"
            rules={[
              {
                type: 'email',
                message: '이메일 형식으로 입력해주세요',
              },
              {
                required: true,
                message: '이메일을 입력해주세요',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="EMAIL"
            />
          </Form.Item>
          <Form.Item
            name="nickname"
            // label="Nickname"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해주세요',
                whitespace: true,
              },
            ]}
          >
            <Input
              prefix={<SmileOutlined className="site-form-item-icon" />}
              placeholder="NICKNAME"
            />
          </Form.Item>
          <Form.Item
            name="password"
            // label="Password"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요',
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
            name="confirm"
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
                  if (!value || getFieldValue('password') === value) {
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
        </Form>
      </div>
      {/* 버튼 */}
      <div className="signup-button-container">
        <Form>
          <Form.Item>
            <Button htmlType="submit">회원가입</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignupBox;
