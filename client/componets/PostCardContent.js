import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_POST_REQUEST } from '../reducers/post';

const { TextArea } = Input;

const PostCardContent = ({
  postData,
  editMode,
  onCancleUpadatePost,
  onChangePost,
}) => {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post
  );
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancleUpadatePost();
    }
  }, [updatePostDone]);

  const onCahngeText = useCallback((e) => {
    setEditText(e.target.value);
  });

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onCahngeText} />
          <Button.Group>
            <Button
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              수정
            </Button>
            <Button type='danger' onClick={onCancleUpadatePost}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancleUpadatePost: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};
PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
