import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
  call,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LIKE_POSTS_REQUEST,
  UNLIKE_POSTS_REQUEST,
  LIKE_POSTS_SUCCESS,
  LIKE_POSTS_FAILURE,
  UNLIKE_POSTS_SUCCESS,
  UNLIKE_POSTS_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// LoadPosts
function loadPostsAPI(data) {
  return axios.get('/posts', data);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}
// AddPost
function addPostAPI(data) {
  return axios.post('/post', { content: data });
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
// RemovePost
function removePostAPI(data) {
  return axios.delete(`/post/${data}`, data);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
// AddComment
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

// LikePosts
function likePostsAPI(data) {
  return axios.patch(`/post/${data}/like`);
}
function* likePosts(action) {
  try {
    const result = yield call(likePostsAPI, action.data);
    yield put({
      type: LIKE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}
// UnlikePosts
function unlikePostsAPI(data) {
  return axios.delete(`/post/${data}/like`);
}
function* unlikePosts(action) {
  try {
    const result = yield call(unlikePostsAPI, action.data);
    yield put({
      type: UNLIKE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// Event Listener와 비슷한 역할
function* watchLoadPost() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchLikePosts() {
  yield takeLatest(LIKE_POSTS_REQUEST, likePosts);
}
function* watchUnlikePosts() {
  yield takeLatest(UNLIKE_POSTS_REQUEST, unlikePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePosts),
    fork(watchUnlikePosts),
  ]);
}
