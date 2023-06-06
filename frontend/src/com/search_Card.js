import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchCard = () => {
    const[cardData, setCardData] = useState([]);
    const { keyword } = useParams();
    const savedSession = reactLocalStorage.get('session');
  
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:5001/event-search/${keyword}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    const dataFromBackend = data.map(group =>({
                      uid: savedSession,
                      gid: group._id,
                      title: group.title,
                      description: group.description,
                      type: group.type,
                      category: group.category,
                      // leader: group.leader,
                      price: group.price,
                      end_date: group.end_date,
                      least: group.least,
                      number: group.number,
            }));
                    setCardData(dataFromBackend);
                    console.log(cardData)
                    } else {
                    throw new Error('Data is not an array');
                    }
            }catch(error){
                console.error('Failed to fetch events',error);
            }
        };
        fetchData();
    }, [keyword]);

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
                { value: '0', label: '團鳩' },
                { value: '1', label: '團購' }
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
                { value: '0', label: '遊戲' },
                { value: '1', label: '戶外' },
                { value: '2', label: '時尚' },
                { value: '3', label: '教育' },
                { value: '4', label: '家庭' },
                { value: '5', label: '文創' }
              ]}
            />
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
                        <Meta title={card.title} description={card.description} />
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
          </div>
        </div>
      );
}
export default SearchCard;