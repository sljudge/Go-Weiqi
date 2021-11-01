import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;
import { throttle } from "lodash";

import { cancelScoring } from '../actions/game'
import { setBoardWidth } from '../actions/display'

import Node from './Node'
import Handicap from './Handicap'
import Line from './Line'

const Board = props => {
    const dispatch = useDispatch()
    const boardSize = useSelector(state => state.game.boardSize)
    const checkingScore = useSelector(state => state.game.checkingScore)
    const boardWidth = useSelector(state => state.display.boardWidth)
    // const [boardWidth, setBoardWidth] = useState(0)
    const boardRef = useRef(null)
    const overlayRef = useRef(null)

    const cancelScore = () => dispatch(cancelScoring())

    const renderLibertiesAndHandicaps = () => {
        const output = []
        const handicapSpaceSeparator = boardSize <= 9 ? 2 : 3

        for (let i = 0; i < Math.pow(boardSize, 2); i++) {
            // LIBERTIES
            output.push(<Node key={i} i={i} />)
            // HANDICAPS
            if (
                i == handicapSpaceSeparator * boardSize + handicapSpaceSeparator ||
                i == (handicapSpaceSeparator + 1) * boardSize - handicapSpaceSeparator - 1 ||
                i == (boardSize - handicapSpaceSeparator - 1) * boardSize + handicapSpaceSeparator ||
                i == (boardSize - handicapSpaceSeparator) * boardSize - handicapSpaceSeparator - 1 ||
                i == (Math.pow(boardSize, 2) - 1) / 2
            ) {
                output.push(<Handicap key={`d-${i}`} i={i} />)
            }
        }
        return output
    }

    const renderLines = () => {
        const output = []
        for (let i = 0; i < boardSize; i++) {
            const spaceIncrement = `${i / (boardSize - 1) * 100}%`
            output.push(
                <Line key={`h-${i}`} i={i} direction={"horizontal"} spaceIncrement={spaceIncrement} />
            )
            output.push(
                <Line key={`v-${i}`} i={i} direction={"vertical"} spaceIncrement={spaceIncrement} />
            )
        }
        return output
    }

    const renderBoard = () => {
        return [renderLines(), renderLibertiesAndHandicaps()]
    }

    const handleScreenResize = throttle(() => {
        dispatch(setBoardWidth(boardRef.current.offsetWidth))
    }, 500)

    useEffect(() => {
        window.addEventListener("resize", handleScreenResize)
        return () => {
            window.removeEventListener("resize", handleScreenResize)
        }
    }, [boardRef])

    useEffect(() => {
        if (checkingScore) {
            gsap.to(overlayRef.current, { opacity: 1, zIndex: 30, ease: "power2.in", duration: .2 })
        } else {
            gsap.to(overlayRef.current, { opacity: 0, zIndex: 0, ease: "power2.out", duration: .2 })
        }
    }, [checkingScore])

    useEffect(() => {
        handleScreenResize()
    }, [])

    return (
        <>
            <div ref={overlayRef} onClick={cancelScore} className="absolute inset-0 transition duration-500 opacity-0" style={{ backgroundColor: 'rgba(30,30,30,0.6)' }} />
            <div ref={boardRef} className="relative bg-cover bg-no-repeat shadow-2xl z-40"
                style={{
                    width: '100%',
                    height: boardWidth,
                    maxWidth: '100vh',
                    padding: '5%',
                    backgroundImage: 'url("./images/wood-bg.jpg")'
                }}
            >
                <div className="w-full h-full relative flex flex-wrap">
                    {
                        renderBoard()
                    }
                </div>
            </div>
        </>
    )
}


export default Board