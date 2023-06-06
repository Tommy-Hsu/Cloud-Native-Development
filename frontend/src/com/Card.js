import React, { useState, useEffect } from 'react';
import { Progress, Card, Row, Col, Space } from 'antd';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const cardData = [
  // Card data here
];

const CustomCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cardData, setCardData] = useState([]);

  const fetchData = async () => {
    try{
      const response = await fetch('http://localhost:5001/all-events');
      const data = await response.json();
      if (Array.isArray(data)) {
        const dataFromBackend = data.map(group =>({
          title: group.title,
          description: group.description,
          type: group.type,
          category: group.category,
          // leader: group.leader,
          price: group.price,
          end_date: group.end_date,
          least: group.least,
    }));
        setCardData(dataFromBackend);
        console.log(cardData)
      } else {
        throw new Error('Data is not an array');
      }
    }catch(error){
      console.error('Failed to fetch events',error);
    }
    //   setCardData(response.data);
    // }catch(error){
    //   console.error('Failed to fetch events',error);
    // }
    // Simulating API call to fetch card data from backend
    // Replace with your actual API call
    // const dataFromBackend = response.data.map(event =>({
    //   title: event.title,
    //   description: event.description,
    //   type: event.type,
    //   category: event.category,
    //   leader: event.leader,
    //   price: event.price,
    //   end_date: event.end_date,
    //   least: event.least,
    // }))
      // {
      //   title: '玩完九成都會醉，明天忘記你是誰 - The Drunk Land 醉後大富翁',
      //   description: 'www.instagram.com',
      //   coverImage: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      //   productURL: '/detail',
      //   targetCount: 100,
      //   purchaseCount: 50,
      // },
      // {
      //   title: '玩完九成都會醉，明天忘記你是誰 - The Drunk Land 醉後大富翁',
      //   description: 'www.instagram.com',
      //   coverImage: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      //   productURL: '/detail',
      //   targetCount: 100,
      //   purchaseCount: 50,
      // },
      // {
      //   title: '玩完九成都會醉，明天忘記你是誰 - The Drunk Land 醉後大富翁',
      //   description: 'www.instagram.com',
      //   coverImage: 'https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg',
      //   productURL: '/detail',
      //   targetCount: 100,
      //   purchaseCount: 50,
      // },
      // {
      //   title: '玩完九成都會醉，明天忘記你是誰 - The Drunk Land 醉後大富翁',
      //   description: 'www.instagram.com',
      //   coverImage: 'https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg',
      //   productURL: '/product/1',
      //   targetCount: 100,
      //   purchaseCount: 50,
      // },{
      //   title: '玩完九成都會醉，明天忘記你是誰 - The Drunk Land 醉後大富翁',
      //   description: 'www.instagram.com',
      //   coverImage: 'https://huacheng.gz-cmc.com/upload/news/image/2023/01/12/c5ae582e65fb4dca931d4ecd3acde7df.jpeg',
      //   productURL: '/product/1',
      //   targetCount: 100,
      //   purchaseCount: 50,
      // },
      // Add more card data as needed

  //   setCardData(dataFromBackend);
  // }catch(error){
  //   console.error('Failed to fetch events',error);
  // }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh'
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
      fontWeight: 'bold'
    },
    image: {
      height: '200px',
      objectFit: 'contain',
    }
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
    <div style={styles.container}>
      <div style={{ padding: '24px', width: '70%' }}>
        <Select
          defaultValue="商品"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'product', label: '商品' },
            { value: 'event', label: '揪團活動' }
          ]}
        />
        <Space style={{ width: 60, justifyContent: 'center' }}> 
        <h3>+</h3>
        </Space>
        <Select
          defaultValue="戶外"
          style={{ width: 120, }}
          onChange={handleChange}
          options={[
            { value: 'outdoor', label: '戶外' },
            { value: 'game', label: '遊戲' },
            { value: 'sport', label: '運動' },
            { value: 'music', label: '音樂' },
            { value: 'act', label: '藝術' },
            { value: 'others', label: '其他' }
          ]}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
            {cardData.map((card, index) => (
              <Col key={index} {...getColProps()}>
                <Link to={card.productURL} style={styles.link}>
                <div style={styles.cardContainer}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={card.title}
                        src={card.coverImage}
                        style={styles.image}
                      />
                    }
                  >
                    <Meta title={card.title} description={card.description} />
                    <Progress
                      percent={(card.purchaseCount / card.targetCount) * 100}
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
      </div>
    </div>
  );
};
export default CustomCard;
