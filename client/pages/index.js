import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../componets/AppLayout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Link from 'next/link';

import PostCard from '../componets/PostCard';
import PostForm from '../componets/PostForm';

import {
  LOAD_FOLLOWINGS_POSTS_REQUEST,
  LOAD_POSTS_REQUEST,
} from '../reducers/post';
import { LOAD_FOLLOWERS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { useRouter } from 'next/router';
import axios from 'axios';

import { BackTop } from 'antd';

const SlickWrapper = styled.div`
  width: 100%;
  .slider-content {
    img {
      width: 100%;
    }
  }
  .slick-dots {
    z-index: 9999;
    bottom: 10px;
  }
`;
const PageButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pageButton {
    width: 32%;
    aspect-ratio: 600/800;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 8px grey;
    transition: all 0.2s;
  }
  .allPage {
    background-image: url('/img/allBt1.png');
    background-size: cover;
  }
  .allPage:hover {
    background-image: url('/img/allBt2.png');
    background-size: cover;
  }
  .catPage {
    background-image: url('/img/catBt1.png');
    background-size: cover;
  }
  .catPage:hover {
    background-image: url('/img/catBt2.png');
    background-size: cover;
  }
  .dogPage {
    background-image: url('/img/dogBt1.png');
    background-size: cover;
  }
  .dogPage:hover {
    background-image: url('/img/dogBt2.png');
    background-size: cover;
  }
`;
const CategoryWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  .category {
    width: 100px;
    height: 25px;
    border-bottom: solid 1px navy;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_FOLLOWINGS_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: 'cat',
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, loadPostsLoading]);

  return (
    <div>
      <AppLayout>
        <BackTop />
        <SlickWrapper>
          <Slider
            initialSlide={0}
            infinite={true}
            arrows={false}
            dots={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            <div className='slider-content'>
              <img src='/img/banner1.png' alt='bannerImg' />
            </div>
            <div className='slider-content'>
              <img src='/img/banner2.png' alt='bannerImg' />
            </div>
          </Slider>
        </SlickWrapper>
        <CategoryWrapper>
          <div className='category'>
            <h3>Category</h3>
          </div>
        </CategoryWrapper>
        <PageButtonGroup>
          <Link href='/allpage'>
            <button className='pageButton allPage' />
          </Link>
          <Link href='/catpage'>
            <button className='pageButton catPage' />
          </Link>
          <Link href='/dogpage'>
            <button className='pageButton dogPage' />
          </Link>
        </PageButtonGroup>
        {me && <PostForm />}
        {me && mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('getServerSideProps start');
    // console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  }
);
export default home;
