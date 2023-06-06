import React, { useState, useEffect } from 'react';
import { Layout, Progress, Button, Tabs, Affix } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

const ProductDetail = () => {
  const [product, setProduct] = useState({
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
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 发送GET请求以获取产品详细信息
        const response = await fetch(`/api/product?gid=${encodeURIComponent(123)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          // 处理错误
          console.log('获取产品详细信息失败');
        }
      } catch (error) {
        console.log('错误：', error);
      }
    };

    fetchProduct();
  }, []); // 空的依赖数组确保该效果仅在初始渲染后运行一次

  const comments = [
    { title: 'John', comment: '这个产品很好。' },
    { title: 'Tom', comment: '我喜欢这个产品。' },
  ];
  return (
    <Router>
      <Layout style={{ background: 'white' }}>
        <Content style={{ width: '80%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '40%', marginRight: '2rem' }}>
              <div style={{ height: '420px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
              </div>
            </div>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2>{product.category}</h2>
                <p>
                提案人：<Link to={product.proposerLink}>{product.proposer}</Link>
                </p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h1>{product.name}</h1>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>目標人数：{product.targetCount}</h3>
                    <h3>目前人数：{product.purchaseCount}</h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>原價：{product.originalPrice}</h3>
                    <h3>現價：{product.currentPrice}</h3>
                  </div>
                </div>
                <Progress percent={(product.purchaseCount / product.targetCount) * 100} />
                <p>剩餘時間：{product.remainingTime}</p>
              </div>
              <Affix offsetTop={0}>
                <Button type="primary" style={{ marginBottom: '1rem', width: '100%' }}>點擊加入</Button>
              </Affix>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '70%' }}>
              <Tabs defaultActiveKey="1" centered>
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
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default ProductDetail;
