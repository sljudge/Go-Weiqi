import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import { passGo } from '../actions/game'

const CTA = props => {
    const { id, imageSrc, confirmText, bgClass, action, selected } = { ...props }
    const dispatch = useDispatch()
    const [confirm, setConfirm] = useState(null)
    const confirmRef = useRef(null)
    const confirmContentRef = useRef(null)
    const [openTimeline, setOpenTimeline] = useState(gsap.timeline({ paused: true }))

    const handleClick = () => {
        setConfirm(confirm === null ? true : !confirm)
        selected.set(id)
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
            .to(confirmRef.current, { width: '340px', height: '4rem', paddingLeft: '5rem', paddingRight: '2rem', ease: "power1.in", duration: .25 })
            .to(confirmContentRef.current, { display: "block" })
            .reverse()
    }, [])

    return (
        <div className="relative my-4 z-50">
            <div onClick={handleClick} className={`cta z-20 ${bgClass}`}>
                <img src={imageSrc} className="w-full h-auto" />
            </div>
            <div ref={confirmRef} className="absolute bg-gray-300 text-gray-800 top-0 left-4 rounded-full z-10 w-0 h-16 overflow-hidden">
                <div ref={confirmContentRef} className="hidden">
                    {confirmText}
                    <div className="flex justify-center py-2">
                        <span className="text-white bg-green-500 rounded-lg px-4 mx-4 cursor-pointer hover:outline-white transition duration-300">Yes</span>
                        <span className="text-white bg-red-500 rounded-lg px-4 mx-4 cursor-pointer hover:outline-white transition duration-300">No</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CTA