import React, { useCallback, useState } from 'react';
import { Form, Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import styled from 'styled-components';
import Link from 'next/link';

import {
  EditOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const CardWrapper = styled(Card)`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  /* margin-right: 5px; */
  margin-bottom: 20px;
  background-color: #a2a8d3;
`;

const Meta = styled.a`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;

  color: black;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;
const LogOut = styled(Button)`
  border-radius: 10px;
  background-color: #38598b;
  color: white;
  border: none;
  width: 105px;
`;
const Greetings = styled.div`
  color: #fff;
  font-weight: 500;
`;
const TopItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
`;

const Data = styled.div`
  font-size: large;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const UserArea = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;
  border-bottom: solid 2px #fff;
  color: #113f67;
  font-weight: 500;
`;
const UserAvatar = styled(Avatar)`
  height: 60px;
  width: 60px;
  aspect-ratio: 1/1;
  margin-right: 20px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const [Image, setImage] = useState(
    me.profileImage
      ? `http://localhost:3065/${me.profileImage}`
      : '/img/blankProfile.png'
  );
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <CardWrapper>
      <TopItem>
        <Greetings>
          Welcom to {me.nickname}!! Did anything special happen?
        </Greetings>
        <LogOut onClick={onLogOut} loading={logOutLoading}>
          Logout
        </LogOut>
      </TopItem>

      <UserArea>
        <div style={{ height: '100%' }} key='avatar'>
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Meta>
              <UserAvatar src={Image} />
              <>{me.nickname}</>
            </Meta>
          </Link>
        </div>

        <UserData>
          <Data key='twit'>
            <Link href={`/user/${me.id}`}>
              <EditOutlined />
            </Link>
            <br />
            {me.Posts.length}
          </Data>
          <Data key='followings'>
            <Link href='/profile'>
              <ArrowUpOutlined />
            </Link>{' '}
            <br />
            {me.Followings.length}
          </Data>
          <Data key='followers'>
            <Link href='/profile'>
              <ArrowDownOutlined />
            </Link>
            <br />
            {me.Followers.length}
          </Data>
        </UserData>
      </UserArea>
    </CardWrapper>
  );
};

export default UserProfile;
