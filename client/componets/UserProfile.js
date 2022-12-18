import React, { useCallback, useState } from 'react';
import { notification, Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import styled from 'styled-components';
import Link from 'next/link';
import { UserAddOutlined } from '@ant-design/icons';
import { backURL } from '../config/config';

const ProfileWrapper = styled(Card)`
  margin-bottom: 20px;
`;
const TopItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .imageWrapper {
    width: 30%;
    aspect-ratio: 1/1;
    .ant-avatar {
      width: 100%;
      height: 100%;
    }
  }
  .userData {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: center;
    a {
      font-weight: 400;
      color: #000;
    }
  }
`;
const Data = styled.div`
  font-size: large;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  color: #000;
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

const Message = styled.div``;
const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  Button {
    border-radius: 7px;
    border: none;
    background-color: #f3f3f3;
  }
  .btnL {
    width: 42%;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const [Image, setImage] = useState(
    me.profileImage ? `${backURL}/${me.profileImage}` : '/img/blankProfile.png'
  );
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const openNotification = () => {
    notification.open({
      message: '아래 주소를 복사하여 공유하세요.',
      description: `http://chanhopj.com:8081/user/${me.id}`,
    });
  };

  return (
    <ProfileWrapper>
      <TopItem>
        <div className='imageWrapper' key='avatar'>
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Meta>
              <Avatar src={Image} />
            </Meta>
          </Link>
        </div>
        <div className='userData'>
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
        </div>
      </TopItem>
      <div className='nicknameWrapper'>{me.nickname}</div>
      <Message>
        <p>안녕하세요! Petch에 오신걸 환영합니다.</p>
      </Message>
      <BtnGroup>
        <Button className='btnL'>
          <Link href='/profile'>
            <a>프로필 편집</a>
          </Link>
        </Button>
        <Button className='btnL' onClick={openNotification}>
          프로필 공유
        </Button>
        <Button className='btnS'>
          <UserAddOutlined />
        </Button>
      </BtnGroup>
    </ProfileWrapper>
  );
};

export default UserProfile;
