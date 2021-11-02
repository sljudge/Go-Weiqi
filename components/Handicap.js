import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Handicap = props => {
    const { i } = { ...props }
    const boardSize = useSelector(state => state.game.boardSize)
    const row = Math.floor((i) / boardSize)
    const column = i % boardSize

    return (
        <div key={`h${i}`} id={`h${i}`} className=" absolute rounded-full bg-gray-800 absolute z-10"
            style={{
                width: `${(100 / boardSize) / 4}%`,
                minWidth: `${(100 / boardSize) / 4}%`,
                height: `${(100 / boardSize) / 4}%`,
                minHeight: `${(100 / boardSize) / 4}%`,
                left: `${(column / (boardSize - 1) * 100) - ((100 / boardSize) / 8)}%`,
                top: `${(row / (boardSize - 1) * 100) - ((100 / boardSize) / 8)}%`
            }} />

    )
}


export default Handicap