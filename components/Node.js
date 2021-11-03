import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { attemptMove, cancelScoring, checkScore } from '../actions/game'

const Node = props => {
    const { i } = { ...props }
    const dispatch = useDispatch()
    const toPlay = useSelector(state => state.game.toPlay)
    const focusPoint = useSelector(state => state.game.focusPoint)
    const boardSize = useSelector(state => state.game.boardSize)
    const board = useSelector(state => state.game.board)
    const checkingScore = useSelector(state => state.game.checkingScore)
    const inSeki = useSelector(state => state.game.inSeki)
    const status = board[i]
    const row = Math.floor((i) / boardSize)
    const column = i % boardSize
    const [hoverClass, setHoverClass] = useState()
    const [backgroundClass, setBackgroundClass] = useState(status.toLowerCase() === 'o' ? 'bg-gray-100' : status.toLowerCase() === 'x' ? 'bg-gray-700' : '')
    const [scoreClassName, setScoreClassName] = useState("rounded-full")
    const [borderClass, setBorderClass] = useState("")

    /**********************
     * FUNCTIONS
     **********************/
    const handleClick = () => {
        if (checkingScore) {
            dispatch(cancelScoring())
        } else if (status === '.') {
            dispatch(attemptMove(i))
        }
    }

    useEffect(() => {
        if (status === '.') {
            setHoverClass(
                toPlay === 'white' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
            )
        } else {
            setHoverClass('')
        }
    }, [board])

    useEffect(() => {
        setBackgroundClass(
            status.toLowerCase() === 'o' ? 'bg-gray-100' : status.toLowerCase() === 'x' ? 'bg-gray-700' : ''
        )
        if (status === 'O' || status === "X") {
            setScoreClassName('opacity-50 rounded-none hover:rounded-full hover:scale-100 transform scale-75')
        } else {
            setScoreClassName('rounded-full')
        }
    }, [status])

    useEffect(() => {
        if (status === ".") {
            if (focusPoint == i) {
                setBackgroundClass(
                    toPlay === 'white' ? 'bg-gray-100' : 'bg-gray-700'
                )
            } else {
                setBackgroundClass('')
            }
        }
    }, [focusPoint])


    useEffect(() => {
        // if (checkingScore && inSeki.includes(i)) {
        //     setBorderClass("border-2 border-purple-600")
        // } else {
        //     setBorderClass("")
        // }


    }, [checkingScore])

    /*********************
     * RETURN
     *********************/
    return (
        <div
            key={i}
            id={i}
            className={`absolute z-20 ${hoverClass} ${backgroundClass} ${scoreClassName} ${borderClass}`}
            style={
                {
                    width: `${(100 / boardSize) / 1.5}%`,
                    minWidth: `${(100 / boardSize) / 1.5}%`,
                    height: `${(100 / boardSize) / 1.5}%`,
                    minHeight: `${(100 / boardSize) / 1.5}%`,
                    opacity: ['.', 'X', 'O'].includes(status) ? 0.25 : 1,
                    left: `${(column / (boardSize - 1) * 100) - ((100 / boardSize) / 3)}%`,
                    top: `${(row / (boardSize - 1) * 100) - ((100 / boardSize) / 3)}%`
                }
            }
            onClick={handleClick} >
            {/* <span className="text-gray-500">
                {i}
            </span> */}
        </div>

    )
}


export default Node