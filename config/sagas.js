import { takeEvery, select, call, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ATTEMPT_MOVE, UPDATE_NODE, SET_TO_PLAY, SET_FOCUS_POINT, CLEAR_NODE, SET_STONES_TO_BE_REMOVED, SET_KO, CHECK_SCORE, UPDATE_BOARD, UPDATE_SCORE } from '../actions/game'
import { Validate } from '../helpers'


function* handleAttemptMove(action) {
    const board = yield select(state => state.game.board)
    const toPlay = yield select(state => state.game.toPlay)
    const focusPoint = yield select(state => state.game.focusPoint)
    const ko = yield select(state => state.game.ko)
    const previousBoardPosition = yield select(state => state.game.previousBoardPosition)

    if (focusPoint !== action.i) {
        console.log(toPlay, board)
        const Validator = new Validate(board, toPlay, previousBoardPosition, ko)

        if (!Validator.validateKO(action.i)) {
            return;
        }

        yield put({ type: SET_STONES_TO_BE_REMOVED, array: [] })

        const toBeRemoved = yield Validator.handleCapture(action.i)

        let hasLiberty
        if (toBeRemoved.length == 0) {
            hasLiberty = yield Validator.hasLiberties(action.i)
        } else {
            yield put({ type: SET_STONES_TO_BE_REMOVED, array: toBeRemoved })
        }
        if (toBeRemoved.length > 0 || hasLiberty) {
            yield put({ type: SET_FOCUS_POINT, i: action.i })
        } else {
            yield put({ type: SET_FOCUS_POINT, i: null })
        }
    } else {
        yield handleMove(action.i)
    }
}

function* handleMove(i) {
    const toBeRemoved = yield select(state => state.game.stonesToBeRemoved)
    const ko = yield select(state => state.game.ko)
    const toPlay = yield select(state => state.game.toPlay)

    yield put({ type: UPDATE_NODE, i: i })

    if (toBeRemoved.length > 0) {
        yield put({ type: SET_KO, bool: true })

        console.log('to be removed', toBeRemoved)

        for (let i = 0; i < toBeRemoved.length; i++) {
            yield put({
                type: UPDATE_SCORE, json: {
                    black: { captures: toPlay === 'black' ? toBeRemoved[i].length : undefined },
                    white: { captures: toPlay === 'white' ? toBeRemoved[i].length : undefined }
                }
            })
            for (let j = 0; j < toBeRemoved[i].length; j++) {
                yield put({ type: CLEAR_NODE, i: toBeRemoved[i][j] })
            }
        }

        yield put({ type: SET_STONES_TO_BE_REMOVED, array: [] })
    } else if (ko) {
        yield put({ type: SET_KO, bool: false })
    }

    yield put({ type: SET_TO_PLAY })
    yield put({ type: SET_FOCUS_POINT, i: null })
}

function* handleCheckScore(action) {
    const board = yield select(state => state.game.board)

    const Validator = new Validate(board)

    const scoringAreas = yield Validator.checkScore()
    console.log('scoring areas', scoringAreas)
    if (scoringAreas.length > 1) {

        let tempBoard = board.slice(0, board.length)
        let blackArea = 0
        let blackCaptures = 0
        let whiteArea = 0
        let whiteCaptures = 0

        scoringAreas.forEach(area => {

            if (area.owner !== '.') {

                if (area.owner === 'x') {
                    if (area.capture) {
                        blackCaptures += area.chain.length
                    }
                    blackArea += area.chain.length
                } else {
                    if (area.capture) {
                        whiteCaptures += area.chain.length
                    }
                    whiteArea += area.chain.length
                }

                area.chain.forEach(node => {
                    tempBoard = tempBoard.replaceAt(node, area.owner.toUpperCase())
                })
            }

        })

        yield put({ type: UPDATE_BOARD, board: tempBoard })
        yield put({
            type: UPDATE_SCORE, json: {
                black: {
                    area: blackArea,
                    captures: blackCaptures
                },
                white: {
                    area: whiteArea,
                    captures: whiteCaptures
                }
            }
        })
    }
}

export function* watcher() {
    yield takeEvery(ATTEMPT_MOVE, handleAttemptMove)
    yield takeEvery(CHECK_SCORE, handleCheckScore)
}