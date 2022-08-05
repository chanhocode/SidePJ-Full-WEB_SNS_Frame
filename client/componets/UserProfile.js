import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

// Comment :: 리액트에서 배열로 JSX 쓸때는 Key를 붙여줘야함.

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    console.log("logOut");
    setIsLoggedIn(false);
  });
  return (
    <Card
      actions={[
        <div key="twit">
          content
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followings">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title="chanho" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
