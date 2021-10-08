import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const Handicap = props => {
    const {i} = {...props}
    const boardSize = useSelector(state => state.game.boardSize)
    const row = Math.floor((i)/boardSize)
    
    useEffect(() => {

    },[])

    return (
        <div key={`h${i}`} id={`h${i}`} className="min-w-2 min-h-2 h-2 w-2 absolute rounded-full bg-gray-800 absolute z-10" 
        style={{
            left: `calc(${Math.floor((i%boardSize)/(boardSize-1)*100)}% - 0.25rem)`, 
            top: `calc(${Math.floor(row/(boardSize-1)*100)}% - 0.25rem)`
        }}/>

    )
}


export default Handicap