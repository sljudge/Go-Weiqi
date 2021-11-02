import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Board from './Board'
import GameMenu from './GameMenu'
import CTAMenu from './CTAMenu'
import ScoreBoard from './ScoreBoard'
import Tutorial from './Tutorial'


const App = props => {
    const dispatch = useDispatch()

    const tutorial = useSelector(state => state.game.tutorial)
    const boardWidth = useSelector(state => state.display.boardWidth)



    return (
        <div className={`bg-gray-200 text-white flex ${tutorial ? 'justify-end' : 'justify-center'} items-center h-screen w-screen max-h-screen max-w-screen overflow-hidden pb-16 md:pb-0`}>


            <Board />

            <GameMenu />

            <CTAMenu />

            <ScoreBoard />

            {
                !!tutorial &&
                <Tutorial />
            }



        </div>
    )
}


export default App