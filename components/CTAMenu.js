import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/all";
CSSPlugin.defaultTransformPerspective = 1000;

import CTA from './CTA'

import { passGo } from '../actions/game'

const CTAMenu = props => {
    const [selected, setSelected] = useState(null)


    return (
        <div className="absolute bottom-0 left-0 w-full p-4 flex md:flex-col justify-evenly">
            <CTA id="pass" imageSrc="./images/pass.png" confirmText="Pass go?" bgClass="bg-yellow-300" selected={{ get: selected, set: setSelected }} />
            <CTA id="brain" imageSrc="./images/brain.png" confirmText="Analyse the board?" bgClass="bg-green-400" selected={{ get: selected, set: setSelected }} />
            <CTA id="undo" imageSrc="./images/undo.png" confirmText="Undo the last move?" bgClass="bg-red-400" selected={{ get: selected, set: setSelected }} />
        </div>

    )
}


export default CTAMenu