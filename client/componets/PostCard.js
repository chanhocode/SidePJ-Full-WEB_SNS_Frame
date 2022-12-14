import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment, Input } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  LIKE_POSTS_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POSTS_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
  POST_ACCUSE_REQUEST,
  REMOVE_COMMENT_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';
import moment from 'moment';
import styled from 'styled-components';
import { backURL } from '../config/config';

moment.locale('ko');

const AccuseForm = styled.div`
  width: 100%;
  background-color: #5f9df7;
  padding-top: 10px;
  height: 165px;
  .title {
    padding-left: 5%;
  }
  .textWrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    TextArea {
      width: 90%;
    }
  }
  .button-group {
    width: 100%;
    padding-right: 5%;
    margin-top: 5px;
    margin-bottom: 10px;
    Button {
      float: right;
    }
  }
`;

const PostCard = ({ post }) => {
  const { TextArea } = Input;
  const id = useSelector((state) => state.user.me?.id);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [accuseValue, setAccuseValue] = useState('');
  const [isAccuseOpen, setIsAccuseOpen] = useState(false);

  const showAccuse = () => {
    setIsAccuseOpen(true);
  };
  const accuseHandleOk = useCallback(
    (accuseValue) => () => {
      dispatch({
        type: POST_ACCUSE_REQUEST,
        data: {
          postId: post.id,
          userId: id,
          content: accuseValue,
        },
      });
      setIsAccuseOpen(false);
      setAccuseValue('');
    },
    []
  );
  const accuseHandleCancel = () => {
    setIsAccuseOpen(false);
  };

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);
  const onCancleUpadatePost = useCallback(() => {
    setEditMode(false);
  }, []);
  const onChangePost = useCallback(
    (editText) => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: editText,
        },
      });
    },
    [post]
  );

  const onLike = useCallback(() => {
    if (!id) {
      return alert('???????????? ???????????????.');
    }
    return dispatch({
      type: LIKE_POSTS_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('???????????? ???????????????.');
    }
    return dispatch({
      type: UNLIKE_POSTS_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('???????????? ???????????????.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRemoveComment = useCallback(
    (v) => {
      if (!id) {
        return alert('????????? ????????????.');
      }
      return dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: { commentId: v, postId: post.id, userId: id },
      });
    },
    [id]
  );

  // ????????? ??????
  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('???????????? ???????????????.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        style={{
          borderBottom: 'solid 5px #E6CBA8',
          color: '#38598B',
        }}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined
            style={{ color: '#38598B' }}
            key='retweet'
            onClick={onRetweet}
          />,
          liked ? (
            <HeartTwoTone
              twoToneColor='#eb2f96'
              key='heart'
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined
              style={{ color: '#38598B' }}
              key='heart'
              onClick={onLike}
            />
          ),
          <MessageOutlined
            style={{ color: '#38598B' }}
            key='comment'
            onClick={onToggleComment}
          />,
          <Popover
            key='more'
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && (
                      <Button onClick={onClickUpdate}>??????</Button>
                    )}
                    <Button
                      type='danger'
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      ??????
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type='primary' onClick={showAccuse}>
                      ??????
                    </Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined style={{ color: '#38598B' }} />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}?????? ????????????????????????.` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <a href={`/user/${post.User.id}`}>
                  <Avatar
                    src={
                      post.Retweet.User.profileImage
                        ? `${backURL}/${post.Retweet.User.profileImage}`
                        : '/img/blankProfile.png'
                    }
                  />
                </a>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  onCancleUpadatePost={onCancleUpadatePost}
                  onChangePost={onChangePost}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <a href={`/user/${post.User.id}`}>
                  <Avatar
                    src={
                      post.User.profileImage
                        ? `${backURL}/${post.User.profileImage}`
                        : '/img/blankProfile.png'
                    }
                  />
                </a>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onCancleUpadatePost={onCancleUpadatePost}
                  onChangePost={onChangePost}
                  postData={post.content}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div
          style={{
            borderBottom: 'solid 5px #E6CBA8',
            backgroundColor: '#5F9DF7',
            padding: 10,
          }}
        >
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}?????? ??????`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}
            renderItem={(item) => (
              <li
                style={{
                  color: 'black',
                  backgroundColor: '#FFF7E9',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginTop: 7,
                  marginBottom: 7,
                  paddingLeft: 7,
                  paddingRight: 7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
              >
                <div>
                  <Comment
                    author={item.User.nickname}
                    avatar={
                      <a href={`/user/${item.User.id}`}>
                        <Avatar
                          src={
                            item.User.profileImage
                              ? `${backURL}/${item.User.profileImage}`
                              : '/img/blankProfile.png'
                          }
                        />
                      </a>
                    }
                    content={item.content}
                  />
                </div>
                {me.id === item.User.id ? (
                  <Button
                    // type='primary'
                    onClick={() => {
                      onRemoveComment(item.id);
                    }}
                  >
                    ??????
                  </Button>
                ) : null}
              </li>
            )}
          />
        </div>
      )}
      {isAccuseOpen && (
        <AccuseForm>
          <div className='title'>????????? ??????</div>
          <div className='textWrapper'>
            <TextArea
              value={accuseValue}
              onChange={(e) => setAccuseValue(e.target.value)}
              placeholder='?????? ????????? ???????????????'
              autoSize={{
                minRows: 3,
                maxRows: 3,
              }}
            />
          </div>
          <div className='button-group'>
            <Button onClick={accuseHandleCancel}>??????</Button>
            <Button type='danger' onClick={accuseHandleOk(accuseValue)}>
              ??????
            </Button>
          </div>
        </AccuseForm>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comment: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
