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

export const UPDATE_BOARD = 'UPDATE_BOARD'

export const updateBoard = (i) => ({
   type: UPDATE_BOARD,
   board
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

export const CHECK_SCORE = 'CHECK_SCORE'

export const checkScore = () => ({
   type: CHECK_SCORE
})

// ------------------------------------------------------------------------------

export const CANCEL_SCORING = 'CANCEL_SCORING'

export const cancelScoring = () => ({
   type: CANCEL_SCORING
})

// ------------------------------------------------------------------------------

export const UPDATE_SCORE = 'UPDATE_SCORE'

export const updateScore = (json = { black: {}, white: {} }) => ({
   type: UPDATE_SCORE,
   json
})

// ------------------------------------------------------------------------------

export const PASS_GO = 'PASS_GO'

export const passGo = () => ({
   type: PASS_GO
})

// ------------------------------------------------------------------------------

export const HANDLE_PASS_GO = 'HANDLE_PASS_GO'

export const handlePassGo = () => ({
   type: HANDLE_PASS_GO
})
