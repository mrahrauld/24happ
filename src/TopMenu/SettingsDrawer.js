import React, {useState} from 'react';
import './Drawers.css';


import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";

import PostAdd from '@material-ui/icons/PostAdd';
import Cached from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import SetBikeColor from '../SetBikeColor';

import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import SetBikeNumber from './SetBikeNumber'

moment.locale("fr");

export default function SettingsDrawer(side,setEndTime,updateBikeNumber,updateBikeColor,bikesInfos){
  const [selectedDate, handleDateChange] = useState(new Date())
  const handleStartSelectClick = () => {
    setEndTime(new Date(selectedDate))

  }
  return(
    <div
      className= "drawer"
      role="presentation"
    >
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}> */}
      <div className="startSelect">
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"fr"}>
          <DateTimePicker label="Changer le départ" value={selectedDate} onChange={handleDateChange} ampm={false} />
        </MuiPickersUtilsProvider>
        {/* <Fab color="primary" onClick={handleSelectClick}>
          <Cached/>
        </Fab> */}
        <IconButton color="primary" onClick={handleStartSelectClick}>
          <Cached/>
        </IconButton>
      </div>
      <div className="settingsBike">
        <SetBikeColor updateBikeColor = {updateBikeColor} b_index = {bikesInfos[0].index} color= {bikesInfos[0].colors}/>
        {SetBikeNumber(updateBikeNumber,bikesInfos[0])}
      </div>
      <div className="settingsBike">
        <SetBikeColor updateBikeColor = {updateBikeColor} b_index = {bikesInfos[1].index} color= {bikesInfos[1].color}/>
        {SetBikeNumber(updateBikeNumber,bikesInfos[1])}
      </div>
    </div>
  )
};


