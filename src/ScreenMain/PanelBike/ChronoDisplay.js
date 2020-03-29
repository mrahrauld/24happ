import React from 'react'
import {getDecis, getSeconds, getMinutes} from '../../utils.js'
import {zeroPad} from '../../utils.js'

import './ChronoDisplay.css'

const ChronoDisplay = (chrono) => {
    return (
        <div className="segments">
            <span className="mins">{zeroPad(getMinutes(chrono))}:</span> 
            <span className="secs">{zeroPad(getSeconds(chrono))} </span> 
            <span className="decis">.{getDecis(chrono)}</span>
        </div>
    )
}


export default ChronoDisplay