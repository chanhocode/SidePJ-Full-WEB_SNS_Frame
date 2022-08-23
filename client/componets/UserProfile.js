import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import styled from 'styled-components';
// Comment :: 리액트에서 배열로 JSX 쓸때는 Key를 붙여줘야함.

const CardWrapper = styled(Card)`
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: #fca3b9;
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
          content
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key='followers'>
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <LogOut onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </LogOut>
    </CardWrapper>
  );
};

export default UserProfile;
