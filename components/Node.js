import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { attemptMove, setFocusPoint, clearNode } from '../actions/game'

const Node = props => {
    const { i } = { ...props }
    const dispatch = useDispatch()
    const toPlay = useSelector(state => state.game.toPlay)
    const focusPoint = useSelector(state => state.game.focusPoint)
    const boardSize = useSelector(state => state.game.boardSize)
    const board = useSelector(state => state.game.board)
    const status = board[i]
    const row = Math.floor((i) / boardSize)
    const column = i % boardSize
    const [hoverClass, setHoverClass] = useState()
    const [backgroundClass, setBackgroundClass] = useState(status === 'o' ? 'bg-gray-100' : status === 'x' ? 'bg-gray-700' : '')
    const [sizeClassNames, setSizeClassNames] = useState("min-w-12 min-h-12 h-12 w-12")
    const [offset, setOffset] = useState('1.5rem')

    /**********************
     * FUNCTIONS
     **********************/
    const handleClick = () => {
        // const isDead = checkIfDead()
        if (status === '.') {
            dispatch(attemptMove(i))
        }
    }

    useEffect(() => {
        if (status === '.') {
            setHoverClass(
                toPlay === 'white' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
            )
        }
    }, [toPlay])

    useEffect(() => {
        setBackgroundClass(
            status === 'o' ? 'bg-gray-100' : status === 'x' ? 'bg-gray-700' : ''
        )
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
        if (boardSize <= 9) {
            setSizeClassNames("min-w-12 min-h-12 h-12 w-12")
            setOffset('1.5rem')
        } else if (boardSize <= 13) {
            setSizeClassNames("min-w-8 min-h-8 h-8 w-8")
            setOffset('1rem')
        } else {
            setSizeClassNames("min-w-6 min-h-6 h-6 w-6")
            setOffset('0.75rem')
        }
    }, [boardSize])

    /*********************
     * RETURN
     *********************/
    return (
        <div
            key={i}
            id={i}
            className={`absolute rounded-full absolute z-20 ${sizeClassNames} ${hoverClass} ${backgroundClass}`}
            style={
                {
                    opacity: status === '.' ? 0.25 : 1,
                    left: `calc(${Math.floor(column / (boardSize - 1) * 100)}% - ${offset})`,
                    top: `calc(${Math.floor(row / (boardSize - 1) * 100)}% - ${offset})`
                }
            }
            onClick={handleClick} > {i}
        </div>

    )
}


export default Node