import React from 'react';
import './App.css';

import ScreenMain from './ScreenMain/ScreenMain';
import TopMenu from './TopMenu/TopMenu'
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './mui-theme'
import CssBaseline from '@material-ui/core/CssBaseline';
import {Chronometer} from './Classes'
class App extends React.Component {
  constructor(props) {
    super(props);
    let startTime = new Date()
    const scouts= ['Bassaris','Serval','Puma','Souslik','Hovawart','Douc', 'Yearling' , 'Jaguar','Avahi', 'Sifaka','Impala','Siamang', 'Monax', 'Wombat', 'Tamia'].sort();
    const scoutsInfos = {}
    scouts.map(function(val){ 
      // return {name:val, lapCount:0, chronoCount:0}; 
      scoutsInfos[val]= {lapCount: 0, chronoCount: 0, mean: 0}
    }) 
    console.log(scoutsInfos)
    //: getInitialState() method
    // this.state = this.retieveState();
    const Ch = new Chronometer();
    console.log(Ch)
    this.state = {
        tabValue: 0,
        chronometers: [[{startTime:null,chrono:0, lastClickTime:new Date()},{startTime:null,chrono:0, lastClickTime:new Date()}],[{startTime:null,chrono:0, lastClickTime:new Date()},{startTime:null,chrono:0, lastClickTime:new Date()}]],
        // chronometers: {lastRunning: [0,0], chronoLists: [[0,0],[0,0]]},
        endTime: new Date(startTime.getTime() +1000*60*60*24),
        bikesInfos: [{index:0, number:37, color:"white", lapCount:0, chronoCount:0,mean:0},{index:1, number:73, color:"blue", lapCount:0, chronoCount:0,mean:0}],
        scouts: scouts,
        scoutsInfos: scoutsInfos,
        tours: {0: [{id: 0, scout:'Bassaris', chrono:10000, start: new Date()},{id: 1, scout:'Jaguar', chrono:11000, start: new Date()}],
               1: [{id: 0, scout:'Bassaris', chrono:10000, start: new Date()}]},
        next_id: 10
    };
  }
  getChrono = (b_index,c_index) => {
    const ch = this.state.chronometers[b_index][c_index]
    if (ch.startTime===null){
      return ch.chrono
    }else{
      let time = new Date() - ch.startTime
      return time+ch.chrono
    }
  }
  getLastChrono = (b_index) => {
    const ch0 = this.state.chronometers[b_index][0]
    const ch1 = this.state.chronometers[b_index][1]
    var c_index = 0
    if(ch0.lastClickTime<ch1.lastClickTime){c_index = 1}else{c_index = 0}
    return this.getChrono(b_index,c_index);
  }
  update_chronos = (message,b_index,c_index) => {
    let newChronometers = this.state.chronometers
    if (message==="start"){
      newChronometers[b_index][c_index].startTime = new Date();
      newChronometers[b_index][c_index].lastClickTime = new Date();
    } else if (message==="stop"){
      newChronometers[b_index][c_index].chrono = this.getChrono(b_index,c_index)
      newChronometers[b_index][c_index].startTime= null;
      newChronometers[b_index][c_index].lastClickTime = new Date();
    } else if (message==="reset"){
      newChronometers[b_index][c_index].startTime= null;
      newChronometers[b_index][c_index].chrono = 0;
      newChronometers[b_index][c_index].lastClickTime = null;
    } else {
      newChronometers[b_index][c_index].startTime= null;
      newChronometers[b_index][c_index].chrono = message;
    }
    this.setState({chronometers: newChronometers})
  }
  setEndTime = (newStartTime) =>{
    let newEndTime = new Date(newStartTime.getTime() +1000*60*60*24);
    this.setState({endTime: newEndTime});
  }
  updateBikeNumber = (bikeNumber, b_index) =>{
    const newbikesInfos = this.state.bikesInfos;
    newbikesInfos[b_index].number = bikeNumber;
    this.setState({bikesInfos: newbikesInfos});
  }
  updateBikeColor = (color, b_index) =>{
    const newbikesInfos = this.state.bikesInfos;
    newbikesInfos[b_index].color = color;
    this.setState({bikesInfos: newbikesInfos});
  }
  updateBikeCounts(b_index,lap,chrono){
    const newbikesInfos = this.state.bikesInfos;
    newbikesInfos[b_index].lapCount += lap;
    newbikesInfos[b_index].chronoCount += chrono;
    newbikesInfos[b_index].mean = newbikesInfos[b_index].chronoCount / newbikesInfos[b_index].lapCount;
    this.setState({bikesInfos: newbikesInfos});
  }

  saveState = () =>{
    window.localStorage.setItem('state', JSON.stringify(this.state));
  }
  retieveState = () =>{
    var state = JSON.parse(window.localStorage.getItem('state'));
    state.endTime = new Date(state.endTime);
    return state
  }
  update_scouts = (newScouts) => {
    newScouts.sort()
    this.setState({scouts: newScouts})
  }
  updateScoutInfos = (name,lap,chrono) =>{
    const newScoutsInfos = this.state.scoutsInfos
    newScoutsInfos[name].lapCount += lap;
    newScoutsInfos[name].chronoCount += chrono;
    newScoutsInfos[name].mean = this.state.scoutsInfos[name].chronoCount/this.state.scoutsInfos[name].lapCount;
    this.setState({scoutsInfos:newScoutsInfos})
  }
  deleteScout = (name) => {
    //remove of scoutsInfos
    delete this.state.scoutsInfos[name];
    // remove of scouts
    var index = this.state.scouts.indexOf(name);
    if (index !== -1) this.state.scouts.splice(index, 1);
  }
  getScoutInfos = (name) => {
    return this.state.scoutsInfos[name];
  }
  addTour = (b_index, scout,chrono,start) =>{
    let next_id = this.state.next_id;
    const newtours = this.state.tours;
    const tourList = newtours[b_index];
    tourList.push({id: next_id, scout: scout, chrono: chrono, start: start});
    newtours[b_index] = tourList;
    next_id = next_id +1;

    this.updateBikeCounts(b_index,1,chrono);
    this.updateScoutInfos(scout,1,chrono);
    this.setState({tours: newtours , next_id: next_id})
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* to change the base font */}
        <React.Fragment> 
          <CssBaseline /> 
          <div className="app">
              <TopMenu
                scouts = {this.state.scouts}
                update_scouts= {this.update_scouts}
                setEndTime = {this.setEndTime}
                bikesInfos = {this.state.bikesInfos}
                updateBikeNumber = {this.updateBikeNumber}
                updateBikeColor = {this.updateBikeColor}
              />
              <div className="body">
                <ScreenMain 
                  endTime = {this.state.endTime}
                  getChrono= {this.getChrono} 
                  getLastChrono = {this.getLastChrono}
                  update_chronos = {this.update_chronos}
                  scouts = {this.state.scouts}
                  getScoutInfos = {this.getScoutInfos}
                  bikesInfos = {this.state.bikesInfos}
                  tours = {this.state.tours}
                  addTour = {this.addTour}
                />
              </div>
          </div>
        </React.Fragment>
       </ThemeProvider>
    );
  }
}

export default App;
