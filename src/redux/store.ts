import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from './reducer';

const enhance = composeWithDevTools({
  realtime: true,
  port: 8000,
});

const store = createStore(reducer, enhance(applyMiddleware(thunk)));

export default store;
