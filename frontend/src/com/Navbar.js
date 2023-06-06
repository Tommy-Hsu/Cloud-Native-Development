import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Dropdown, Avatar, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage'; // 导入reactjs-localstorage库

const { Header } = Layout;

const CustomHeader = () => {
  const history = useHistory(); // 使用useHistory来进行页面跳转
  const [loggedIn, setLoggedIn] = useState(false); // 登录状态初始为false
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const session = reactLocalStorage.get('session'); // 从本地缓存中获取session信息

    if (session) {
      // 如果存在session信息，则将登录状态设置为true
      setLoggedIn(true);
      // 从后端获取用户数据的逻辑
      // 假设从后端获取的数据包含 "hoverText" 和 "userIcon" 字段

      // 模拟从后端获取的数据
      const fakeUserData = {
        hoverText: 'Hover me',
        userIcon: <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"/>,
      };

      setUserData(fakeUserData);
    } else {
      setLoggedIn(false);
    }

    // 侦听本地缓存变化的逻辑
    const handleLocalStorageChange = () => {
      const updatedSession = reactLocalStorage.get('session');

      if (updatedSession) {
        setLoggedIn(true);
        // 更新用户数据的逻辑
      } else {
        setLoggedIn(false);
        // 清除用户数据的逻辑
      }
    };

    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      // 清除本地缓存中的session信息
      reactLocalStorage.remove('session');
      setLoggedIn(false);
      history.push('/'); // 登出后跳转到登录页面
    }
    // 处理其他菜单项的点击事件
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <Link to="/user/647e31e4240695a9c5744c95">
          個人頁面
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15%' }}>
          <Link to="/" style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
            <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="Logo" style={{ width: 'auto', height: '30px' }} />
            <span style={{ marginRight: '16px' }}>Chilltan</span>
          </Link>
          <Button type="primary">
            <Link to="/create">提案!</Link>
          </Button>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
          <Input.Search placeholder="搜尋集資項目、揪團活動" enterButton style={{ width: '50%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '15%' }}>
          {loggedIn ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '43px' }}>
              <Dropdown trigger={['click']} dropdownRender={() => menu}>
                <span style={{ cursor: 'pointer' }}>
                <Space>
                  <Avatar icon={userData.userIcon} />
                  {userData.hoverText}
                </Space>
                </span>
              </Dropdown>
            </span>
          ) : (
            <>
              <span style={{ marginRight: '16px' }}>
                <Link to="/login">
                  <Button>登入</Button>
                </Link>
              </span>
              <Link to="/register">
                <Button>注冊</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
