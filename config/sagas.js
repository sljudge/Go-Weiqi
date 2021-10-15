import { takeEvery, select, call, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ATTEMPT_MOVE, UPDATE_NODE, SET_TO_PLAY, SET_FOCUS_POINT, CLEAR_NODE, SET_STONES_TO_BE_REMOVED, SET_KO } from '../actions/game'
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
        console.log('to be removed', action.i, toBeRemoved)

        let hasLiberty
        if (toBeRemoved.length == 0) {
            hasLiberty = yield Validator.hasLiberties(action.i)
        } else {
            yield put({ type: SET_STONES_TO_BE_REMOVED, array: toBeRemoved })
        }
        console.log('SAGA', hasLiberty, toBeRemoved)
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
    console.log('handle move', toBeRemoved)

    yield put({ type: UPDATE_NODE, i: i })

    if (toBeRemoved.length > 0) {
        yield put({ type: SET_KO, bool: true })

        for (let i = 0; i < toBeRemoved.length; i++) {
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

export function* watcher() {
    yield takeEvery(ATTEMPT_MOVE, handleAttemptMove)
}