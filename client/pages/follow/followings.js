import React from 'react';
import { List, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { backURL } from '../../config/config';
import AppLayout from '../../componets/AppLayout';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import ProfileFollowButton from '../../componets/ProfileFollowButton';

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
    color: #5f5f5f;
    cursor: pointer;
  }
  .FollowingsTag {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #000;
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
const Followings = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { data: followingsData, error: followingError } = useSWR(
    `${backURL}/user/followings?limit=${me ? me.Followings.length : null}`,
    fetcher
  );

  return (
    <>
      <AppLayout>
        <Head>
          <Link href={'/follow/followers'}>
            <div className='FollowersTag'>
              팔로워 {me ? me.Followings.length : null} 명
            </div>
          </Link>
          <Link href={'/follow/followings'}>
            <div className='FollowingsTag'>
              팔로잉 {me ? me.Followings.length : null} 명
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
          header={<div>Followings</div>}
          loadMore={
            <div style={{ textAlign: 'center', margin: '10px 0' }}></div>
          }
          bordered
          dataSource={followingsData}
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
              <ProfileFollowButton id={item.id} />
            </ListItem>
          )}
        />
      </AppLayout>
    </>
  );
};

export default Followings;
