import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { attemptMove, setFocusPoint } from '../actions/game'

const Liberty = props => {
    const {i} = {...props}
    const dispatch = useDispatch()
    const boardSize = useSelector(state => state.game.boardSize)
    const toPlay = useSelector(state => state.game.toPlay)
    const status = useSelector(state =>state.game.board[i])
    const focusPoint = useSelector(state => state.game.focusPoint)
    const row = Math.floor((i)/boardSize)
    const [confirmMove, setConfirmMove] = useState(false)
    const [hoverClass, setHoverClass] = useState('hover:bg-gray-100')
    const [backgroundClass, setBackgroundClass] = useState(status === 'o' ? 'bg-gray-100' : status === 'x' ? 'bg-gray-700' : '')

    const handleClick = () => {
        if(status === '.'){
            if(focusPoint !== i){
                dispatch(setFocusPoint(i))
                console.log(i, i / boardSize)
                setConfirmMove(true)
                return;
            }else{
                dispatch(attemptMove(i))
                setConfirmMove(false)
            }
        }
    }

    useEffect(() => {
        if(status === '.'){
            setHoverClass(
                toPlay === 'white' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
            )
        }
    },[toPlay])

    useEffect(() => {
        setBackgroundClass(
            status === 'o' ? 'bg-gray-100' : status === 'x' ? 'bg-gray-700' : ''
        )
    }, [status])

    useEffect(() => {
        if(status === "."){
            if(focusPoint == i){
                setBackgroundClass(
                    toPlay === 'white' ? 'bg-gray-100' : 'bg-gray-700'
                )
            }else{
                setBackgroundClass('')
            }
        }
    }, [focusPoint])

    

    return (
        <div 
            key={i} 
            id={i} 
            className={`min-w-12 min-h-12 h-12 w-12 absolute rounded-full absolute z-20 ${hoverClass} ${backgroundClass}`} 
            style={{
                opacity: confirmMove ? 0.3 : status === '.' ? 0.25 : 1,
                left: `calc(${Math.floor((i%boardSize)/(boardSize-1)*100)}% - 1.5rem)`, 
                top: `calc(${Math.floor(row/(boardSize-1)*100)}% - 1.5rem)`
            }}
            onClick={handleClick}
        >
            {/* {i} */}
        </div> 

    )
}


export default Liberty