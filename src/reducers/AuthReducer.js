import update from 'immutability-helper';
import { EnumAuthActions } from './AuthActions.js';

const initialState = {
    user: { },
    userRegister: null,
    locPath: ""
};

const authentication = (state, action) => {
    if (typeof state === 'undefined') return initialState;

    switch (action.type) {
        case EnumAuthActions.LOGIN_SUCCESS:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { user: action.dati });

        case EnumAuthActions.LOGOUT_SUCCESS:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { user: null });

        case EnumAuthActions.SET_REGISTER:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { userRegister: action.dati });

        case EnumAuthActions.SET_GRAPH:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { graphData: action.dati });

        case EnumAuthActions.SET_PATH:
            console.log('[Reducer authentication] action: ' + action.type);
            return Object.assign({}, state, { locPath: action.dati });

            case EnumAuthActions.ACCOUNT_UPDATE_STORE:
                console.log('[Reducer authentication] action: ' + action.type);
                return update(state, { user: { $merge: action.dati } });

        default:
            return state;
    }
}

export default authentication;