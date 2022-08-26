import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';
import NicknameEditForm from '../componets/NicknameEditForm';
import FollowList from '../componets/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
const profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
    // console.dir(`Follower data: ${me.Followers}`);
    // console.dir(`Followings data: ${me.Followings}`);
    console.dir(`data: ${me}`);
  }, []);

  console.dir(`data: ${me}`);

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
        <FollowList header='팔로잉' data={me.Followings} />
        <FollowList header='팔로워' data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default profile;
