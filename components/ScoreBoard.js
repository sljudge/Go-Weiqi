import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;



const ScoreBoard = props => {
    const score = useSelector(state => state.game.score)
    const checkingScore = useSelector(state => state.game.checkingScore)
    const [timeline, setTimeline] = useState(gsap.timeline({ paused: true }))
    const boardRef = useRef(null)
    const ctaRef = useRef(null)

    useEffect(() => {
        timeline.reversed(!timeline.reversed())
    }, [checkingScore])

    useEffect(() => {
        timeline
            .to(boardRef.current, { y: 0, duration: .5, ease: "power2.in" })
            .to(ctaRef.current, { y: 0, duration: .5, ease: "power2.in" })
            .reverse()
    }, [])

    return (
        <>
            <div ref={boardRef} className="absolute top-0 right-0 text-right bg-gray-600 p-2 px-20 md:px-12 rounded-bl-lg z-40 transform -translate-y-80">
                <div className="text-center md:py-12">
                    <div className="mx-4 md:text-lg">
                        white: <strong>{score.white.area + score.white.captures}</strong>
                    </div>
                    <div className="mx-4 md:text-lg">
                        black: <strong>{score.black.area + score.black.captures}</strong>
                    </div>
                    <div className="py-2 px-8 mt-8 bg-green-500 rounded-lg text-xl cursor-pointer hidden md:block hover:outline-white">
                        Accept score
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 left-0 flex justify-center items-center pb-4 z-40  md:hidden  overflow-hidden">
                <div ref={ctaRef} className=" py-2 px-8 bg-green-500 rounded-lg cursor-pointer hover:outline-white transform translate-y-24">
                    Accept score
                </div>
            </div>
        </>
    )
}


export default ScoreBoard