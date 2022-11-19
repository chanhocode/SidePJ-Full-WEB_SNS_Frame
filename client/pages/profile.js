import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';

import ProfileEditForm from '../componets/ProfileEditForm';
import ProfileImageForm from '../componets/ProfileImageForm';
import FollowList from '../componets/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useSWR from 'swr';
import axios from 'axios';
import { backURL } from '../config/config';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { data: followersData, error: followerError } = useSWR(
    `${backURL}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backURL}/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  if (followerError || followingError) {
    console.error();
    return '팔로잉/팔로워 로딩 중 에러가 발생합니다.';
  }

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);
  if (!me) {
    return '내 정보 로딩중 ...';
  }
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <ProfileImageForm />
        <ProfileEditForm />
        <FollowList
          header='팔로잉'
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header='팔로워'
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};

export default profile;
