import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { settingsReducer } from './settings/reducer';
import { pageDataReducer } from './page-data/reducer';
export const history = createHashHistory({
  hashType: 'slash'
});

const rootReducer = combineReducers({
  pageData: pageDataReducer,
  settings: settingsReducer,
  router: connectRouter(history)
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
