import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Checkbox, Row, Col } from 'antd';
import axios from 'axios';

const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    try{
      const response = axios.post('http://user-signupin-server:5000/signin', {
        email: values.username,
        password: values.password
    });

    console.log('Sign in successful', response.data);
  } catch (error) {
    console.error('Sign in failed', error);
  }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      <Col span={17}>
        <img
          src="https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg"
          alt="background"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />
      </Col>
      <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '70%', marginTop: '10%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1em' }}>
            <Link to="/">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                alt="logo"
                style={{ width: '30%', marginBottom: '1em' }}
              />
              <h2>Chilltan</h2>
            </Link>
            <p>歡迎回來！鳩團一下</p>
          </div>
          <Form
            {...layout}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '請輸入用戶名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用戶名: admin or user" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '請輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密碼: ant.design" />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ marginBottom: '1em' }}>
              <Row justify="space-between">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自動登入</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <a href="#">忘記密碼</a>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                登入
              </Button>
            </Form.Item>

            <Divider>其他登入方式</Divider>
            <Row justify="center">
              <Col span={4}>
                <Button
                  icon={<GoogleOutlined />}
                  shape="circle"
                  size="large"
                />
              </Col>
            </Row>
            <br/>
            <Row justify="center">
              <Col>
                尚未成為會員？
                <Link to="/register" style={{ marginLeft: '5px' }}>
                  註冊帳號。
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
