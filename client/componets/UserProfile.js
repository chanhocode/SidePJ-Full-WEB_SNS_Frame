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

const ProfileWrapper = styled(Card)`
  margin-bottom: 20px;
`;
const TopItem = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  position: absolute;
  width: 60%;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0%);
  .nicknameWrapper {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 5px;
  }
  .imageWrapper {
    width: 100%;
    aspect-ratio: 1/1;
    .ant-avatar {
      width: 100%;
      height: 100%;
    }
  }
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
const Greetings = styled.div`
  color: #000;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  background-color: #fff;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #fdf0e0;
  }
`;

const Data = styled.div`
  font-size: large;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const UserArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #fdf0e0;
  font-weight: 500;
  background-color: #1c6dd0;
  margin-top: 60%;
  padding-top: 18%;
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
    <ProfileWrapper>
      <TopItem>
        <div className='nicknameWrapper'>{me.nickname}</div>
        <div className='imageWrapper' key='avatar'>
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Meta>
              <Avatar src={Image} />
            </Meta>
          </Link>
        </div>
      </TopItem>

      <UserArea>
        <UserData>
          <Data key='twit'>
            <Link href={`/user/${me.id}`}>게시물</Link>
            <br />
            {me.Posts.length}
          </Data>

          <Data key='followers'>
            <Link href='/profile'>팔로워</Link>
            <br />
            {me.Followers.length}
          </Data>
          <Data key='followings'>
            <Link href='/profile'>팔로잉</Link>
            <br />
            {me.Followings.length}
          </Data>
        </UserData>
        <Greetings>
          Welcom to {me.nickname}!! Did anything special happen?
        </Greetings>
      </UserArea>
    </ProfileWrapper>
  );
};

export default UserProfile;
