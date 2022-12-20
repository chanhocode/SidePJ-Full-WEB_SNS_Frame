import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';
import ProfileEditForm from '../componets/ProfileEditForm';
import ProfileImageForm from '../componets/ProfileImageForm';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const ProfileEditor = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return '내 정보 로딩중 ...';
  }

  return (
    <>
      <Head>
        <title>My Profile Editor</title>
      </Head>
      <AppLayout>
        <ProfileImageForm />
        <ProfileEditForm />
      </AppLayout>
    </>
  );
};

export default ProfileEditor;
