import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import game from './game'


const createRootReducer = (history) => combineReducers({
   router: connectRouter(history),
   game
})

export default createRootReducer