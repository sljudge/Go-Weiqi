import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import Liberty from './Liberty'
import Handicap from './Handicap'
import Line from './Line'

const App = props => {
    const boardSize = useSelector(state => state.game.boardSize)

    const renderLibertiesAndHandicaps = () => {
        const output = []
        const handicapSpaceSeparator = boardSize <= 9 ? 2 : 3

        for(let i=0; i<Math.pow(boardSize, 2); i++){
            // LIBERTIES
            output.push(<Liberty i={i} />)
            // HANDICAPS
            if(
                i == handicapSpaceSeparator*boardSize + handicapSpaceSeparator || 
                i == (handicapSpaceSeparator+1)*boardSize - handicapSpaceSeparator - 1 ||
                i == (boardSize-handicapSpaceSeparator-1)*boardSize + handicapSpaceSeparator ||
                i == (boardSize-handicapSpaceSeparator)*boardSize - handicapSpaceSeparator - 1 || 
                i == (Math.pow(boardSize, 2)-1)/2
            ){
                output.push(<Handicap i={i} />)
            }
        }
        return output
    }

    const renderLines = () => {
        const output= []
        for(let i=0; i<boardSize; i++){
            const spaceIncrement = `${Math.floor(i/(boardSize-1)*100)}%`
            output.push(
                <Line i={i} direction={"horizontal"} spaceIncrement={spaceIncrement}/>
            )
            output.push(
                <Line i={i} direction={"vertical"} spaceIncrement={spaceIncrement}/>
            )
        }
        return output
    }


    const renderBoard = () => {
        return [renderLines(), renderLibertiesAndHandicaps()]
    }

    return (
        <div className="bg-gray-300 text-white flex justify-center items-center p-12">
            <div className="relative p-12 bg-cover bg-no-repeat" 
            style={{
                width: "90vh",
                height:"90vh",
                maxWidth: '1200px',
                maxHeight: '1200px',
                backgroundImage: 'url("./images/wood-bg.jpg"'
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