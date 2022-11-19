import React, { useCallback, useState, useRef } from 'react';
import { Form, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHANGE_PROFILE_REQUEST,
  UPLOAD_PROFILE_IMAGES_REQUEST,
} from '../reducers/user';

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
    console.log('images', e.target.files);
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
    <Form encType='multipart/form-data' onFinish={onSubmit}>
      <div>
        <Avatar
          src={Image}
          style={{ margin: '20px' }}
          size={200}
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
      <Button
        type='primary'
        style={{ float: 'right', width: '6vw' }}
        htmlType='submit'
      >
        수정
      </Button>
    </Form>
  );
};

export default ProfileImageForm;
