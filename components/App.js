import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Board from './Board'
import GameMenu from './GameMenu'
import CTAMenu from './CTAMenu'
import ScoreBoard from './ScoreBoard'


const App = props => {
    const dispatch = useDispatch()



    return (
        <div className="bg-gray-200 text-white flex flex-col justify-center items-center h-screen w-screen max-h-screen max-w-screen overflow-hidden pb-16 md:pb-0">


            <Board />

            <GameMenu />

            <CTAMenu />

            <ScoreBoard />




            {/* <div className="p-4 py-2 lg:p-8 bg-gray-400 mx-12" >
                <div onClick={handleCheckScore} className="cursor-pointer px-6 py-2 flex justify-center items-center bg-green-600 rounded-md hover:bg-green-500">
                    Check Score
                </div>
                <div className="flex">
                    <div className="mx-4">
                        white: {score.white.area + score.white.captures}
                    </div>
                    <div className="mx-4">
                        black: {score.black.area + score.black.captures}
                    </div>
                </div>
            </div> */}
        </div>
    )
}


export default App