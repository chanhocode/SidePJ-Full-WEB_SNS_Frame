import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
  .title {
    margin-bottom: 15px;
  }
  .sns {
    border-bottom: 1px solid #000;
    margin-top: 5px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      margin-left: 2px;
      margin-right: 2px;
      cursor: pointer;
    }
  }
`;

const ChanhoInfo = () => {
  return (
    <InfoWrapper>
      <div className='title'>CONTACT</div>
      <div className='addres'>Gmail: joc1245@gmail.com</div>
      <div className='state'>Currently attending SCH Uni...</div>
      <div className='sns'>
        <a href='https://github.com/chanhocode'>
          <img src='/img/git.png' alt='git Image' />
        </a>
        <a href='https://www.instagram.com/j.ch_anho/'>
          <img src='/img/insta.png' alt='instagram Image' />
        </a>
        <a href='https://www.facebook.com/profile.php?id=100002676957259'>
          <img src='/img/facebook.png' alt='facebook Image' />
        </a>
      </div>
    </InfoWrapper>
  );
};

export default ChanhoInfo;
