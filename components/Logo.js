import React from 'react'

const Logo = props => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
            <g fill="none" stroke="rgba(30,30,30,0.44)" strokeWidth="3">
                <path d="m100 400 300 1M100 300l300 1M100 200l300 1M100 100l300 1" />
            </g>
            <g fill="none" stroke="rgba(30,30,30,0.44)" strokeWidth="3">
                <path d="M400 100v300M300 100v300M200 100v300M100 100v300" />
            </g>
            <circle transform="translate(400 200)" fill="#DCDCDC" r="30" />
            <circle transform="translate(100 400)" fill="#DCDCDC" r="30" />
            <circle transform="translate(300 400)" fill="#DCDCDC" r="30" />
            <circle transform="translate(300 300)" fill="#DCDCDC" r="30" />
            <circle transform="translate(200 300)" fill="#DCDCDC" r="30" />
            <circle transform="translate(100 200)" fill="#323232" r="30" />
            <circle transform="translate(100 300)" fill="#323232" r="30" />
            <circle transform="translate(300 200)" fill="#323232" r="30" />
            <circle transform="translate(300 100)" fill="#323232" r="30" />
            <circle transform="translate(200 200)" fill="#323232" r="30" />
        </svg>

    )
}

export default Logo