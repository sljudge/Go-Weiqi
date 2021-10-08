import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import "regenerator-runtime/runtime"

import createRootReducer from '../reducers'
import { watcher } from './sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const myRouterMiddleware = routerMiddleware(history)

const middleware = [
    sagaMiddleware,
    myRouterMiddleware
]


const composeArgs = [
    applyMiddleware(...middleware)
]

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

function configureStore(preloadedState) {

    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(...composeArgs),
    )

    sagaMiddleware.run(watcher)

    return store
}


export default configureStore
