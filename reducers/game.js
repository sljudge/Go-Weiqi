import produce from 'immer'
import {
    SET_TO_PLAY,
    UPDATE_NODE,
    SET_FOCUS_POINT,
    CLEAR_NODE,
    SET_STONES_TO_BE_REMOVED,
    SET_KO,
    UPDATE_BOARD,
    CHECK_SCORE,
    CANCEL_SCORING,
    UPDATE_SCORE
} from '../actions/game'

const boardSize = 9
const initialState = {
    toPlay: 'white',
    boardSize: boardSize,
    // board: '.'.repeat(Math.pow(boardSize, 2)),
    board: '.oxx.xxoooxxxxxo.xoooooxxx.xoxoxox.x.x.x.oxx.ooxx.ox.x..oxx.xx...oxxooox..oxo...o',
    focusPoint: null,
    stonesToBeRemoved: [],
    ko: false,
    previousBoardPosition: null,
    checkingScore: false,
    score: {
        black: {
            area: 0,
            captures: 0
        },
        white: {
            area: 0,
            captures: 0
        }
    },
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TO_PLAY:
            return produce(state, draftState => {
                let nextToPlay
                if (action.color === undefined) {
                    nextToPlay = draftState.toPlay === 'black' ? 'white' : 'black'
                } else {
                    nextToPlay = action.color
                }
                return {
                    ...draftState,
                    toPlay: nextToPlay
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        case UPDATE_NODE:
            return produce(state, draftState => ({
                ...draftState,
                board: draftState.board.replaceAt(action.i, draftState.toPlay === 'black' ? 'x' : 'o'),
            }))
        //-----------------------------------------------------------------------------------------------------//
        case CLEAR_NODE:
            return produce(state, draftState => ({
                ...draftState,
                board: draftState.board.replaceAt(action.i, '.')
            }))
        //-----------------------------------------------------------------------------------------------------//
        case UPDATE_BOARD:
            return produce(state, draftState => ({
                ...draftState,
                board: action.board,
            }))
        //-----------------------------------------------------------------------------------------------------//
        case SET_FOCUS_POINT:
            return produce(state, draftState => ({
                ...draftState,
                focusPoint: action.i
            }))
        //-----------------------------------------------------------------------------------------------------//
        case SET_STONES_TO_BE_REMOVED:
            return produce(state, draftState => ({
                ...draftState,
                stonesToBeRemoved: action.array
            }))
        //-----------------------------------------------------------------------------------------------------//
        case SET_KO:
            return produce(state, draftState => ({
                ...draftState,
                ko: action.bool,
                previousBoardPosition: action.bool ? draftState.board : null
            }))
        //-----------------------------------------------------------------------------------------------------//
        case CHECK_SCORE:
            return produce(state, draftState => ({
                ...draftState,
                checkingScore: true,
                focusPoint: null
            }))
        //-----------------------------------------------------------------------------------------------------//
        case CANCEL_SCORING:
            return produce(state, draftState => ({
                ...draftState,
                checkingScore: false,
                board: draftState.board.replace(/[XO]/g, '.'),
                score: {
                    black: {
                        area: 0,
                        captures: draftState.score.black.captures
                    },
                    white: {
                        area: 0,
                        captures: draftState.score.white.captures
                    }
                }
            }))
        //-----------------------------------------------------------------------------------------------------//
        case UPDATE_SCORE:
            return produce(state, draftState => {
                const whiteData = action.json.white
                const blackData = action.json.black

                return {
                    ...draftState,
                    score: {
                        black: {
                            area: blackData.area ? blackData.area : draftState.score.black.area,
                            captures: blackData.captures ? draftState.score.black.captures + blackData.captures : draftState.score.black.captures
                        },
                        white: {
                            area: whiteData.area ? whiteData.area : draftState.score.white.area,
                            captures: whiteData.captures ? draftState.score.white.captures + whiteData.captures : draftState.score.white.captures
                        }
                    },
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        default:
            return state
    }

}

export default reducer