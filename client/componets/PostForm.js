import { Button, Form, Input, Modal } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  addPost,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from '../reducers/post';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { backURL } from '../config/config';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  background-color: #1C6DD0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  padding: 10px;
  /* margin-right: 5px; */
`;
const TextInput = styled(Input.TextArea)`
  margin-bottom: 10px;
`;

const PostButton = styled(Button)`
  border: none;
  background-color: #1C6DD0;
  color: #fff;
  font-weight: 600;
  border-top-left-radius: 5px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone, addPostLoading } = useSelector(
    (state) => state.post
  );
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요!');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    // console.log('images', e.target.files);
    const imageFormData = new FormData(); // FormData 를 이용해 Mulitpart 형식 전송
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });
  const [uploadView, setUploadView] = useState(false);
  const toggleView = () => {
    setUploadView((uploadView) => !uploadView);
  };
  return (
    <>
      <PostButton onClick={toggleView}>
        게시글을 작성 하시겠습니까?
        <SendOutlined />
      </PostButton>
      {uploadView && (
        <FormWrapper encType='multipart/form-data' onFinish={onSubmit}>
          <TextInput
            value={text}
            onChange={onChangeText}
            maxLength={140}
            placeholder='새로운 글을 작성 해보세요.'
            style={{ resize: 'none', height: '90px' }}
          />
          <div>
            <input
              type='file'
              name='image'
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
            <Button
              type='primary'
              style={{ float: 'right', width: '6vw' }}
              htmlType='submit'
              loading={addPostLoading}
            >
              <SendOutlined />
            </Button>
          </div>
          <div>
            {imagePaths.map((v, i) => (
              <div key={v} style={{ display: 'inline-block' }}>
                <img
                  src={`http://chanhopj.com:3065/${v}`}
                  style={{ width: '200px' }}
                  alt={v}
                />
                {/* 
            < 배포 버전 >
            {imagePaths.map((v, i) => (
              <div key={v} style={{ display: 'inline-block' }}>
                <img
                  src={v.replace(/\/thumb\//, '/original/')}
                  style={{ width: '200px' }}
                  alt={v}
                /> */}
                <div>
                  <Button onClick={onRemoveImage(i)}>제거</Button>
                </div>
              </div>
            ))}
          </div>
        </FormWrapper>
      )}
    </>
  );
};

export default PostForm;
