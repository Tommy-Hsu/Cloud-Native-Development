import React, { useState, useEffect } from 'react';
import { Progress, Card, Row, Col, Space, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Carousel, Layout } from 'antd';

import { reactLocalStorage } from 'reactjs-localstorage';

const { Meta } = Card;

const { Content } = Layout;
const contentStyle = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://img.shoplineapp.com/media/image_clips/645078682e5ce1000e7b2f61/original.jpg?1682995303')`,
  // backgroundImage: `url('https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};
const contentStyle1 = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://assets.zeczec.com/asset_585906_image_big.jpg?1673517415')`,
  // backgroundImage: `url('https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};
const contentStyle2 = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
  // backgroundImage: `url('https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};
const contentStyle3 = {
  width: '80%',
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  margin: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url('https://assets.zeczec.com/asset_633013_image_big.jpg?1684834419')`,
  // backgroundImage: `url('https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};
const cardData = [
  // Card data here
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cardData, setCardData] = useState([]);
  const [session, setSession] = useState(null)
  const savedSession = reactLocalStorage.get('session');
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/all-events');
      const data = await response.json();
      if (Array.isArray(data)) {
        const dataFromBackend = data.map((group) => {
          console.log(group.img);
          return({
          uid: savedSession,
          gid: group._id,
          leader: group.leader,
          title: group.title,
          description: group.descript,
          type: group.type,
          category: group.category,
          // leader: group.leader,
          price: group.price,
          end_date: group.end_date,
          least: group.least,
          img: group.image,
          number: group.number,
          })
        });
        setCardData(dataFromBackend);
        console.log(cardData);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
    },
    linkContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    cardContainer: {
      width: '100%',
    },
    link: {
      textDecoration: 'none',
      color: '#1890ff',
      fontWeight: 'bold',
    },
    image: {
      height: '200px',  // 限制圖片高度
      objectFit: 'contain',  // 讓圖片自動調整以適應容器
      width: '100%',  // 使圖片寬度適應容器
    },
    description: {
      display: '-webkit-box',  // 使用 -webkit-box 來實現文本截斷
      overflow: 'hidden',  // 隱藏超出範圍的文本
      WebkitLineClamp: 2,  // 限制文本行數
      WebkitBoxOrient: 'vertical',  // 使文本垂直排列
    },
  };

  const getColProps = () => {
    // Adjust the column properties based on screen size
    return {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 8 },
      lg: { span: 7 },
      xl: { span: 7 },
    };
  };

  return (
    <Content style={{ width: '70%', margin: 'auto', justifyContent: 'center' }}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}></h3>
        </div>
        <div>
          <h3 style={contentStyle1}></h3>
        </div>
        <div>
          <h3 style={contentStyle2}></h3>
        </div>
        <div>
          <h3 style={contentStyle3}></h3>
        </div>
      </Carousel>

      {/* <Select
        defaultValue="商品"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'product', label: '商品' },
          { value: 'event', label: '揪團活動' },
        ]}
      />
      <Space style={{ width: 60, justifyContent: 'center' }}>
        <h3>+</h3>
      </Space>
      <Select
        defaultValue="戶外"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: '0', label: '戶外' },
          { value: '1', label: '遊戲' },
          { value: '2', label: '運動' },
          { value: '3', label: '音樂' },
          { value: '4', label: '藝術' },
          { value: '5', label: '其他' },
        ]}
      /> */}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
          {cardData.map((card, index) => (
            <Col key={index} {...getColProps()}>
            <Link to={`/detail/?gid=${card.gid}&uid=${card.uid}`}>
              <div style={styles.cardContainer}>
                <Card hoverable>
                  <Link to={`/detail/?gid=${card.gid}&uid=${card.uid}`}>
                    <img alt={card.title} src={card.img} style={styles.image} />
                  </Link>
                  <Meta title={card.title} description={<div style={styles.description}>{card.description}</div>} />
                  <Progress
                    percent={Math.round((card.number / card.least) * 100)}
                    status="active"
                    strokeColor={{
                      from: '#108ee9',
                      to: '#87d068'
                    }}
                  />
                  <div style={styles.linkContainer}>
                    查看詳情
                  </div>
                </Card>
              </div>
            </Link>
          </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default Home;
