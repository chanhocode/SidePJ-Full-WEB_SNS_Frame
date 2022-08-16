import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    background-color: #f6f4f9;
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
`;
const NavMenu = styled(Menu)`
  height: 65px;
  background-color: #fcd752;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
`;
const MenuItem = styled(Menu.Item)`
  font-size: 1.2rem;
  font-weight: 400;
  margin-right: 30px;
`;
const SearchInput = styled(Input.Search)`
  width: 300px;
  vertical-align: middle;
  display: flex;
  position: absolute;
  right: 0;
  margin-right: 10px;
`;
const AppLayout = ({ children }) => {
  // Login Dummy data
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Global />
      <NavMenu mode='horizontal'>
        <MenuItem>
          <Link href='/'>
            <a>HOME</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/profile'>
            <a>Profile</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href='/signup'>
            <a>SignUp</a>
          </Link>
        </MenuItem>
        <SearchInput enterButton />
      </NavMenu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href='https://github.com/chanhocode'
            target='_blank'
            rel='noreferrer noopener'
          >
            Made by Chanho
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
