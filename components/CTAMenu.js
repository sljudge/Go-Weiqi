import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import CTA from './CTA'

import { passGo, checkScore, undoMove } from '../actions/game'

const CTAMenu = props => {
    const [selected, setSelected] = useState(null)
    const checkingScore = useSelector(state => state.game.checkingScore)
    const previousBoardPosition = useSelector(state => state.game.previousBoardPosition)


    return (
        <div className={`absolute bottom-0 left-0 w-full p-4 pb-16 md:pb-4 flex md:flex-col justify-evenly ${checkingScore && 'z-20'}`}>
            <CTA
                id="pass"
                imageSrc="./images/pass.png"
                confirmText="Pass go?"
                bgClass="bg-yellow-400 hover:bg-yellow-300"
                action={passGo}
                selected={{ get: selected, set: setSelected }} />
            <CTA
                id="brain"
                imageSrc="./images/brain.png"
                confirmText="Analyse the board?"
                bgClass="bg-green-500 hover:bg-green-400"
                action={checkScore}
                selected={{ get: selected, set: setSelected }} />
            <CTA
                id="undo"
                imageSrc="./images/undo.png"
                confirmText="Undo the last move?"
                bgClass="bg-red-500 hover:bg-red-400"
                action={undoMove}
                disabled={previousBoardPosition === null || checkingScore}
                selected={{ get: selected, set: setSelected }} />
        </div>

    )
}


export default CTAMenu