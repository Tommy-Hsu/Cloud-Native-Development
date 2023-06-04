import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { Dragger } = Upload;

const categories = ['商品', '揪團活動'];
const initialValues = {
  name: '',
  category: '',
  type: '',
  price: '',
  groupPrice: '',
  minRequiredPeople: null,
  maxRequiredPeople: null,
  dateRange: null,
  description: '',
  image: null,
};

const MyForm = () => {
  const [formType, setFormType] = useState('default');

  const onFinish = (values) => {
    console.log('Form values:', values);
    // 在这里可以进行表单提交的逻辑处理
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
      name="myForm"
      initialValues={initialValues}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        label="名稱"
        name="name"
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
              <Option value="選項1">選項1</Option>
              <Option value="選項2">選項2</Option>
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
            name="requiredPeople"
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
              <Option value="選項1">選項1</Option>
              <Option value="選項2">選項2</Option>
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
                name="minRequiredPeople"
                rules={[{ required: true, message: '請輸入最低人數' }]}
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                label="最多人數"
                name="maxRequiredPeople"
                rules={[{ required: true, message: '請輸入最多人數' }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </>
          )}
        </>
      )}

      <Form.Item
        label="開始時間-結束時間"
        name="dateRange"
        rules={[{ required: true, message: '請選擇時間範圍' }]}
      >
        <DatePicker.RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          ranges={{
            今天: [moment(), moment()],
            本月: [moment().startOf('month'), moment().endOf('month')],
          }}
        />
      </Form.Item>

      <Form.Item
        label="簡要描述"
        name="description"
        rules={[{ required: true, message: '請輸入簡要描述' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="圖片上傳"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[{ required: true, message: '請上傳圖片' }]}
      >
        <Dragger {...imageUploaderProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">點擊或拖動文件到此區域進行上傳</p>
        </Dragger>
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
