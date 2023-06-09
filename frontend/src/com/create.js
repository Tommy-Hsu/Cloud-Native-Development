import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, Upload } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
const { Option } = Select;

const categories = ['團購', '揪團'];
const initialValues = {
  session: '',
  type: undefined,
  category: undefined,
  title: '',
  descript: '',
  price: undefined,
  end_date: null,
  least: undefined,
  number: 0,
  image: '',
};

const MyForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = reactLocalStorage.get('session');
    if (savedSession) {
      form.setFieldsValue({ session: savedSession });
      setSession(savedSession);
    }
  }, []);

  const handleUpload = (file) => {
    setLoading(true);
    // 模拟异步上传请求
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      axios
        .post('your-backend-upload-url', formData)
        .then((response) => {
          const imageUrl = response.data.imageUrl;
          setImageUrl(imageUrl);
          form.setFieldsValue({ image: imageUrl });
          setLoading(false);
          resolve();
        })
        .catch((error) => {
          console.error('图片上传失败', error);
          setLoading(false);
          reject();
        });
    });
  };

  const onFinish = async (values) => {
    const type = parseInt(values.type, 10);
    const category = values.category;
    const price = parseInt(values.price, 10);
    const least = parseInt(values.least, 10);
    const image = values.image;
    const number = 0;
    const end_date = values.end_date ? values.end_date.format('YYYY-MM-DD') : null;

    console.log('Form values:', {
      session,
      type,
      category,
      title: values.title,
      descript: values.descript,
      price,
      end_date,
      least,
      number,
      image,
    });

    try {
      const response = await axios.post('http://localhost:8080/create', {
        session,
        type,
        category,
        title: values.title,
        descript: values.descript,
        price,
        end_date,
        least,
        image,
        number,
      });

      console.log('POST请求成功', response.data);
      history.push('/');
    } catch (error) {
      console.error('POST请求失败', error);
    }
  };

  return (
    <Form
      form={form}
      name="myForm"
      initialValues={initialValues}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <img
        src="https://media.istockphoto.com/id/879044054/photo/student-group-socializing-in-communal-area-of-busy-college.jpg?s=612x612&w=0&k=20&c=o67CEZla78kOffkAhY1888Z_7vNtGNmnPl-wLfNhKtU="
        alt="Form Illustration"
        style={{
          display: 'block',
          marginBottom: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%', // Adjust as needed
          height: '300px', // Adjust as needed
          objectFit: 'contain', // Cover to prevent distortion
        }}
      />
      {/* <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px', // Adjust as needed
          fontSize: '5em', // Adjust as needed
          // fontFamily: "'Arial', sans-serif", // Change to your preferred font
        }}>
          ChillTan~一起揪團一起玩
        </div> */}
      <Form.Item
        label="名稱"
        name="title"
        rules={[{ required: true, message: '請輸入名稱' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="種類"
        name="type"
        rules={[{ required: true, message: '請選擇種類' }]}
      >
        <Select placeholder="請選擇種類">
          <Option value="0">團購</Option>
          <Option value="1">團揪</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="類別"
        name="category"
        rules={[{ required: true, message: '請選擇類別' }]}
      >
        <Select placeholder="請選擇類別">
          <Option value="0">遊戲</Option>
          <Option value="1">戶外</Option>
          <Option value="2">時尚</Option>
          <Option value="3">教育</Option>
          <Option value="4">家庭</Option>
          <Option value="5">文創</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="商品價格"
        name="price"
        rules={[{ required: true, message: '請輸入商品價格' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        label="所需人數"
        name="least"
        rules={[{ required: true, message: '請輸入所需人數' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="結束時間"
        name="end_date"
        rules={[{ required: true, message: '請選擇時間' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="簡要描述"
        name="descript"
        rules={[{ required: true, message: '請輸入簡要描述' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="圖片"
        name="image"
        rules={[{ required: true, message: '請輸入圖片路徑' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
