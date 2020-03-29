import React from 'react'
import Chronometer from './Chronometer'
import AddScout from './AddScout'
import './BikeOptions.css'
import LastLaps from './LastLaps'
// const chronometer = (b_index,getChrono,update_chronos,c_index,save_lap) => {
//   return (
//     <Chronometer 
//       b_index = {b_index}
//       c_index = {c_index}
//       getChrono = {getChrono}
//       update_chronos = {update_chronos}
//       save_lap = {save_lap}
//     />
//   )
// }

const BikeOptions = ({b_index,getChrono,update_chronos,waitingListAdd,scouts,tours,saveLap}) => (
  <div className = "bikeOptions">
    <LastLaps tours = {tours}/>
    <AddScout waitingListAdd = {waitingListAdd} scouts = {scouts}/>
    {/* {chronometer(b_index,chronos,update_chronos,save_lap,0)}
    {chronometer(b_index,chronos,update_chronos,save_lap,1)} */}
    <Chronometer 
        b_index = {b_index}
        c_index = {0}
        getChrono = {getChrono}
        update_chronos = {update_chronos}
        saveLap = {saveLap}
    />
    <Chronometer 
        b_index = {b_index}
        c_index = {1}
        getChrono = {getChrono}
        update_chronos = {update_chronos}
        saveLap = {saveLap}
    />
  </div>
)

export default BikeOptions

// == Internal helpers ==============================================

export const FAKE_HOF = [
  { id: 2, name: 'Bassaris' , score: '04:35'},
  { id: 1, name: 'Serval', score: '04:35' },
  { id: 0, name: 'Jaguar', score: '04:35'},
]