import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { startNewGame } from '../actions/game';


const MenuItem = props => {
    const { sizeID, newGame } = { ...props }

    const handleClick = () => {
        newGame.set(sizeID)
    }


    return (
        <button onClick={handleClick} className={`game-menu-cta  ${newGame.get === sizeID ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
            {sizeID}x{sizeID}
        </button>
    )
}


const NewGameMenu = props => {
    const dispatch = useDispatch()
    const boardSize = useSelector(state => state.game.boardSize)
    const [newGameSize, setNewGameSize] = useState(boardSize)

    const handleClick = () => {
        dispatch(startNewGame(newGameSize))
    }


    return (
        <div className="flex flex-col items-end pt-3 border-t border-white mt-3">
            <div className="flex justify-end">
                <MenuItem sizeID={9} newGame={{ get: newGameSize, set: setNewGameSize }} />
                <MenuItem sizeID={13} newGame={{ get: newGameSize, set: setNewGameSize }} />
                <MenuItem sizeID={19} newGame={{ get: newGameSize, set: setNewGameSize }} />
            </div>
            <button onClick={handleClick} className="w-40 px-4 py-2 text-white mx-1 my-2 flex justify-center items-center  bg-gray-500 hover:bg-green-700">Start new game</button>
        </div>
    )
}


export default NewGameMenu