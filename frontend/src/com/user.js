import { Layout, Menu, Breadcrumb, Avatar, Card, List, Button } from 'antd';
import React, {Component} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
const { Header, Content, Footer } = Layout;

function Activity(props) {
  const types = ['團鳩',"團購"];
  const categories = ['遊戲',"戶外","時尚","教育","家庭","文創"];
  const cardStyle = {
    marginBottom: '20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0'
  };

  const listItemStyle = {
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0'
  };

  return(
    <Card title={props.activity.title} style={cardStyle}>
    <ul style={listStyle}>
        <li style={listItemStyle}>提案人：{props.activity.leader}</li>
        <li style={listItemStyle}>活動種類: {types[props.activity.type]}</li>
        <li style={listItemStyle}>活動類別: {categories[props.activity.category]}</li>
        <li style={listItemStyle}>活動描述: {props.activity.descript}</li>
        <li style={listItemStyle}>剩餘時間: {props.activity.end_date}</li>
        <Button>
            <a href="" onClick={() => props.deleteActivity(props.activity._id, props.delete_joined)}>Delete</a>
        </Button>
    </ul>
  </Card>
);
}

export default class UserGroupList extends Component {
  constructor(pros) {
      super(pros);

      this.host_activityList = this.host_activityList.bind(this);
      this.join_activityList = this.join_activityList.bind(this);
      this.deleteActivity = this.deleteActivity.bind(this);
      
      this.state = {
          host_activities: [],
          join_activities: [],
          uid: 0,
      };
  }

  componentDidMount() {
      const arr = window.location.href.split("/");
      const uuid = arr[arr.length-1].replace("?uid=", "")

      // 透過 url 解析出來的 user id (uid) 去 db-endpoint-server 找 user 目前加入的活動
      axios.get('http://localhost:5000/user/?uid=' + uuid)
          .then(response => {
              this.setState({
                host_activities: response.data.hostgroups,
                join_activities: response.data.joingroups,
                uid: uuid,
              });
          })
          .catch(err => {
              console.log(err);
          })
  }

  // 把對應 item 的 group id (gid) 跟當前 user 的 user id (uid) 拿出來，傳給 db-endpoint-server
  deleteActivity(gid, delete_joined=true) {
    console.log(`[frontend] DELETE target - gid ${gid}, uid ${this.state.uid}, deletejoin ${delete_joined}`);
    axios.delete('http://localhost:5000/user/?gid=' + gid + '&uid=' + this.state.uid + '&deletejoin=' + delete_joined)
        .then(res => console.log(res.data));

    if (delete_joined) {
      this.setState({
        join_activities: this.state.join_activities.filter(el => el._id !== gid)
      })
    } else {
      console.log("delete host");
      this.setState({
        host_activities: this.state.host_activities.filter(el => el._id !== gid)
      })
    }
  }

  host_activityList() {
      return this.state.host_activities.map(currentActivity => {
          return <Activity activity={currentActivity} deleteActivity={this.deleteActivity} key={currentActivity._id} delete_joined={false}/>;
      })
  }

  join_activityList() {
    return this.state.join_activities.map(currentActivity => {
        return <Activity activity={currentActivity} deleteActivity={this.deleteActivity} key={currentActivity._id} delete_joined={true}/>;
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

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    };

    const headerStyle = {
      color: '#1890ff',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px'
    };

    const avatarStyle = {
      marginBottom: '20px'
    };
    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content" style={contentStyle}>
            <Avatar size={64} icon={<UserOutlined />} style={avatarStyle} />
            <h2 style={headerStyle}>發起的活動</h2>
              {this.host_activityList()}
          </div>
          <br/>
          <div className="site-layout-content" style={contentStyle}>
            <Avatar size={64} icon={<UserOutlined />} style={avatarStyle} />
            <h2 style={headerStyle}>參加的活動</h2>
              {this.join_activityList()}
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
