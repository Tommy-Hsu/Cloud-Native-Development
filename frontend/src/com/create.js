import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, Upload } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { reactLocalStorage } from 'reactjs-localstorage';
const { Option } = Select;



const categories = ['商品', '揪團'];
const initialValues = {
  session: '',
  type: undefined,
  category: undefined,
  title: '',
  descript: '',
  price: undefined,
  end_date: '',
  least: undefined,
  image: '',
};

const MyForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [session, setSession] = useState(null)

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      form.setFieldsValue({ session });
    }
  }, []);

  const handleUpload = (file) => {
    setLoading(true);
    // 模拟异步上传请求
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      axios.post('your-backend-upload-url', formData)
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
    // const session = values.session;
    const image = values.image;
    const end_date = moment(values.end_date).format('YYYY-MM-DD');

    console.log('Form values:', {
      session,
      type,
      category,
      title: values.title,
      descript: values.descript,
      price,
      end_date,
      least,
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
      });

      console.log('POST请求成功', response.data);
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
          {categories.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
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

      {/* <Form.Item
        label="圖片"
        name="image"
        rules={[{ required: true, message: '請上傳圖片' }]}
      >
        <Upload
          name="image"
          beforeUpload={handleUpload}
          listType="picture"
          showUploadList={false}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="圖片預覽" style={{ maxWidth: '100%' }} />
          ) : (
            <Button icon={<UploadOutlined />} loading={loading}>
              上傳圖片
            </Button>
          )}
        </Upload>
      </Form.Item> */}
      {/* 其他表单项 */}
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;