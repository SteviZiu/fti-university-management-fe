import { loginRequest } from "../authConfig";
import { callMsGraph } from "../graph";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';


export const EnumAuthActions = Object.freeze({
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    SET_GRAPH: 'SET_GRAPH',
    SET_PATH: 'SET_PATH',
    SET_REGISTER: 'SET_REGISTER',
    ACCOUNT_UPDATE_STORE: 'ACCOUNT_UPDATE_STORE',
    SET_USER_MODIFIED: 'SET_USER_MODIFIED',
    UPDATE_USER_MODIFIED: 'UPDATE_USER_MODIFIED'
});


class AuthActions {

    handleLogin(msalContext) {
        return async function (dispatch) {
            return await msalContext.instance.loginRedirect(loginRequest).then((result) => {
                dispatch(this.login(result));
            })
                .catch((err) => {
                    dispatch({ type: EnumAuthActions.LOGIN_ERROR });
                })
        }
    }

    handleRedirect(msalInstance) {
        var that = this;
        return async function (dispatch) {
            return msalInstance.handleRedirectPromise().then(result => {
                if (result) {
                    dispatch(that.isUserRegistred(result))
                }
            })
        }
    }

    isUserRegistred(result){
        var that = this;
        const email = result.account.username;
        const accessToken = result.accessToken;
        return async dispatch => {
            const baseUrl = "https://uniman.herokuapp.com/api/v1";
            return await trackPromise(axios.get(baseUrl +"/user/"+email+"/exists", {} , dispatch)).then(response =>{
                if (response.data == true){
                    dispatch(that.login(
                        {microsoftAccessToken: accessToken}))
                } else {
                    dispatch({
                        type: EnumAuthActions.SET_REGISTER,
                        dati: {microsoftAccessToken: accessToken, username: email}
                    })
                }   
            }); 
        }
    }


    login(obj){
        var that = this;
        return async dispatch => {
            const baseUrl = "https://uniman.herokuapp.com";
            return await trackPromise(axios.post(baseUrl + "/login", obj , dispatch)).then(result =>{
                    dispatch({
                        type: EnumAuthActions.LOGIN_SUCCESS,
                        dati: result.data
                    })
            }); 
        }
    }
//get data from microsoft graph-> mqy not be neccesary if profile is taken from our db
    requestProfileData(msalInstance, acc) {
        return async function (dispatch) {
            const token = await msalInstance.acquireTokenSilent({ ...loginRequest, account: acc });
            try {
                const response = await callMsGraph(token.accessToken);
                dispatch({
                    type: EnumAuthActions.SET_GRAPH,
                    dati: response
                });
            } catch (e) {
                if (e instanceof InteractionRequiredAuthError) {
                    msalInstance.acquireTokenRedirect({
                        ...loginRequest,
                        account: acc
                    });
                }
            }
        }
    }

    //logout from microsoft
    handleLogout(msalContext) {
        return async function (dispatch) {
            return await msalContext.instance.logoutRedirect()
                .then(() => {
                    dispatch({ type: EnumAuthActions.LOGOUT_SUCCESS })
                })
                .catch((err) => {
                    dispatch({ type: EnumAuthActions.LOGOUT_ERROR, err })
                })
        }
    }

//path is set in component did mount of any route to be shown in header of menu!
    setPath(path) {
        return function (dispatch) {
            dispatch({
                type: EnumAuthActions.SET_PATH,
                dati: path
            });
            return Promise.resolve();
        }
    }
    setUserModified(user) {
        return function (dispatch) {
            dispatch({
                type: EnumAuthActions.SET_USER_MODIFIED,
                dati: user
            });
            return Promise.resolve();
        }
    }

    updateUser(obj) {
        return function (dispatch) {
            dispatch({
                type: EnumAuthActions.ACCOUNT_UPDATE_STORE,
                dati: obj
            });
            return Promise.resolve();
        }
    }

    updateUserModified(obj) {
        return function (dispatch) {
            dispatch({
                type: EnumAuthActions.UPDATE_USER_MODIFIED,
                dati: obj
            });
            return Promise.resolve();
        }
    }

    
    register(){
        return async function (dispatch, getState) {
            const baseUrl = "https://uniman.herokuapp.com/api/v1";
            let user = getState().auth.user;
            user.microsoftAccessToken =  getState().auth.userRegister.accessToken;
            user.email =  getState().auth.userRegister.username;
            const result = await trackPromise(axios.post(baseUrl + "/login", { user }, dispatch));
            dispatch({
                type: EnumAuthActions.LOGIN_SUCCESS,
                dati: result
            });
            dispatch({
                type: EnumAuthActions.SET_REGISTER,
                dati: null
            }); 
        }
    }


    updateProfile(){
    const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let userModified = getState().auth.userModified;
         const data = await trackPromise(axios.post(baseUrl + "/friendship", userModified, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumAuthActions.ACCOUNT_UPDATE_STORE,
            dati: data.data
         });
      }
    }

}
export default AuthActions = new AuthActions();