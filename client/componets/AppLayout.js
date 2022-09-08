import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import 'antd/dist/antd.css';
import {
  HomeOutlined,
  UserOutlined,
  AuditOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Input, Row, Col } from 'antd';

import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled, { createGlobalStyle } from 'styled-components';
import Router from 'next/router';
import useInput from '../hooks/useInput';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Global = createGlobalStyle`
  body {
    background-color: #E7EAF6;
  }
  #__next {
    height: 100% !important;
  }
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
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
`;

const NavMenu = styled(Menu)`
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled(Menu.Item)`
  font-size: 1.2rem;
  font-weight: 400;
`;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { me } = useSelector((state) => state.user);

  const [searchInput, onChangeSearchInput] = useInput('');
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <Layout hasSider>
      <Global />
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
          backgroundColor: '#E7EAF6',
        }}
      >
        <Menu
          theme='light'
          defaultSelectedKeys={['1']}
          mode='inline'
          style={{ backgroundColor: '#E7EAF6' }}
        >
          <Menu.Item key={1} icon={<HomeOutlined />}>
            <Link href='/'>
              <a>HOME</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={2} icon={<UserOutlined />}>
            <Link href='/profile'>
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={3} icon={<AuditOutlined />}>
            <Link href='/signup'>
              <a>SignUp</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={4} icon={<SearchOutlined />}>
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
      <Layout
        className='site-layout'
        style={{
          paddingTop: 10,
          paddingLeft: 65,
        }}
      >
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={15}>
            {children}
          </Col>
          <Col xs={24} md={3}>
            <a
              href='https://github.com/chanhocode'
              target='_blank'
              rel='noreferrer noopener'
            >
              Made by Chanho
            </a>
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
