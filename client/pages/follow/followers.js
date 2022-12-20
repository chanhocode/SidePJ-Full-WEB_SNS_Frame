import React from 'react';
import { List, Button, Avatar } from 'antd';
import { useDispatch, useSelector, useEffect } from 'react-redux';
import styled from 'styled-components';
import { backURL } from '../../config/config';
import AppLayout from '../../componets/AppLayout';
import Link from 'next/link';
import { REMOVE_FOLLOWER_REQUEST } from '../../reducers/user';
import Router from 'next/router';

import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Head = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-weight: 500;
  .FollowersTag {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #000;
    cursor: pointer;
  }
  .FollowingsTag {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5f5f5f;
    cursor: pointer;
  }
`;

const ListItem = styled(List.Item)`
  display: flex;
  .userInfo {
    display: flex;
    align-items: center;
    .nickname {
      margin-left: 10px;
    }
  }
  a {
    color: #000;
  }
`;
const Followers = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { data: followersData, error: followingError } = useSWR(
    `${backURL}/user/followers?limit=${me ? me.Followers.length : null}`,
    fetcher
  );

  const onCancel = (UserId) => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: UserId,
    });
  };

  return (
    <>
      <AppLayout>
        <Head>
          <Link href={'/follow/followers'}>
            <div className='FollowersTag'>
              팔로워 {me ? me.Followers.length : null} 명
            </div>
          </Link>
          <Link href={'/follow/followings'}>
            <div className='FollowingsTag'>
              팔로잉 {me ? me.Followers.length : null} 명
            </div>
          </Link>
        </Head>
        <List
          style={{
            marginBottom: 20,
            backgroundColor: '#fff',
            borderRadius: '5px',
          }}
          size='small'
          header={<div>Followers</div>}
          loadMore={
            <div style={{ textAlign: 'center', margin: '10px 0' }}></div>
          }
          bordered
          dataSource={followersData}
          renderItem={(item) => (
            <ListItem>
              <div className='userInfo'>
                <Avatar
                  src={
                    item.profileImage
                      ? `${backURL}/${item.profileImage}`
                      : '/img/blankProfile.png'
                  }
                />
                <div className='nickname'>
                  <a href={`/user/${item.id}`}>{item.nickname}</a>
                </div>
              </div>
              <Button style={{ borderRadius: 10 }} onClick={onCancel(item.id)}>
                Delete
              </Button>
            </ListItem>
          )}
        />
      </AppLayout>
    </>
  );
};

export default Followers;
