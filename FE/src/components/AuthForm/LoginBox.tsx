import React, { useState } from 'react';
import logo from '@src/assets/logo/seoro.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';

import './LoginBox.styles.scss';
import { jwtLoginAPI, loginAPI } from '@src/API/authAPI';
import { useDispatch } from 'react-redux';
import { login } from '@src/store/slices/userSlice';
import Google from './Google';
import Incognito from './Incognito';
import IncogLogo from '@src/assets/incognito.png';
import GoogleLogo from '@src/assets/google_light.svg';

function LoginBox() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (data: any) => {
    console.log(data);
    if (loading) return;
    setLoading(true);
    try {
      const { data: response }: any = await loginAPI(data);
      const jwtResponse = await jwtLoginAPI(response.accessToken);
      localStorage.setItem('ssafy-token', response.accessToken);
      dispatch(login(jwtResponse));
    } catch {
      api.open({
        message: <h2 style={{ color: 'tomato' }}>서버에러</h2>,
        description: '이메일 또는 비밀번호를 확인해 주세요',
      });
    }
    setLoading(false);
  };

  return (
    <div className="login-box" style={{ overflow: 'hidden' }}>
      {contextHolder}
      {/* 로고 */}
      <div className="logo-container">
        <img src={logo} alt="" />
        <p>서로 도서관</p>
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

          <div className="line"></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Google>
              <Button type="text" size="small">
                <img
                  src={GoogleLogo}
                  alt=""
                  style={{ width: '4rem', height: '4rem' }}
                />
              </Button>
            </Google>
            <Incognito>
              <Button type="text" size="small">
                <img
                  src={IncogLogo}
                  alt=""
                  style={{ width: '4rem', height: '4rem' }}
                />
              </Button>
            </Incognito>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginBox;
