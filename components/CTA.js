import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { passGo } from '../actions/game'

const CTA = props => {
    const { id, imageSrc, confirmText, bgClass, action, selected, disabled = false } = { ...props }
    const dispatch = useDispatch()
    const boardWidth = useSelector(state => state.display.boardWidth)
    const [confirm, setConfirm] = useState(null)
    const confirmRef = useRef(null)
    const confirmContentRef = useRef(null)
    const [openTimeline, setOpenTimeline] = useState(gsap.timeline({ paused: true }))

    const handleClick = () => {
        if (!disabled) {
            setConfirm(confirm === null ? true : !confirm)
            selected.set(id)
        }
    }

    const handleConfirmClick = () => {
        if (!disabled) {
            setConfirm(false)
            dispatch(action())
        }
    }

    const handleCancelClick = () => {
        setConfirm(false)
    }

    useEffect(() => {
        if (confirm !== null) {
            openTimeline.reversed(!openTimeline.reversed());
        }
    }, [confirm])

    useEffect(() => {
        if (selected.get !== id && confirm) {
            setConfirm(false)
        }
    }, [selected.get])

    useEffect(() => {
        openTimeline
            .to(confirmRef.current, {
                width: boardWidth < 500 ? '100%' : '300px',
                height: '4rem',
                paddingLeft: boardWidth < 500 ? '2rem' : '5rem',
                paddingRight: '2rem',
                ease: "power1.in",
                duration: .25
            })
            .to(confirmContentRef.current, { display: "block" })
            .reverse()
    }, [])

    return (
        <div className={`relative my-4 transition duration-500 ${confirm && 'z-50'} ${disabled && 'opacity-25'}`}>
            <div onClick={handleClick} className={`cta z-20 ${bgClass} transition duration-200`}>
                <img src={imageSrc} className="w-full h-auto" />
            </div>
            <div ref={confirmRef} className="fixed md:absolute bg-gray-300 text-gray-800 bottom-0 left-0 md:top-0 md:left-4 md:rounded-full md:z-10 z-50 w-0 h-16 overflow-hidden">
                <div ref={confirmContentRef} className="hidden text-center">
                    {confirmText}
                    <div className="flex justify-center py-2">
                        <span onClick={handleConfirmClick} className="text-white bg-green-500 rounded-lg px-4 mx-4 cursor-pointer hover:outline-white transition duration-300">Yes</span>
                        <span onClick={handleCancelClick} className="text-white bg-red-500 rounded-lg px-4 mx-4 cursor-pointer hover:outline-white transition duration-300">No</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CTA