import { takeEvery, select, call, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ATTEMPT_MOVE, UPDATE_LIBERTY, SET_TO_PLAY, SET_FOCUS_POINT } from '../actions/game'

function* handleAttemptMove(action) {
   yield put({type: SET_FOCUS_POINT, i: null})
   yield put({type: UPDATE_LIBERTY, i: action.i})
   yield put({type: SET_TO_PLAY})
}

export function* watcher() {
   yield takeEvery(ATTEMPT_MOVE, handleAttemptMove)
}