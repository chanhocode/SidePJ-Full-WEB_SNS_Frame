import React, { useEffect } from 'react';
import AppLayout from '../componets/AppLayout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Link from 'next/link';

import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pageButton {
    width: 98%;
    aspect-ratio: 1920/800;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 8px grey;
    transition: all 0.2s;
  }
  .allPage {
    background-image: url('/img/allButton.png');
    background-size: cover;
  }
  .allPage:hover {
    background-image: url('/img/allButtonCursor.png');
    background-size: cover;
  }
  .catPage {
    background-image: url('/img/catButton.png');
    background-size: cover;
  }
  .catPage:hover {
    background-image: url('/img/catButtonCursor.png');
    background-size: cover;
  }
  .dogPage {
    background-image: url('/img/dogButton.png');
    background-size: cover;
  }
  .dogPage:hover {
    background-image: url('/img/dogButtonCursor.png');
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
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  }
);
export default home;
