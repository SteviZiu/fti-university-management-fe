import update from 'immutability-helper';
import { EnumUniActions } from './UniManActions.js';


const initialState = {
    courseList: [],
    notifications: [],
    userCourses: [],
    courseComments: [],
    post: {},
    posts: [],
    friends: [],
    friendReq: []

};

const uniManagment = (state, action) => {
    if (typeof state === 'undefined') return initialState;

    switch (action.type) {
        case EnumUniActions.SET_COURSE_LIST:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { courseList: action.dati });

        case EnumUniActions.SET_NOTIFICATION_LIST:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { notifications: action.dati });

        case EnumUniActions.SET_USER_COURSE:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { userCourses: action.dati });

        case EnumUniActions.COURSE_COMMENTS:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { courseComments: action.dati });

        case EnumUniActions.UPDATE_COURSE_COMMENTS:
            console.log('[Reducer authentication] action: ' + action.type);
            return update(state, { courseComments: { $merge: action.dati } });

        case EnumUniActions.UPDATE_POST:
            console.log('[Reducer authentication] action: ' + action.type);
            return update(state, { post: { $merge: action.dati } });

        case EnumUniActions.SET_POSTS_LIST:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { posts: action.dati });

        case EnumUniActions.UPDATE_POSTS:
            console.log('[Reducer authentication] action: ' + action.type);
            return update(state, { posts: { $merge: action.dati } });

        case EnumUniActions.LIST_FRIENDS:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { friends: action.dati });

        case EnumUniActions.FRIEND_REQ:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { friendReq: action.dati });


        default:
            return state;
    }
}

export default uniManagment;