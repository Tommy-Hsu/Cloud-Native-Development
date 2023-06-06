import React from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const categories = ['商品',"揪團"];
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

  const onFinish = async (values) => {
    const type = parseInt(values.type, 10);
    const category = values.category;
    const price = parseInt(values.price, 10);
    const least = parseInt(values.least, 10);
    const session = values.session;
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
      image
    });

    try {
      // 执行POST请求
      const response = await axios.post('http://localhost:8080/create', {
        session,
        type,
        category,
        title: values.title,
        descript: values.descript,
        price,
        end_date,
        least,
        image
      });

      console.log('POST请求成功', response.data);
      // 在这里可以处理请求成功后的逻辑

    } catch (error) {
      console.error('POST请求失败', error);
      // 在这里可以处理请求失败后的逻辑
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
        label="Session"
        name="session"
      >
        <Input />
      </Form.Item>

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
          {/* {categories.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))} */}
          <Option value="0">團鳩</Option>
          <Option value="1">團購</Option>
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
        label="開始時間-結束時間"
        name="end_date"
        rules={[{ required: true, message: '請選擇時間範圍' }]}
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

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      <Form.Item
        label="圖片"
        name="image"
        rules={[{ required: true, message: '請輸入圖片網址' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default MyForm;
