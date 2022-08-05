import React from "react";
import Head from "next/head";
import AppLayout from "../componets/AppLayout";
import NicknameEditForm from "../componets/NicknameEditForm";
import FollowList from "../componets/FollowList";

const profile = () => {
  const followerList = [{nickname: "sample1"}, {nickname: "sample2"},{nickname: "sample3"}]
  const followingList = [{nickname: "test1"}, {nickname: "test2"},{nickname: "test3"}]
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default profile;
