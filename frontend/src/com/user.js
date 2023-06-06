import { Layout, Menu, Breadcrumb, Avatar, Card, List, Button } from 'antd';
import React, {Component} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
const { Header, Content, Footer } = Layout;

function Activity(props) {
  const types = ['團鳩',"團購"];
  const categories = ['遊戲',"戶外","時尚","教育","家庭","文創"];
  return(
    <Card title={props.activity.title}>
      <ul>
          <li>提案人：{props.activity.leader}</li>
          <li>活動種類: {types[props.activity.type]}</li>
          <li>活動類別: {categories[props.activity.category]}</li>
          <li>活動描述: {props.activity.descript}</li>
          <li>剩餘時間: {props.activity.end_date}</li>
          <Button>
              <a href="" onClick={() => props.deleteActivity(props.activity._id)}>Delete</a>
          </Button>
      </ul>
    </Card>
  );
}

export default class UserGroupList extends Component {
  constructor(pros) {
      super(pros);

      this.activityList = this.activityList.bind(this);
      this.deleteActivity = this.deleteActivity.bind(this);
      
      this.state = {
          activities: [],
          uid: 0,
      };
  }

  componentDidMount() {
      const arr = window.location.href.split("/");
      const uuid = arr[arr.length-1].replace("?uid=", "")
      

      axios.get('http://localhost:5000/user/?uid=' + uuid)
          .then(response => {
              this.setState({
                activities: response.data,
                uid: uuid,
              });

              console.log(this.state.uid);
          })
          .catch(err => {
              console.log(err);
          })
  }

  deleteActivity(gid) {
    console.log('gid', gid);
    console.log('uid', this.state.uid);
    axios.delete('http://localhost:5000/user/?gid=' + gid + '&uid=' + this.state.uid)
        .then(res => console.log(res.data));
    
    this.setState({
        activities: this.state.activities.filter(el => el._id !== gid)
    })
  }

  activityList() {
      return this.state.activities.map(currentActivity => {
          return <Activity activity={currentActivity} deleteActivity={this.deleteActivity} key={currentActivity._id} />;
      })
  }

  render() {
    // return (
    //   <div>
    //       <h3>活動清單</h3>
    //       <table className='table'>
    //           <thead className='thead-light'>
    //               <tr>
    //                   <th>活動名稱</th>
    //                   <th>Leader</th> 
    //                   <th>Type</th>
    //                   <th>Category</th>
    //                   <th>Descript</th>
    //                   <th>End_date</th>
    //                   <th>Action</th>
    //               </tr>
    //           </thead>
    //           <tbody>
    //               {this.activityList()}
    //           </tbody>
    //       </table>
    //   </div>
    // );
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Avatar size={64} icon={<UserOutlined />} />
              {this.activityList()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ChillTan</Footer>
      </Layout>
    );
  }
}

// return (
//   <Layout className="layout">
//     <Content style={{ padding: '0 50px' }}>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>User</Breadcrumb.Item>
//         <Breadcrumb.Item>Bill</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="site-layout-content">
//         <Avatar size={64} icon={<UserOutlined />} />
//         <Card title="Sponsored Projects">
//           <List
//             bordered
//             dataSource={projectsSponsored}
//             renderItem={item => (
//               <List.Item>
//                 {item}
//               </List.Item>
//             )}
//           />
//         </Card>
//         <Card title="Started Projects">
//           <List
//             bordered
//             dataSource={projectsStarted}
//             renderItem={item => (
//               <List.Item>
//                 {item}
//               </List.Item>
//             )}
//           />
//         </Card>
//       </div>
//     </Content>
//     <Footer style={{ textAlign: 'center' }}>ChillTan</Footer>
//   </Layout>
// );
