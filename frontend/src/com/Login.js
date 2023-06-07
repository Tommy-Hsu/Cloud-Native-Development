import { Link, useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage'; // 导入useLocalStorage钩子函数

const layout = {
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function Login() {
  const history = useHistory(); // 使用useHistory来进行页面跳转

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const response = await axios.post('http://localhost:7777/signin', {
        email: values.username,
        password: values.password
      });

      console.log('Sign in successful', response.data);

      if (response.data) {
        // 接收后端提供的 session 和 msg
        const session = response.data.session;  
        const msg = response.data.msg;
        // 现在你可以使用 session 和 msg 进行其他操作
        console.log('Received session: ', session);
        console.log('Received msg: ', msg);

        reactLocalStorage.set('session', session);

        const savedSession = reactLocalStorage.get('session');
        if(savedSession === session){
          console.log('Session saved successfully');
        }else{
          console.error('Session save failed');
        }
        history.push('/'); // 跳转到最初始页面
      } else {
        console.error('Sign in failed: No data received from backend');
      }
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
          src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=600"
          alt="background"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />
      </Col>
      <Col span={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '70%', marginTop: '10%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1em' }}>
            <Link to="/">
              <img
                src="https://www.tsmc.com/themes/custom/bootstrap_sass/images/logo.png"
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
              <Input prefix={<UserOutlined />} placeholder="Admin or User" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '請輸入密碼!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
