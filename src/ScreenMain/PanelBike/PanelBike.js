import React from 'react';
// import no_pic from "../../img/no_pic.png";
import no_pic from "../../img/Sifaka.png";
import './PanelBike.css';
import Box from '@material-ui/core/Box';

import WaitingList from './WaitingList';
import BikeOptions from './BikeOptions';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import {ChronoToString,getRemainingTime} from '../../utils'
class PanelBike extends React.Component {
    constructor(props) {
        super(props);
        const n = 0;
        const list = Array.from(Array(n).keys());
        const stringlist = list.map(item => {
            return item.toString();
        })
        this.state = {
            wLData:{
                next_id : n,
                scouts: stringlist,
                ids: stringlist
            },
            imgPath:"/ScoutImages/Sifaka.png"
        };
    }
    updateWLData = (newWLData) =>{
        this.setState({wLData: newWLData});
    }

    waitingListAdd = (name) => {
        const next_id = this.state.wLData.next_id;
        var newScouts = Array.from(this.state.wLData.scouts);
        newScouts.push(name);
        var newIds = Array.from(this.state.wLData.ids);
        newIds.push(next_id.toString());
        const newWLData = {
            next_id: next_id +1,
            scouts: newScouts,
            ids : newIds
        }
        this.updateWLData(newWLData);
    }
    waitingListDeleteFirst = () => {
        var newScouts = Array.from(this.state.wLData.scouts);
        const name = newScouts.shift();
        var newIds = Array.from(this.state.wLData.ids);
        newIds.shift();
        const newWLData = {
            next_id: this.state.wLData.next_id,
            scouts: newScouts,
            ids : newIds
        }
        this.updateWLData(newWLData);
        return name;
    }
    saveLap = (c_index) => {
        const scout = this.waitingListDeleteFirst()
        if (scout !== undefined){
            const b_index = this.props.bikeInfos.index
            this.props.addTour(b_index, scout,this.props.getChrono(b_index,c_index),new Date())
        }
    }

    bikeOptions(){
        return (
            <BikeOptions 
                b_index = {this.props.bikeInfos.index}
                getChrono = {this.props.getChrono}
                update_chronos = {this.props.update_chronos}
                waitingListAdd = {this.waitingListAdd}
                scouts = {this.props.scouts}
                tours = {this.props.tours}
                saveLap = {this.saveLap}
            />
        )
    }
    waitingList(){
        return(
            <WaitingList 
                updateWLData = {this.updateWLData} 
                wLData = {this.state.wLData} 
                getScoutInfos={this.props.getScoutInfos}
                bikeMean = {this.props.bikeInfos.mean}
            />
        )
    }
    render() {
        return (
            <Box className="panelBike" boxShadow={3}> 
                <div className="bikeHeader">
                    <Box className="title" boxShadow={3}>
                        <Box className="bikeNumber">
                                {this.props.bikeInfos.number}
                        </Box>
                        <DirectionsBikeIcon 
                            className= "badge" 
                            style={{
                                fontSize: '3em',
                                color: this.props.bikeInfos.color
                            }} 
                        />
                    </Box>
                    <div className="bikeInfos">
                        <img className="scoutBadge"
                            // src={no_pic}>
                            src={this.state.imgPath}>
                        </img>
                        {/* <DirectionsBikeIcon 
                            className= "badge" 
                            color = "primary" 
                            style={{
                                fontSize: '8em', 
                                shadowColor: 'black',
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                            }} 
                        /> */}
                        <div className="bikeStats">
                            <p> Tours effectués: {this.props.bikeInfos.lapCount}</p>
                            <p> Prévisions : {Math.round(getRemainingTime(this.props.endTime)/this.props.bikeInfos.mean)}</p>
                            <p> Tour Moyen : {ChronoToString(this.props.bikeInfos.mean)}</p>
                        </div>
                    </div>
                </div>
                {this.props.leftSide ? (
                    <div className="bikeLaps">
                        {this.waitingList()}
                        {this.bikeOptions()}
                    </div>
                ) : (
                    <div className="bikeLaps">
                        {this.bikeOptions()}
                        {this.waitingList()}
                    </div>
                )
                }   
            </Box> 
        );
    }
}

export default PanelBike