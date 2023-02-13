import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './LoginBox.styles.scss';
import { loginAPI } from '@src/API/authAPI';
import { useDispatch } from 'react-redux';
import { login } from '@src/store/slices/userSlice';

function LoginBox() {
  const dispatch = useDispatch();
  const onFinish = async (data: any) => {
    const { data: response } = await loginAPI(data);
    if (response) {
      dispatch(login({ ...response, username: 'test' }));
    }
  };

  return (
    <div className="login-box">
      {/* 로고 */}
      <div>
        <img src={logo} alt="" />
      </div>
      {/* input form */}
      <div className="login-input-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
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
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="PASSWORD"
            />
          </Form.Item>
          <Form.Item className="login-button-container">
            <Button htmlType="submit">로그인</Button>
          </Form.Item>
        </Form>
      </div>
      {/* 로그인 버튼 */}
    </div>
  );
}

export default LoginBox;
