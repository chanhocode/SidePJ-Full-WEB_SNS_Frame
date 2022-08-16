import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';
import NicknameEditForm from '../componets/NicknameEditForm';
import FollowList from '../componets/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';
const profile = () => {
  const { me, Followings, Followers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={Followings} />
        <FollowList header='팔로워 목록' data={Followers} />
      </AppLayout>
    </>
  );
};

export default profile;
