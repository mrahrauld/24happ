import React from 'react';
import Logo from "../../img/Logo.png";
import Map from "../../img/Parcours.png";
import Clock from 'react-live-clock';
import './PanelMiddle.css';
import Countdown from './Countdown'
import Box from '@material-ui/core/Box';
import Bike from './Bike'
import Opponent from './Opponent'
import {ChronoToString,getRemainingTime} from '../../utils'

// import * as data from './PanelMiddle/TR.json';
import path from './TR1.js';
// const fs = require('fs');

class PanelMiddle extends React.Component {
    constructor(props) {
        super(props);
        this.running = true;
        this.state= {
            opponentsInfos:[
                {index:0, name:"Gemini", number:135, color:"white", meanIndex:0.5, startTime: new Date(), deltaTime:'00:00'},
                {index:1, name:"Alezan", number:32, color:"yellow", meanIndex:0.5, startTime: new Date(), deltaTime:'00:00'},
                {index:2, name:"Bison", number:33, color:"red", meanIndex:0.5, startTime: new Date(), deltaTime:'00:00'},
                {index:3, name:"CBM", number:34, color:"blue", meanIndex:0.5, startTime: new Date(), deltaTime:'00:00'},
            ]
        }
    }
    updateOpponentMeanIndex = (meanIndex, index) => {
        const newOpponentsInfos = this.state.opponentsInfos;
        newOpponentsInfos[index].meanIndex = meanIndex;
        this.setState({opponentsInfos: newOpponentsInfos});
    }
    updateOpponentColor = (color, index) =>{
        const newOpponentsInfos = this.state.opponentsInfos;
        newOpponentsInfos[index].color = color;
        this.setState({opponentsInfos: newOpponentsInfos});
    }
    updateOpponentName = (name, index) =>{
        const newOpponentsInfos = this.state.opponentsInfos;
        newOpponentsInfos[index].name = name;
        this.setState({opponentsInfos: newOpponentsInfos});
    }
    updateOpponentNumber = (number, index) =>{
        const newOpponentsInfos = this.state.opponentsInfos;
        newOpponentsInfos[index].number = number;
        this.setState({opponentsInfos: newOpponentsInfos});
    }
    updateStartTime= (index) =>{

        // set the start time
        const newOpponentsInfos = this.state.opponentsInfos;
        newOpponentsInfos[index].startTime = new Date();
        this.setState({opponentsInfos: newOpponentsInfos});

    }
    updateDeltaTime = (index) => {
        const newOpponentsInfos = this.state.opponentsInfos
        // check if opponent is following a bike
        if (newOpponentsInfos[index].meanIndex===0.5){
            newOpponentsInfos[index].deltaTime = "00:00";
            this.setState({opponentsInfos: newOpponentsInfos})
            return;
        }
        // set the delta time
        let bikeIndex = newOpponentsInfos[index].meanIndex;
        let bikeMean = this.props.bikesInfos[bikeIndex].mean;
        let bikeChrono = this.props.getLastChrono(bikeIndex) % bikeMean;
        let opponentChrono = (new Date() - newOpponentsInfos[index].startTime)  % bikeMean;
        let deltaTime = bikeChrono - opponentChrono;
        if (Math.abs(deltaTime)>bikeMean/2){
            if(deltaTime<0){
                newOpponentsInfos[index].deltaTime = "+" + ChronoToString(deltaTime + bikeMean);
            }else{
                newOpponentsInfos[index].deltaTime = "-" + ChronoToString(deltaTime - bikeMean);
            }
        }
        else{
            if(deltaTime<0){
                newOpponentsInfos[index].deltaTime = "-" + ChronoToString(deltaTime);
            }else{
                newOpponentsInfos[index].deltaTime = "+" + ChronoToString(deltaTime);
            }
        }
        this.setState({opponentsInfos: newOpponentsInfos})
    }
    updateAllDeltaTimes = (index) => {
        this.state.opponentsInfos.map((op) => {
            this.updateDeltaTime(op.index)
        }
    )} 

    getOpponentChrono = (index) =>{
        let time = new Date();
        return time - this.state.opponentsInfos[index].startTime;
    }
    renderBike = (b_index,chrono,color,fontSize) =>{
        if (b_index===0.5){
            return;
        }
        let currmean = this.props.bikesInfos[b_index].mean;
        return (
            <Bike 
                className = 'boxbike'
                chrono= {chrono}
                mean = {currmean}
                color = {color}
                fontSize = {fontSize}
            />
        )
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.updateAllDeltaTimes();
        }, 100)
    }
    render() {
        return (
            <div className="panelMiddle"> 
                <div className = "middleHeader">
                    {/* <p style={{fontSize: '4em', color: 'black'}}> 12:40 </p> */}
                    <Clock format="HH:mm" interval={1000} style={{fontSize: '4em',margin: 0}} ticking={true} />
                    <Countdown endTime={this.props.endTime} />
                </div>
                
                <div className="opponents">
                    {this.state.opponentsInfos.map((op) => {
                        return <Opponent 
                                    opponentInfos = {op} 
                                    updateOpponentMeanIndex = {this.updateOpponentMeanIndex}
                                    updateOpponentColor = {this.updateOpponentColor}
                                    updateOpponentName = {this.updateOpponentName}
                                    updateOpponentNumber = {this.updateOpponentNumber}
                                    updateStartTime = {this.updateStartTime}
                                    getLastChrono = {this.props.getLastChrono}
                                    updateDeltaTime = {this.updateDeltaTime}
                                />;
                    })} 
                </div>
                {/* <img className="logo"
                    src={Logo}>
                </img> */}
                <Box className= "mapdiv" boxShadow={10}>
                    <img className="mapimg"
                        src={Map}>
                    </img>
                    {/* Render the main bikes */}
                    {this.props.bikesInfos.map((bikeInfos,index) => {
                        return this.renderBike(index,this.props.getLastChrono(index),bikeInfos.color,'2.5em')
                    })} 
                    {/* Render the opponent bikes */}
                    {this.state.opponentsInfos.map((opponentInfos,index) => {
                        return this.renderBike(opponentInfos.meanIndex,this.getOpponentChrono(index),opponentInfos.color,'2em')
                    })} 
                </Box>
            </div>  
        );
    }
}
export default PanelMiddle