import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './LoginBox.styles.scss';

function LoginBox() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
            rules={[{ required: true, message: '이메일을 입력해주세요' }]}
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
        </Form>
      </div>
      {/* 로그인 버튼 */}
      <div className="login-button-container">
        <Form>
          <Form.Item>
            <Button htmlType="submit" className="login-form-button">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginBox;
