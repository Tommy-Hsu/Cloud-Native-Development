import { Layout, Menu, Breadcrumb, Avatar, Card, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

const App = () => {
    const projectsSponsored = [
      'Project 1',
      'Project 2',
      //...
    ];

    const projectsStarted = [
      'Project A',
      'Project B',
      //...
    ];

    return (
      <Layout className="layout">
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Avatar size={64} icon={<UserOutlined />} />
            <Card title="Sponsored Projects">
              <List
                bordered
                dataSource={projectsSponsored}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Card>
            <Card title="Started Projects">
              <List
                bordered
                dataSource={projectsStarted}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ChillTan</Footer>
      </Layout>
    );
}

export default App;
