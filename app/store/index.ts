import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { applyInterceptors } from './axios';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
const composeEnhancers = composeWithDevToolsDevelopmentOnly({
  serialize: {
    options: {
      map: true,
    },
  },
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

applyInterceptors(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
