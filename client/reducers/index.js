import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// 리듀서 함수 합치기
const rootReducer = combineReducers({
  // comment:: Hydrate 를 위해서 index 리듀서 추가 (서버사이드렌더링을 위해)
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
