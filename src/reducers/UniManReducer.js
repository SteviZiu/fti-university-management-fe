import update from 'immutability-helper';
import { EnumUniActions } from './UniManActions.js';


const initialState = {
    courseList: [{ id:"6", name: "test", description: "test" }],
    notifications: [],
    userCourses: [],
    courseComments: []
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

        default:
            return state;
    }
}

export default uniManagment;