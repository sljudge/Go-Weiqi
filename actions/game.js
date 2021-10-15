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

export const UPDATE_NODE = 'UPDATE_NODE'

export const updateNode = (i) => ({
   type: UPDATE_NODE,
   i
})

// ------------------------------------------------------------------------------

export const CLEAR_NODE = 'CLEAR_NODE'

export const clearNode = (i) => ({
   type: CLEAR_NODE,
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

export const SET_STONES_TO_BE_REMOVED = 'SET_STONES_TO_BE_REMOVED'

export const setStonesToBeRemoved = (array) => ({
   type: SET_STONES_TO_BE_REMOVED,
   array
})

// ------------------------------------------------------------------------------

export const SET_KO = 'SET_KO'

export const setKo = (bool) => ({
   type: SET_KO,
   bool
})

// ------------------------------------------------------------------------------
