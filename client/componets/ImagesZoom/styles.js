import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const Header = styled.header`
  height: 44px;
  background: #6184c6;
  position: relative;
  padding: 0;
  text-align: center;
  color: white;
  font-size: 1rem;
  & h1 {
    margin: 0;
    font-size: 1.2rem;
    color: white;
    line-height: 44px;
  }
`;
export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
export const SlickWrapper = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;
export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    width: 100%;
    margin: 0 auto;
  }
  @media (min-width: 1060px) {
    & img {
      width: 90%;
      margin: 0 auto;
    }
  }
  @media (min-width: 1400px) {
    & img {
      width: 65%;
      margin: 0 auto;
    }
  }
`;
export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;

  }
  .ant-card-cover {
    transform: none !important;
  }
`;
