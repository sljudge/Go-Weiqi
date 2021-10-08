import produce from 'immer'
import {
  SET_TO_PLAY,
  UPDATE_LIBERTY,
  SET_FOCUS_POINT
} from '../actions/game'

const boardSize = 13
const initialState = {
   toPlay: 'black',
   boardSize: boardSize,
   board: '.'.repeat(Math.pow(boardSize, 2)),
   focusPoint: null
}

const reducer = (state = initialState, action) => {

   switch (action.type) {
      case SET_TO_PLAY:
          return produce(state, draftState => {
              let nextToPlay 
              if(action.color === undefined){
                  nextToPlay = draftState.toPlay === 'black' ? 'white' : 'black'
              }else{
                  nextToPlay = action.color
              }
              return {
                  ...draftState,
                  toPlay: nextToPlay
              }
          })
      //-----------------------------------------------------------------------------------------------------//
      case UPDATE_LIBERTY:
          return produce(state, draftState => ({
              ...draftState,
              board: draftState.board.replaceAt(action.i, draftState.toPlay === 'black' ? 'x' : 'o')
          }))
      //-----------------------------------------------------------------------------------------------------//
      case SET_FOCUS_POINT:
          return produce(state, draftState => ({
              ...draftState,
              focusPoint: action.i
          }))
      //-----------------------------------------------------------------------------------------------------//
      default:
         return state
   }

}

export default reducer