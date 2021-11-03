import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { setToPlay, updateBoard, incrementOrDecrementTutorial, toggleTutorial } from '../actions/game'
import tutorialData from '../data/tutorialData'

const Tutorial = props => {
    const dispatch = useDispatch()
    const index = useSelector(state => state.game.tutorialIndex)
    const tutorial = useSelector(state => state.game.tutorial)
    const boardWidth = useSelector(state => state.display.boardWidth)
    const containerRef = useRef(null)

    const handleNextClick = () => {
        if (index < tutorialData.length - 1) {
            // setIndex(index + 1)
            dispatch(incrementOrDecrementTutorial('+'))
        } else {
            dispatch(toggleTutorial())
        }
    }
    const handlePreviousClick = () => {
        if (index > 0) {
            // setIndex(index - 1)
            dispatch(incrementOrDecrementTutorial('-'))
        }
    }

    const handleCollapse = () => {
        gsap.to(containerRef.current, {
            x: '100%',
            duration: .5,
            ease: 'power2.out'
        })
    }
    const handleExpand = () => {
        gsap.to(containerRef.current, {
            x: '0',
            duration: .5,
            ease: 'power2.in'
        })
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
                <div id="tutorial-container" ref={containerRef} className="z-50 md:ml-16 bg-gray-600 px-8 pb-8 pt-14 h-full bg-opacity-80 md:bg-opacity-100 absolute bottom-0 left-0 right-0 md:relative flex flex-col justify-center items-start transform translate-x-full md:translate-x-0" style={{ width: `calc((100vw - ${boardWidth}px)/2)` }}>
                    <button onClick={handleCollapse} className="absolute top-0 left-0 px-4 my-4 py-2 bg-gray-300 hover:bg-blue-400 rounded-r-full w-20 md:hidden">
                        <img src="./images/chevron-right.png" class="h-12 w-auto" />
                    </button>
                    <button onClick={handleExpand} className="absolute top-0 left-0 px-4 my-4 py-2 bg-gray-300 hover:bg-blue-400 rounded-l-full w-20 transform -translate-x-20 md:hidden">
                        <img src="./images/hat.png" class="h-12 w-auto" />
                    </button>
                    <div className="pb-4 font-bold">{index + 1}/{tutorialData.length}</div>
                    <p className="text-sm">
                        {tutorialData[index].copy}
                    </p>
                    <div className="w-full flex justify-between">
                        <button onClick={handlePreviousClick}
                            className={`${index == 0 ? 'opacity-50' : 'opacity-100'} mx-2 px-4 py-2 text-white w-20 flex justify-center items-center bg-red-400 rounded-lg my-8 hover:bg-red-300 hover:outline-white transition duration-200`}>
                            Previous
                        </button>
                        <button onClick={handleNextClick}
                            className={`mx-2 px-4 py-2 text-white w-20 flex justify-center items-center bg-green-600 rounded-lg my-8 hover:bg-green-500 hover:outline-white transition duration-200`}>
                            {
                                index == tutorialData.length - 1 ? 'End' : 'Next'
                            }
                        </button>
                    </div>
                </div>
            }
        </>
    )
}


export default Tutorial