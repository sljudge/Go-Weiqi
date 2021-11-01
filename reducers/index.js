import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import game from './game'
import display from './display'


const createRootReducer = (history) => combineReducers({
   router: connectRouter(history),
   game,
   display
})

export default createRootReducer