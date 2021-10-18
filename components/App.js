import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Node from './Node'
import Handicap from './Handicap'
import Line from './Line'
import { checkScore } from '../actions/game'

const App = props => {
    const dispatch = useDispatch()
    const boardSize = useSelector(state => state.game.boardSize)

    const renderLibertiesAndHandicaps = () => {
        const output = []
        const handicapSpaceSeparator = boardSize <= 9 ? 2 : 3

        for (let i = 0; i < Math.pow(boardSize, 2); i++) {
            // LIBERTIES
            output.push(<Node key={i} i={i} />)
            // HANDICAPS
            if (
                i == handicapSpaceSeparator * boardSize + handicapSpaceSeparator ||
                i == (handicapSpaceSeparator + 1) * boardSize - handicapSpaceSeparator - 1 ||
                i == (boardSize - handicapSpaceSeparator - 1) * boardSize + handicapSpaceSeparator ||
                i == (boardSize - handicapSpaceSeparator) * boardSize - handicapSpaceSeparator - 1 ||
                i == (Math.pow(boardSize, 2) - 1) / 2
            ) {
                output.push(<Handicap key={`d-${i}`} i={i} />)
            }
        }
        return output
    }

    const renderLines = () => {
        const output = []
        for (let i = 0; i < boardSize; i++) {
            const spaceIncrement = `${Math.floor(i / (boardSize - 1) * 100)}%`
            output.push(
                <Line key={`h-${i}`} i={i} direction={"horizontal"} spaceIncrement={spaceIncrement} />
            )
            output.push(
                <Line key={`v-${i}`} i={i} direction={"vertical"} spaceIncrement={spaceIncrement} />
            )
        }
        return output
    }


    const renderBoard = () => {
        return [renderLines(), renderLibertiesAndHandicaps()]
    }

    const handleCheckScore = () => dispatch(checkScore())

    return (
        <div className="bg-gray-300 text-white flex justify-center items-center p-12">

            <div className="absolute top-0 left-0 p-8">
                <div onClick={handleCheckScore} className="cursor-pointer px-6 py-2 flex justify-center items-center bg-green-600 rounded-md hover:bg-green-500">
                    Check Score
                </div>
            </div>

            <div className="relative p-12 bg-cover bg-no-repeat"
                style={{
                    width: "90vh",
                    height: "90vh",
                    maxWidth: '1200px',
                    maxHeight: '1200px',
                    backgroundImage: 'url("./images/wood-bg.jpg")'
                }}
            >
                <div className="w-full h-full relative flex flex-wrap">
                    {
                        renderBoard()
                    }
                </div>
            </div>
        </div>
    )
}


export default App