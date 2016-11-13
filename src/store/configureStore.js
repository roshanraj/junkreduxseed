import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from '../reducers/auth';
import alerts from '../reducers/alerts';
import roster from '../reducers/roster';

import { selectedUsersPage, usersByPage } from '../reducers/users';
import { selectedReposPage, reposByPage } from '../reducers/repos';

import Logger from '../containers/misc/Logger';
import WsManager from '../containers/misc/WsManager';

const logger = createLogger();
const rootReducer = combineReducers(
  {
    auth,
    alerts,
    selectedUsersPage,
    usersByPage,
    selectedReposPage,
    reposByPage,
    roster,
  }
);

const initialState = {

};


export default function configureStore() {
  let store;

  // Test block
  console.log("------------------------------------------", module,"---------------------------------------");
  console.log (module.hot);
  WsManager.wsInit("1:1E70A1F178A592CC5EEABE5176E3D5A6:79192");

  Logger.info("hi Its working");
  console.log("Non functional");
  // test block ends


  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ));
  }

  return store;
}
