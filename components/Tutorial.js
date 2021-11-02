import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setToPlay, updateBoard } from '../actions/game'
import tutorialData from '../data/tutorialData'

const Tutorial = props => {
    const dispatch = useDispatch()
    const [index, setIndex] = useState(5)
    const tutorial = useSelector(state => state.game.tutorial)
    const boardWidth = useSelector(state => state.display.boardWidth)

    const handleNextClick = () => {
        if (index < tutorialData.length - 1) {
            setIndex(index + 1)
        }
    }
    const handlePreviousClick = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    useEffect(() => {
        if (tutorialData[index].board) {
            dispatch(updateBoard(tutorialData[index].board))
        }
        if (tutorialData[index].toPlay) {
            dispatch(setToPlay(tutorialData[index].toPlay))
        }
    }, [index])

    return (
        <>
            {
                !!tutorial &&
                <div className="z-50 ml-16 bg-gray-600 p-8 h-full flex flex-col justify-center items-start" style={{ width: `calc((100vw - ${boardWidth}px)/2)` }}>
                    <div className="pb-4 font-bold">{index + 1}/{tutorialData.length}</div>
                    <p>
                        {tutorialData[index].copy}
                    </p>
                    <div className="w-full flex justify-between">
                        <button onClick={handlePreviousClick} className="mx-2 px-4 py-2 text-white w-20 flex justify-center items-center bg-red-400 rounded-lg my-8 hover:bg-red-300 hover:outline-white transition duration-200">Previous</button>
                        <button onClick={handleNextClick} className="mx-2 px-4 py-2 text-white w-20 flex justify-center items-center bg-green-600 rounded-lg my-8 hover:bg-green-500 hover:outline-white transition duration-200">Next</button>
                    </div>
                </div>
            }
        </>
    )
}


export default Tutorial