import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import 'antd/dist/antd.css';
import {
  HomeOutlined,
  UserOutlined,
  AuditOutlined,
  SearchOutlined,
  DownOutlined,
  UserAddOutlined,
  TeamOutlined,
  LogoutOutlined,
  RightSquareOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Input, Row, Col, Button, Space, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CHECK_MY_IP_REQUEST, logoutRequestAction } from '../reducers/user';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled, { createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import ChanhoInfo from './ChanhoInfo';

const { Sider } = Layout;
const Global = createGlobalStyle`
  body {
    background-color: #fff !important;
  }
  #__next {
    height: 100% !important;
  }
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }

  .ant-layout {
    height: 100% !important;
  }
  .ant-layout .site-layout {
    margin: 0 !important;
  }
  .ant-card-bordered 
{
    border: none;
  }
  .ant-layout-sider-trigger {
    border-right:1px solid #f2f2f2;
  }
`;

const Header = styled.div``;
const HeaderUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 60px;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;

  font-size: medium;
  font-weight: 600;
`;
const HeaderLeft = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  .logo {
    margin-right: 15px;
    cursor: pointer;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  width: 30%;
  justify-content: end;
  padding-right: 10px;
  .profileLink {
    margin-left: 15px;
    margin-right: 15px;
  }
  .logout {
    cursor: pointer;
  }
`;
const HeaderInput = styled.div`
  width: 40%;
  margin-left: auto;
  margin-bottom: 10px;
  .ant-input {
    border: none;
    border-bottom: 2px solid darkgray;
  }
`;
const allmenu = (
  <Menu>
    <Menu.Item key={1}>
      <Link href='/allpage'>
        <a>Category: all</a>
      </Link>
    </Menu.Item>
    <Menu.Item key={2}>
      <Link href='/catpage'>
        <a>Category: cat</a>
      </Link>
    </Menu.Item>
    <Menu.Item key={3}>
      <Link href='/dogpage'>
        <a>Category: dog</a>
      </Link>
    </Menu.Item>
  </Menu>
);

const AddvertisementWrapper = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
  .addv_img1 {
    background-image: url('/img/avm1.png');
    background-size: cover;
    aspect-ratio: 1920/481;
  }
  .addv_img2 {
    background-image: url('/img/avm2.png');
    background-size: cover;
    aspect-ratio: 1920/481;
  }
`;
const AppLogo = styled.div`
  background-image: url('/img/logo.png');
  background-size: cover;
  aspect-ratio: 1172/358;
  width: 150px;
`;

const UserHandle = styled.div`
  display: flex;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const { me } = useSelector((state) => state.user);

  const [searchInput, onChangeSearchInput] = useInput('');
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  /**
   * 현재 ip와 실제 접속된 ip를 확인하기 위해
   * userId를 server로 넘겨준다.
   */
  // useEffect(() => {
  //   if (me) {
  //     dispatch({
  //       type: CHECK_MY_IP_REQUEST,
  //       data: me.id,
  //     });
  //   }
  // });

  const onLogOut = useCallback(() => {
    // (function () {
    //   Router.push('/');
    // })();

    dispatch(logoutRequestAction());
  }, []);

  const value = {
    me,
    onLogOut,
  };

  return (
    <Layout hasSider>
      <Global />
      <Layout
        className='site-layout'
        style={{
          paddingTop: 10,
          backgroundColor: '#fff',
        }}
      >
        <Row gutter={8}>
          <Col xs={0} md={2}>
            <Sider
              theme='light'
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={300}
              collapsedWidth={60}
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1000,
                backgroundColor: '#1C6DD0',
              }}
            >
              <Menu
                theme='light'
                defaultSelectedKeys={['1']}
                mode='inline'
                style={{
                  backgroundColor: '#1C6DD0',
                  borderRight: '1px',
                  color: '#fff',
                }}
              >
                <Menu.Item key={1} icon={<HomeOutlined />}>
                  <Link href='/'>
                    <a>HOME</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={2}
                  icon={
                    <img
                      src='/img/allIcon.png'
                      alt='all'
                      style={{ width: '15px' }}
                    />
                  }
                >
                  <Link href='/allpage'>
                    <a>All</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={3}
                  icon={
                    <img
                      src='/img/catIcon.png'
                      alt='all'
                      style={{ width: '15px' }}
                    />
                  }
                >
                  <Link href='/catpage'>
                    <a>Cat</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={4}
                  icon={
                    <img
                      src='/img/dogIcon.png'
                      alt='all'
                      style={{ width: '17px' }}
                    />
                  }
                >
                  <Link href='/dogpage'>
                    <a>Dog</a>
                  </Link>
                </Menu.Item>
                {me ? (
                  <>
                    <Menu.Item key={5} icon={<UserOutlined />}>
                      <Link href={`/profile/${me.id}`}>
                        <a>Profile</a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key={6} icon={<LogoutOutlined />}>
                      <div className='logout' onClick={onLogOut}>
                        LogOut
                      </div>
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item key={7} icon={<AuditOutlined />}>
                    <Link href='/signup'>
                      <a>SignUp</a>
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item key={8} icon={<SearchOutlined />}>
                  <Input.Search
                    enterButton
                    style={{ verticalAlign: 'middle' }}
                    value={searchInput}
                    onChange={onChangeSearchInput}
                    onSearch={onSearch}
                  />
                </Menu.Item>
              </Menu>
            </Sider>
          </Col>
          <Col xs={24} md={0}>
            <Header>
              <HeaderUpper>
                <HeaderLeft>
                  <div className='logo'>
                    <Link href='/'>
                      <AppLogo />
                    </Link>
                  </div>
                </HeaderLeft>
                <HeaderRight>
                  <Dropdown overlay={allmenu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <DownOutlined
                          style={{ fontSize: '30px', color: '#000' }}
                        />
                      </Space>
                    </a>
                  </Dropdown>
                  <div>
                    {me ? (
                      <UserHandle>
                        <div className='profileLink'>
                          <Link href={`/profile/${me.id}`}>
                            <a>
                              <TeamOutlined
                                style={{ fontSize: '30px', color: '#000' }}
                              />
                            </a>
                          </Link>
                        </div>
                        <div className='logout' onClick={onLogOut}>
                          <LogoutOutlined
                            style={{ fontSize: '30px', color: '#000' }}
                          />
                        </div>
                      </UserHandle>
                    ) : (
                      <Link href='/signup'>
                        <a>
                          <UserAddOutlined
                            style={{ fontSize: '30px', color: '#000' }}
                          />
                        </a>
                      </Link>
                    )}
                  </div>
                </HeaderRight>
              </HeaderUpper>
              <HeaderInput>
                <Input.Search
                  enterButton
                  style={{ verticalAlign: 'middle' }}
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  onSearch={onSearch}
                />
              </HeaderInput>
            </Header>
          </Col>
          <Col xs={24} md={12} style={{ padding: '0' }}>
            <>
              {me ? <UserProfile /> : <LoginForm />}
              {children}
            </>
          </Col>
          <Col xs={24} md={10}>
            <ChanhoInfo />
            <AddvertisementWrapper>
              <a href='https://map.naver.com/v5/search/%EB%B7%B0%ED%8B%B0%ED%98%9C/place/1440294673?placePath=%3Fentry=pll%26from=nx%26fromNxList=true'>
                <div className='addv_img1'></div>
              </a>
            </AddvertisementWrapper>
            <AddvertisementWrapper>
              <a href='https://map.naver.com/v5/search/%EC%95%84%EC%82%B0%20%EC%9A%B4%EB%8F%99%ED%99%94%EA%B5%AC%EB%91%90%EB%B9%A8%EB%9E%98%EB%B0%A9/place/35263276?placePath=%3Fentry=pll%26from=nx%26fromNxList=true'>
                <div className='addv_img2'></div>
              </a>
            </AddvertisementWrapper>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
