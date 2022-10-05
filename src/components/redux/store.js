import { configureStore  } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from "redux-saga";
import rootSaga from './menus/sagas/index'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
  });

  sagaMiddleware.run(rootSaga);

export default store;