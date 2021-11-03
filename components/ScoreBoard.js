import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { setGameOver } from '../actions/game';


const ScoreBoard = props => {
    const dispatch = useDispatch()
    const score = useSelector(state => state.game.score)
    const checkingScore = useSelector(state => state.game.checkingScore)
    const gameOver = useSelector(state => state.game.gameOver)
    const [timeline, setTimeline] = useState(gsap.timeline({ paused: true }))
    const [whiteScore, setWhiteScore] = useState(0)
    const [blackScore, setBlackScore] = useState(0)
    const boardRef = useRef(null)
    const ctaRef = useRef(null)

    const handleAcceptScore = () => {
        dispatch(setGameOver())
    }

    useEffect(() => {
        // if (!tutorial) {
        timeline.reversed(!timeline.reversed())
        // }
    }, [checkingScore])

    useEffect(() => {
        setWhiteScore(score.white.area + score.white.captures)
        setBlackScore(score.black.area + score.black.captures)
    }, [score])

    useEffect(() => {
        timeline
            .to(boardRef.current, { x: 0, duration: .5, ease: "power2.in" })
            .to(ctaRef.current, { x: 0, duration: .5, ease: "power2.in" })
            .reverse()
    }, [])

    return (
        <>
            <div ref={boardRef} className="absolute md:top-40 bottom-4 left-0 text-right bg-gray-600 p-2 px-20 md:px-12 rounded-r-lg z-40 transform -translate-x-full">
                <div className="text-center md:py-12 flex flex-col justify-center items-center h-full">
                    <div className="mx-4 md:text-lg">
                        white: <strong>{whiteScore}</strong>
                    </div>
                    <div className="mx-4 md:text-lg">
                        black: <strong>{blackScore}</strong>
                    </div>
                    {
                        gameOver ?
                            <div className="py-2 px-8 mt-8 text-xl rounded-lg border-2 border-white">
                                {
                                    whiteScore >= blackScore ? 'White wins' : 'Black wins'
                                }
                            </div>
                            :
                            <button onClick={handleAcceptScore} className="py-2 px-8 mt-8 bg-green-500 rounded-lg text-xl cursor-pointer hover:outline-white">
                                Accept score
                            </button>
                    }
                </div>
            </div>
            {/* <div className="absolute bottom-0 right-0 left-0 flex justify-center items-center pb-4 z-40  md:hidden  overflow-hidden">
                <button onClick={handleAcceptScore} ref={ctaRef} className=" py-2 px-8 bg-green-500 rounded-lg cursor-pointer hover:outline-white transform translate-y-24">
                    Accept score
                </button>
            </div> */}
        </>
    )
}


export default ScoreBoard