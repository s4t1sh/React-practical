import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'reducers/index';
import rootSaga from 'sagas/index';
import PropTypes from 'prop-types';

let reduxStore;
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

reduxStore = configureStore();

const Store = ({children}) => <Provider store={reduxStore}>{children}</Provider>;
Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
