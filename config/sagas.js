import { takeEvery, select, call, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ATTEMPT_MOVE, UPDATE_NODE, SET_TO_PLAY, SET_FOCUS_POINT, CLEAR_NODE, SET_STONES_TO_BE_REMOVED, SET_KO, CHECK_SCORE, UPDATE_BOARD, UPDATE_SCORE, PASS_GO, HANDLE_PASS_GO, SET_IN_SEKI } from '../actions/game'
import { Validate } from '../helpers'


function* handleAttemptMove(action) {
    const board = yield select(state => state.game.board)
    const toPlay = yield select(state => state.game.toPlay)
    const focusPoint = yield select(state => state.game.focusPoint)
    const ko = yield select(state => state.game.ko)
    const koPosition = yield select(state => state.game.koPosition)

    if (focusPoint !== action.i) {
        console.log('handle attempt move', toPlay, board)
        const Validator = new Validate(board, toPlay, koPosition, ko)

        if (!Validator.validateKO(action.i)) {
            return;
        }

        yield put({ type: SET_STONES_TO_BE_REMOVED, array: [] })

        const toBeRemoved = yield Validator.captureChain(action.i)

        let hasLiberty
        if (toBeRemoved.length == 0) {
            hasLiberty = yield Validator.hasLiberties(action.i)
        } else {
            yield put({ type: SET_STONES_TO_BE_REMOVED, array: toBeRemoved })
        }
        console.log('handle attempt move 2', toBeRemoved, hasLiberty)
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

    const scoreData = yield Validator.checkScore()
    console.log('scoring data', scoreData)
    // yield put({ type: UPDATE_BOARD, board: scoreData.areas })

    if (scoreData.inSeki.size > 0) {
        yield put({ type: SET_IN_SEKI, array: [...scoreData.inSeki] })
    }

    if (scoreData.areas) {

        let tempBoard = board.slice(0, board.length)
        let blackArea = 0
        let whiteArea = 0


        scoreData.areas.forEach(area => {
            if (area.owner !== '.') {
                if (area.owner === 'x') {
                    blackArea += area.chain.length
                } else {
                    whiteArea += area.chain.length
                }
                area.chain.forEach(node => {
                    tempBoard = tempBoard.replaceAt(node, area.owner.toUpperCase())
                })
            } else {
                area.chain.forEach(node => {
                    tempBoard = tempBoard.replaceAt(node, '.')
                })
            }
        })

        yield put({ type: UPDATE_BOARD, board: tempBoard })
        yield put({
            type: UPDATE_SCORE, json: {
                black: {
                    area: blackArea,
                    captures: scoreData.blackDraftCaptures
                },
                white: {
                    area: whiteArea,
                    captures: scoreData.whiteDraftCaptures
                }
            }
        })
    }
}

function* handlePassGo(action) {
    const pass = yield select(state => state.game.pass)
    if (pass) {
        yield put({ type: CHECK_SCORE })
    } else {
        yield put({ type: HANDLE_PASS_GO })
    }
}

export function* watcher() {
    yield takeEvery(ATTEMPT_MOVE, handleAttemptMove)
    yield takeEvery(CHECK_SCORE, handleCheckScore)
    yield takeEvery(PASS_GO, handlePassGo)
}