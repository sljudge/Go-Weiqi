export const SET_BOARD_SIZE = 'SET_BOARD_SIZE'

export const setBoardSize = (int) => ({
   type: SET_BOARD_SIZE,
   int
})

// ------------------------------------------------------------------------------

export const SET_TO_PLAY = 'SET_TO_PLAY'

export const setToPlay = (color) => ({
   type: SET_TO_PLAY,
   color
})

// ------------------------------------------------------------------------------

export const UPDATE_LIBERTY = 'UPDATE_LIBERTY'

export const updateLiberty = (i) => ({
   type: UPDATE_LIBERTY,
   i
})

// ------------------------------------------------------------------------------

export const ATTEMPT_MOVE = 'ATTEMPT_MOVE'

export const attemptMove = (i) => ({
   type: ATTEMPT_MOVE,
   i
})

// ------------------------------------------------------------------------------

export const SET_FOCUS_POINT = 'SET_FOCUS_POINT'

export const setFocusPoint = (i) => ({
   type: SET_FOCUS_POINT,
   i
})

// ------------------------------------------------------------------------------