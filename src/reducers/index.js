import { combineReducers } from "redux";
import auth from './AuthReducer'
import uniManagment from './UniManReducer'

const rootReducer = combineReducers({
  auth,
  uniManagment
});

export default rootReducer;