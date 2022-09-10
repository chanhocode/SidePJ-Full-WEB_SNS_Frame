import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImageWrapper,
  Indicator,
  SlickWrapper,
  BackWrapper,
} from './styles';
import { backURL } from '../../config/config';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slider
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite={true}
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImageWrapper key={v.src}>
                <img src={`${backURL}/${v.src}`} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}{' '}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
