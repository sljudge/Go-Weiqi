import produce, { enableMapSet } from 'immer'
enableMapSet();
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
    UPDATE_SCORE,
    HANDLE_PASS_GO,
    UNDO_MOVE
} from '../actions/game'

const boardSize = 9
const initialState = {
    toPlay: 'black',
    boardSize: boardSize,
    // board: '.'.repeat(Math.pow(boardSize, 2)),

    // board: '.o.x.o.oxoooxooooxxxxooxxxx..xxx..........oo.....................................',

    // seki 1
    // board: 'x.ox.....x.ox.....xxox.....ooxx.......oox.....o..o.......o.......................',
    // board: '..............................................ooxxx....oxoox....ox.ox....ox.ox...',
    // board: '........................x....................ooooo....xxxxxoo...oooxo...xxx.xo...',
    // board: 'xxxxx......x........ooooo...ooxxxoo.ooxx.xxo.oxxxo.xo.oxoxoxxo.oxoooxoo.oxxxxoo..',

    // seki 2
    // board: '.x.o.ox..xxxooox..oooxxxx....ooo.................................................',
    // board: '.xo.ox...x.ooox.o.oooxxx.o.xxx...................................................',


    // board: '.o.x.o.oxoooxooooxxxxooxxxx..xxx..........oo.....................................',

    // seki 4
    // board: '.x.ox....oxoox.....oox.....oox.x...oxx.x....o....................................',

    // scoring
    board: '.oxx.xx..oxxxxxo.xoooooxxx.xoxoxox.x.x.x.oxx.ooxx.ox.x..oxx.xx...oxxooox..oxo...o',

    focusPoint: null,
    stonesToBeRemoved: [],
    ko: false,
    pass: false,
    previousBoardPosition: null,
    checkingScore: false,
    score: {
        black: {
            area: 0,
            captures: 0,
            draftCaptures: 0
        },
        white: {
            area: 0,
            captures: 0,
            draftCaptures: 0
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
                    toPlay: nextToPlay,
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        case UPDATE_NODE:
            return produce(state, draftState => ({
                ...draftState,
                board: draftState.board.replaceAt(action.i, draftState.toPlay === 'black' ? 'x' : 'o'),
                previousBoardPosition: draftState.board
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
                // previousBoardPosition: action.bool ? draftState.board : null
            }))
        //-----------------------------------------------------------------------------------------------------//
        case CHECK_SCORE:
            return produce(state, draftState => ({
                ...draftState,
                previousBoardPosition: draftState.board,
                checkingScore: true,
                focusPoint: null
            }))
        //-----------------------------------------------------------------------------------------------------//
        case CANCEL_SCORING:
            return produce(state, draftState => ({
                ...draftState,
                checkingScore: false,
                board: draftState.previousBoardPosition,
                previousBoardPosition: null,
                score: {
                    black: {
                        area: 0,
                        captures: draftState.score.black.captures - draftState.score.black.draftCaptures
                    },
                    white: {
                        area: 0,
                        captures: draftState.score.white.captures - draftState.score.white.draftCaptures
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
                            captures: blackData.captures ? draftState.score.black.captures + blackData.captures : draftState.score.black.captures,
                            draftCaptures: blackData.captures
                        },
                        white: {
                            area: whiteData.area ? whiteData.area : draftState.score.white.area,
                            captures: whiteData.captures ? draftState.score.white.captures + whiteData.captures : draftState.score.white.captures,
                            draftCaptures: whiteData.captures
                        }
                    },
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        case HANDLE_PASS_GO:
            return produce(state, draftState => {
                return {
                    ...draftState,
                    pass: true,
                    toPlay: draftState.toPlay === 'white' ? 'black' : 'white'
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        case UNDO_MOVE:
            return produce(state, draftState => {
                if (draftState.previousBoardPosition !== null) {
                    return {
                        ...draftState,
                        board: draftState.previousBoardPosition,
                        previousBoardPosition: null,
                        toPlay: draftState.toPlay === 'white' ? 'black' : 'white'
                    }
                } else {
                    return {
                        ...draftState
                    }
                }
            })
        //-----------------------------------------------------------------------------------------------------//
        default:
            return state
    }

}

export default reducer