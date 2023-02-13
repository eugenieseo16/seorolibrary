import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro_vertical.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';

import './LoginBox.styles.scss';
import { loginAPI } from '@src/API/authAPI';
import { useDispatch } from 'react-redux';
import { login } from '@src/store/slices/userSlice';

function LoginBox() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (data: any) => {
    if (loading) return;
    setLoading(true);
    const { data: response } = await loginAPI(data);
    if (response) {
      dispatch(login({ ...response, username: 'test' }));
    } else {
      api.open({
        message: <h2 style={{ color: 'tomato' }}>서버에러</h2>,
        description: '이메일 또는 비밀번호를 확인해 주세요',
      });
    }
    setLoading(false);
  };

  return (
    <div className="login-box">
      {contextHolder}
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
