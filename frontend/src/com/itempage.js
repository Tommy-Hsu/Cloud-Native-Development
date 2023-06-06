import { Layout, Tabs, Affix, Avatar, Card, List, Button, Progress } from 'antd';
import React, {Component} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
const { TabPane } = Tabs;

function Activity(props) {
  const types = ['團鳩',"團購"];
  const comments = [
    { title: 'John', comment: 'This product is good.' },
    { title: 'Tom', comment: 'I love this product.' },
  ];

  return(
    <Content style={{ width: '80%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '40%', marginRight: '2rem' }}>
              <div style={{ height: '420px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="product-image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
              </div>
            </div>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ marginBottom: '1rem' }}>
            <h2>{types[props.activity.type]}</h2>
            <p>
                {/* 提案人：<Link to={product.proposerLink}>{props.activity.leader}</Link> */}
                <h2>提案人： {props.activity.leader}</h2>
            </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <h1>{props.activity.title}</h1>
                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                    <div>
                        <h2>目標人數： {props.activity.least}</h2>
                        <h2>目前人數： {props.activity.number}</h2>
                    </div>
                    <div>
                        <h2>價格： {props.activity.price}</h2>
                    </div>
                {/* </div> */}
                <Progress percent={(5 / props.activity.targetCount) * 100}
                status="active"
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }} />
                <p>截止時間：{props.activity.end_date}</p>
            </div>
            <Affix offsetTop={0}>
                
              <Button 
                type="primary" style={{ marginBottom: '1rem', width: '100%' }}
                onClick={() => props.joinActivity(props.activity._id)}
              >
                我要加入
              </Button>
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
  );
}

export default class UserGroupList extends Component {
  constructor(pros) {
      super(pros);

      this.activityList = this.activityList.bind(this);
      this.joinActivity = this.joinActivity.bind(this);
      
      this.state = {
        activities: [],
        uid: 0,             // 紀錄當前的 userid，之後加入活動要使用
      };
  }

  componentDidMount() {
      let arr = window.location.href.split("/");
      arr = arr[arr.length-1].replace("?", "");
      arr = arr.split("&");

      const ggid = arr[0].replace("gid=", "");
      const uuid = arr[1].replace("uid=", "");

      // 透過 url 解析出來的 group id (gid) 去 db-endpoint-server 找對應的活動資料
      axios.get('http://localhost:5000/user/?gid=' + ggid)
          .then(response => {
            this.setState({
                activities: response.data,
                uid: uuid,
            })
          })
          .catch(err => {
              console.log(err);
          })
  }

  // 把當前 item 的 group id (gid) 跟 當前瀏覽的 user id (uid) 拿出來，傳給 db-endpoint-server
  joinActivity(gid) {
    console.log(`[frontend] JOIN target - gid ${gid}, uid ${this.state.uid}`);
    axios.post('http://localhost:5000/user/?gid=' + gid + '&uid=' + this.state.uid)
        .then(res => console.log(res.data))
  }

  activityList() {
    return this.state.activities.map(currentActivity => {
        return <Activity activity={currentActivity} joinActivity={this.joinActivity} key={currentActivity._id} />;
    })
}

  render() {
    return (
        <Router>
          <Layout style={{ background: 'white' }}>
            {this.activityList()}
          </Layout>
        </Router>
    )
  }
}
