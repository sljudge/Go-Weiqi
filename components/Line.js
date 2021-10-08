import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const Line = props => {
    const {i,direction, spaceIncrement} = {...props}
    const identifier = direction === "horizontal" ? `X${i}` : `Y${i}`
    const boardSize = useSelector(state => state.game.boardSize)
    const focusPoint = useSelector(state => state.game.focusPoint)
    const [isHighlighting, setIsHighlighting] = useState(false)
    
    useEffect(() => {
        if(focusPoint !== null){
            if(direction === 'vertical' && focusPoint%boardSize == i){
                setIsHighlighting(true)
            }else if(direction === 'horizontal' && Math.floor(focusPoint / boardSize) == i){
                setIsHighlighting(true)
            } else{
                setIsHighlighting(false)
            }
        }else{
            setIsHighlighting(false)
        }
    },[focusPoint])

    return (
        <div 
            key={identifier} 
            id={identifier} 
            className={`absolute ${isHighlighting ? 'bg-green-500 border-gray-200 border-2 shadow-2xl' : 'bg-gray-500'} ${direction === "horizontal" ? 'w-full' : 'h-full'}`} 
            style={{
                top: direction === 'horizontal' ? spaceIncrement : 0,
                left: direction === 'vertical' ? spaceIncrement : 0,
                height: direction === 'horizontal' ? '1px' : '',
                width: direction === 'vertical' ? '1px' : ''
            }} 
        />
    )
}


export default Line