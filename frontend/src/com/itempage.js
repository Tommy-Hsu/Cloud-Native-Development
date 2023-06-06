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
    <Content style={{ width: '60%', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{ width: '40%', marginRight: '2rem' }}>
            <div style={{ height: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="product-image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
            </div>
        </div>
        <div style={{ width: '30%' }}>
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
                        <h2>目前人數： 5</h2>
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
                <p>剩餘時間：{props.activity.end_date}</p>
            </div>
        </div>
    </div>
            
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ width: '70%' }}>
        <Tabs defaultActiveKey="1">
        <TabPane tab="商品介绍" key="1">
            <p>{props.activity.descript}</p>
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
        <Button type="primary" style={{ marginBottom: '1rem' }}>
              <a href="" onClick={() => props.joinActivity(props.activity._id)}>點擊加入</a>
          </Button>
        </Affix>
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
        uid: 0,
      };
  }

  componentDidMount() {
      let arr = window.location.href.split("/");
      arr = arr[arr.length-1].replace("?", "");
      arr = arr.split("&");

      const ggid = arr[0].replace("gid=", "");
      const uuid = arr[1].replace("uid=", "");

      console.log('gid', ggid);
      console.log('uid', uuid);

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

  joinActivity(gid) {
    console.log('gid', gid);
    console.log('uid', this.state.uid);

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
          <Layout>
            {this.activityList()}
          </Layout>
        </Router>
    )
  }
}
// return (
//     <Router>
//       <Layout>
//         <Content style={{ width: '60%', margin: '0 auto' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
//             <div style={{ width: '40%', marginRight: '2rem' }}>
//               <div style={{ height: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
//                 <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
//               </div>
//             </div>
//             <div style={{ width: '30%' }}>
//               <div style={{ marginBottom: '1rem' }}>
//                 <h2>{product.category}</h2>
//                 <p>
//                   提案人：<Link to={product.proposerLink}>{product.proposer}</Link>
//                 </p>
//               </div>
//               <div style={{ marginBottom: '1rem' }}>
//                 <h1>{product.name}</h1>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <div>
//                     <h3>目標人数：{product.targetCount}</h3>
//                     <h3>目前人数：{product.purchaseCount}</h3>
//                   </div>
//                   <div>
//                     <h2>原價：{product.originalPrice}</h2>
//                     <h2>現價：{product.currentPrice}</h2>
//                   </div>
//                 </div>
//                 <Progress percent={(product.purchaseCount / product.targetCount) * 100}
//                 status="active"
//                 strokeColor={{
//                   from: '#108ee9',
//                   to: '#87d068',
//                 }} />
//                 <p>剩餘時間：{product.remainingTime}</p>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div style={{ width: '70%' }}>
//               <Tabs defaultActiveKey="1">
//                 <TabPane tab="商品介绍" key="1">
//                   <p>這裡是商品介绍...</p>
//                 </TabPane>
//                 <TabPane tab="評論回復" key="2">
//                   {comments.map((comment, index) => (
//                     <p key={index}><b>{comment.title}:</b> {comment.comment}</p>
//                   ))}
//                 </TabPane>
//               </Tabs>
//             </div>
//             <div style={{ width: '30%' }}>
//               <Affix offsetTop={0}>
//                 <Button type="primary" style={{ marginBottom: '1rem' }}>點擊加入</Button>
//               </Affix>
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     </Router>
// )