import React from 'react'
import ChronoDisplay from './ChronoDisplay'

import './BikeOptions.css'

function LastLaps({tours}){
    
    // let empty = {id:'',scout:'',chrono:1,start:""}
    // tours.unshift(empty)
    // tours.unshift(empty)
    // lastTours = tours.slice(Math.max(tours.length - 3, 1))
    return (
        <table className="lastLaps">
            <tbody>
                { 
                    tours.slice(Math.max(tours.length - 3, 1)).map(({id, scout, chrono, start}) => (
                        <tr key={id}>
                            <td className="name">{scout}</td>
                            {/* <td className="score">{chrono}</td> */}
                            <td> {ChronoDisplay(chrono)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
export default LastLaps