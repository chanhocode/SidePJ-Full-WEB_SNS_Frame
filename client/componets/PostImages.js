import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';
import { backURL } from '../config/config';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          role='presentation'
          src={`${backURL}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div style={{}}>
        <img
          role='presentation'
          src={`${backURL}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          width='100%'
        />
        <div
          role='presentation'
          style={{
            padding: 4,
            position: 'absolute',
            right: 20,
            bottom: 170,
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '140px',
            height: '30px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={onZoom}
        >
          <div>
            + {images.length - 1}
            개의 사진 더 보기
          </div>
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};
PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};
export default PostImages;
