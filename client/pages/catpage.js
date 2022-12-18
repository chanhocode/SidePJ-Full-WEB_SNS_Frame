import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../componets/AppLayout';
import PostForm from '../componets/PostForm';
import PostCard from '../componets/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { BackTop } from 'antd';

const CatPage = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          // dispatch({
          //   type: LOAD_HASHTAG_POSTS_REQUEST,
          //   lastId:
          //     mainPosts[mainPosts.length - 1] &&
          //     mainPosts[mainPosts.length - 1].id,
          //   data: 'cat',
          // });
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId,
            data: 'cat',
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading, mainPosts.Comments]);

  return (
    <AppLayout>
      <BackTop />
      {me && <PostForm />}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    // console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: 'cat',
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default CatPage;
