import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const ProfileFollowButton = ({ id }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: id,
      });
    }
  }, [isFollowing]);

  if (id === me.id) {
    return null;
  }
  return (
    <Button
      style={{ borderRadius: 10 }}
      loading={followLoading || unfollowLoading}
      onClick={onClickButton}
    >
      {isFollowing ? 'UnFollow' : 'Follow'}
    </Button>
  );
};

export default ProfileFollowButton;
