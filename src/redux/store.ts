import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import appReducer from './reducers/app-reducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  app: appReducer,
});

// type RootReducerType = typeof reducers;
const logger = createLogger();
const middlewares = [thunk, logger];
export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
