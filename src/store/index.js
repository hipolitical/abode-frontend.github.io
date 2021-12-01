import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import apiSaga from "./saga"

const initialiseSagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  compose(
    applyMiddleware(initialiseSagaMiddleware)
  )
)

initialiseSagaMiddleware.run(apiSaga)

export default store;
