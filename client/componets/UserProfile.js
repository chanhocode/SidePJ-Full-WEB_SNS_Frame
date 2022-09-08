import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import styled from 'styled-components';
import Link from 'next/link';

const CardWrapper = styled(Card)`
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: #A2A8D3;
`;
const Meta = styled(Card.Meta)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const LogOut = styled(Button)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
`;
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <CardWrapper
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`}>
            <a>content</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          <Link href='/profile'>
            <a>팔로잉</a>
          </Link>{' '}
          <br />
          {me.Followings.length}
        </div>,
        <div key='followers'>
          <Link href='/profile'>
            <a>팔로워</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <LogOut onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </LogOut>
    </CardWrapper>
  );
};

export default UserProfile;
