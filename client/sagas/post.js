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
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortid from 'shortid';

// LoadPost
function loadPostAPI(data) {
  return axios.post('/api/post', data);
}
function* loadPost(action) {
  try {
    // const result = yield call(loadPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.reponse.data,
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
    const id = shortid.generate();
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
      data: err.reponse.data,
    });
  }
}
// RemovePost
function removePostAPI(data) {
  return axios.delete('/api/post', data);
}
function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.reponse.data,
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
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.reponse.data,
    });
  }
}

// Event Listener와 비슷한 역할
function* watchLoadPost() {
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
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

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
