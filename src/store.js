import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
/**/
export const store = createStore (
rootReducer,   
composeEnhancers(applyMiddleware(thunk))
);
