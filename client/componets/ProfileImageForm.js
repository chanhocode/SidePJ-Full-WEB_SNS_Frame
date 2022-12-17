import React, { useCallback, useState, useRef } from 'react';
import { Form, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHANGE_PROFILE_REQUEST,
  UPLOAD_PROFILE_IMAGES_REQUEST,
} from '../reducers/user';
import styled from 'styled-components';

const ProfileImageEdit = styled(Form)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  margin-bottom: 10px;
  .AvatarWrapper {
    width: 30%;
  }
  .ButtonWrapper {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  Button {
    width: 150px;
  }
`;

const ProfileImageForm = () => {
  const dispatch = useDispatch();
  const { me, imagePaths } = useSelector((state) => state.user);
  const [Image, setImage] = useState(
    me.profileImage
      ? `http://localhost:3065/${me.profileImage}`
      : '/img/blankProfile.png'
  );

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('userId', me.id);
    return dispatch({
      type: CHANGE_PROFILE_REQUEST,
      data: formData,
    });
  }, [imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    // console.log('images', e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_PROFILE_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  return (
    <ProfileImageEdit encType='multipart/form-data' onFinish={onSubmit}>
      <div className='AvatarWrapper'>
        <Avatar
          src={Image}
          style={{ margin: '20px', cursor: 'pointer' }}
          size={100}
          onClick={onClickImageUpload}
        />
        <input
          type='file'
          name='image'
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
      </div>
      <div className='ButtonWrapper'>
        <Button type='primary' htmlType='submit'>
          프로필 사진 변경
        </Button>
      </div>
    </ProfileImageEdit>
  );
};

export default ProfileImageForm;
