import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;
const { Dragger } = Upload;

const categories = ['商品', '揪團活動'];
const initialValues = {
  session: '',
  type: undefined,
  category: undefined,
  title: '',
  descript: '',
  price: undefined,
  end_date: '',
  least: undefined,
};

const MyForm = () => {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState('default');

  const onFinish = async (values) => {
    const type = parseInt(values.type, 10);
    const category = parseInt(values.category, 10);
    const price = parseInt(values.price, 10);
    const least = parseInt(values.least, 10);

    console.log('Form values:', {
      ...values,
      type,
      category,
      price,
      least,
    });

    try {
      // 执行POST请求
      const response = await axios.post('http://localhost:8080/create', {
        ...values,
        type,
        category,
        price,
        least,
      });

      console.log('POST请求成功', response.data);
      // 在这里可以处理请求成功后的逻辑

    } catch (error) {
      console.error('POST请求失败', error);
      // 在这里可以处理请求失败后的逻辑
    }
  };

  const handleCategoryChange = (value) => {
    if (value === '揪團活動') {
      setFormType('custom');
    } else {
      setFormType('default');
    }
  };

  const handleImageUpload = (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 文件上傳成功`);
      // 在这里可以处理上传后的文件对象 originFileObj
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上傳失敗`);
    }
  };

  const imageUploaderProps = {
    name: 'image',
    multiple: false,
    beforeUpload: (file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const isAllowed = allowedTypes.includes(file.type);
      if (!isAllowed) {
        message.error('只能上傳 JPG、JPEG 或 PNG 格式的圖片！');
      }
      return isAllowed ? true : Upload.LIST_IGNORE;
    },
    onChange: handleImageUpload,
    accept: '.jpg,.jpeg,.png',
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
        name="category"
        rules={[{ required: true, message: '請選擇種類' }]}
      >
        <Select placeholder="請選擇種類" onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {formType === 'default' ? (
        <>
          <Form.Item
            label="類別"
            name="type"
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
        </>
      ) : (
        <>
          <Form.Item
            label="類別"
            name="type"
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
            label="活動總價格"
            name="price"
            rules={[{ required: true, message: '請輸入活動總價格' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          {formType === 'custom' && (
            <>
              <Form.Item
                label="最低人數"
                name="least"
                rules={[{ required: true, message: '請輸入最低人數' }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </>
          )}
        </>
      )}

      <Form.Item
        label="開始時間-結束時間"
        name="end_date"
        rules={[{ required: true, message: '請選擇時間範圍' }]}
      >
        <DatePicker.RangePicker showTime format="YYYY-MM-DD" />
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
    </Form>
  );
};

export default MyForm;
