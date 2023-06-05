import React from 'react';
import { Layout, Card, Progress, Button, Tabs, Affix } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

// 假定的产品数据和评论数据
const product = {
  category: "類別",
  proposer: "提案人",
  proposerLink: "/proposerLink",
  name: "商品名稱",
  targetCount: 100,
  purchaseCount: 50,
  originalPrice: "200",
  currentPrice: "100",
  image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  remainingTime: "剩餘時間",
};

const comments = [
  { title: 'John', comment: 'This product is good.' },
  { title: 'Tom', comment: 'I love this product.' },
];

const ProductDetail = () => {
  return (
    <Router>
      <Layout>
        <Content style={{ width: '60%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '40%', marginRight: '2rem' }}>
              <div style={{ height: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
              </div>
            </div>
            <div style={{ width: '30%' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2>{product.category}</h2>
                <p>
                  提案人：<Link to={product.proposerLink}>{product.proposer}</Link>
                </p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h1>{product.name}</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3>目標人数：{product.targetCount}</h3>
                    <h3>目前人数：{product.purchaseCount}</h3>
                  </div>
                  <div>
                    <h2>原價：{product.originalPrice}</h2>
                    <h2>現價：{product.currentPrice}</h2>
                  </div>
                </div>
                <Progress percent={(product.purchaseCount / product.targetCount) * 100}
                status="active"
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }} />
                <p>剩餘時間：{product.remainingTime}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '70%' }}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="商品介绍" key="1">
                  <p>這裡是商品介绍...</p>
                </TabPane>
                <TabPane tab="評論回復" key="2">
                  {comments.map((comment, index) => (
                    <p key={index}><b>{comment.title}:</b> {comment.comment}</p>
                  ))}
                </TabPane>
              </Tabs>
            </div>
            <div style={{ width: '30%' }}>
              <Affix offsetTop={0}>
                <Button type="primary" style={{ marginBottom: '1rem' }}>點擊加入</Button>
              </Affix>
            </div>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default ProductDetail;