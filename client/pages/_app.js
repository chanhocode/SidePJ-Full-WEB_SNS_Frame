import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import wrapper from '../sotre/configureStore';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>ChanhoCode</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export function reportWebVitals(metric) {
  console.log(metric);
}
export default wrapper.withRedux(App);
