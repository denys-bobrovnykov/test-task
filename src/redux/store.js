import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { loadState } from '../service/localStorage';

const middleware = [thunk];

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middleware))
);
