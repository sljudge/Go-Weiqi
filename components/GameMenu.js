import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { startTutorial } from '../actions/game';

import Logo from './Logo'
import NewGameMenu from './NewGameMenu'


const GameMenu = props => {
    const dispatch = useDispatch()
    const boardSize = useSelector(state => state.game.boardSize)
    const [openTimeline, setOpenTimeline] = useState(gsap.timeline({ paused: true }))
    const [closeTimeline, setCloseTimeline] = useState(gsap.timeline({ paused: true }))
    const [open, setOpen] = useState(null)
    const logoRef = useRef(null)
    const menuRef = useRef(null)

    const handleClick = () => {
        setOpen(open === null ? true : !open)
    }

    const handleTutorialClick = () => {
        dispatch(startTutorial())
    }

    useEffect(() => {
        if (open === true) {
            openTimeline.play(0)
        } else if (open === false) {
            closeTimeline.play(0)
        }
    }, [open])

    useEffect(() => {
        openTimeline
            .to(logoRef.current, { backgroundColor: '#ffffff', rotate: 90, duration: .25, ease: 'power2.out' })
            .to(menuRef.current, { display: 'flex', width: '325px', height: '225px', ease: "expo.in", duration: .5, paddingTop: '2.5rem' }, "-=.25")
        closeTimeline
            .to(menuRef.current, { display: 'flex', width: 0, height: 0, ease: "expo.in", duration: .5, paddingTop: 0 })
            .to(logoRef.current, { backgroundColor: 'rgb(107, 114, 128)', rotate: 0, duration: .25, ease: 'power2.out' }, "-=.5")

    }, [])

    return (
        <div className="absolute top-0 left-0 z-50">
            <div ref={logoRef} onClick={handleClick} className="relative w-20 h-20 p-2 bg-gray-500 hover:border-4 border-white rounded-full cursor-pointer transition duration-500 z-20">
                <Logo />
            </div>
            <div ref={menuRef} className="absolute top-4 left-4 rounded-xl bg-gray-700 z-10  px-4  w-0 h-0 overflow-hidden text-right flex flex-col items-end justify-start">
                <button onClick={handleTutorialClick} className="w-40 px-4 py-2 text-white mx-1 flex justify-center items-center  bg-blue-500 hover:bg-blue-700">
                    Tutorial
                </button>
                <NewGameMenu />
            </div>
        </div>
    )
}


export default GameMenu