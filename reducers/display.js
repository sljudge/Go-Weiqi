import produce from 'immer'
import {
    SET_BOARD_WIDTH
} from '../actions/display'

const initialState = {
    boardWidth: window.innerHeight
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_BOARD_WIDTH:
            return produce(state, draftState => ({
                ...draftState,
                boardWidth: action.width
            }))
        default:
            return state
    }

}

export default reducer