import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function Register() {
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      const response = await axios.post('http://localhost:7777/signup', {
        email: values.email,
        password: values.password,
    });
    console.log('Register success', response.data);
  } catch (error) {
    console.error('Register failed', error);
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
            <p>歡迎加入！让我们一起开始吧。</p>
          </div>
          <Form
            {...layout}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <Form.Item
              name="username"
              rules={[{ required: true, message: '請輸入用戶名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用戶名" />
            </Form.Item> */}

            <Form.Item
              name="email"
              rules={[{ required: true, message: '請輸入电子信箱!' }, { type: 'email', message: '請輸入有效的电子信箱!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="电子信箱" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '請輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密碼" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: '請再次輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="確認密碼" />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ marginBottom: '1em' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>我已閱讀並接受使用條款</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                註冊
              </Button>
            </Form.Item>

            <Divider>其他註冊方式</Divider>
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
                已經成為會員？
                <Link to="/login" style={{ marginLeft: '5px' }}>
                  登入帳號。
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
