import React from 'react';
import PanelMiddle from './PanelMiddle/PanelMiddle';
import PanelBike from './PanelBike/PanelBike';

import './ScreenMain.css';


function ScreenMain({endTime,getChrono,getLastChrono,update_chronos,scouts,getScoutInfos,bikesInfos,tours,addTour}) {
    const panekBike = (b_index,leftSide) => {
        return(
            <PanelBike
                scouts = {scouts}
                getScoutInfos = {getScoutInfos}
                getChrono = {getChrono} 
                update_chronos = {update_chronos}
                bikeInfos = {bikesInfos[b_index]}
                leftSide = {leftSide}
                tours = {tours[b_index]}
                addTour = {addTour}
                endTime = {endTime}
            />
        )
    }

    return (
    <div className= 'screenMain'>
        {panekBike(0,true)}
        <PanelMiddle 
            endTime = {endTime}
            getLastChrono = {getLastChrono}
            bikesInfos = {bikesInfos}
        />
        {panekBike(1,false)}
    </div>
    )
}

export default ScreenMain