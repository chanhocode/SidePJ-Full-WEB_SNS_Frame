import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';
// comment:: User, Images, Comment 는 대문자로 시작하는 이유: 다른 정보들과 합쳐지기 떄문이다. _ 시퀄라이즈랑 관계 _ 시퀄라이즈에서 정보와 정보가 관계가 있으면 합쳐주는데 그떄 합쳐지는 것은 대문자로 나온다.
export const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: 'chanho',
    //   },
    //   content: '세 번째 게시글 #해시태그',
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2020/11/04/13/29/white-5712344_1280.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2021/11/14/12/53/ship-6794508_1280.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2022/07/26/03/31/sea-7344974_1280.jpg',
    //     },
    //   ],
    //   Comments: [
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test1',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test2',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   User: {
    //     id: 2,
    //     nickname: 'chanho',
    //   },
    //   content: '두 번째 게시글 #해시태그',
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2021/11/14/12/53/ship-6794508_1280.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2022/07/26/03/31/sea-7344974_1280.jpg',
    //     },
    //   ],
    //   Comments: [
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test1',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test2',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   User: {
    //     id: 3,
    //     nickname: 'chanho',
    //   },
    //   content: '첫 번째 게시글 #해시태그',
    //   Images: [
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2015/11/08/12/24/jellyfish-1033538_1280.jpg',
    //     },
    //     {
    //       id: shortId.generate(),
    //       src: 'https://cdn.pixabay.com/photo/2015/11/08/12/24/jellyfish-1033538_1280.jpg',
    //     },
    //   ],
    //   Comments: [
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test1',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //     {
    //       id: shortId.generate(),
    //       User: {
    //         id: shortId.generate(),
    //         nickname: 'test2',
    //       },
    //       content: 'test 댓글 입니다.',
    //     },
    //   ],
    // },
  ],
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

// ^ Dummy Data ::
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate,
        nickname: faker.internet.userName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.cats(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.firstName(),
          },
          content: faker.lorem.paragraph(),
        },
      ],
    }));
// dummy data
// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: 'chanho',
//   },
//   Images: [],
//   Comments: [],
// });
// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   content: data,
//   User: {
//     id: 1,
//     nickname: 'hyebin',
//   },
// });

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// comment:: 이전 state 를 action을 통해 다음 state로 만들어내는 function(불변성은 지키면서)
// comment:: immer 라이브러리 사용하여 불변성 유지

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      // comment:: 아래 주석 * immer 미사용 코드
      // return {
      //   ...state,
      //   addPostLoading: true,
      //   addPostDone: false,
      //   addPostError: null,
      // };
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      // 불변성 하드 코딩
      // const postIndex = state.mainPosts.findIndex(
      //   (v) => v.id === action.data.postId
      // );
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      // return {
      //   ...state,
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // };
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
