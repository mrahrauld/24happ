import React from 'react'
import './Chronometer.css'
import {getSeconds, getMinutes} from '../../utils.js'
import {minToMillis,secToMillis} from '../../utils.js'
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';
import ChronoDisplay from './ChronoDisplay';

// function ValueLabelComponent(props) {
//     const { children, open, value } = props;
  
//     return (
//       <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//         {children}
//       </Tooltip>
//     );
//   }

class Chronometer extends React.Component {

    constructor(props) {
        super(props);

        //: getInitialState() method
        this.state = {
            running: false,
            text: "Start",
            empty: this.props.chrono === 0 ,
        };
    }

    // handleStartClick = (event) => {
    //     if (!this.state.running) {
    //         this.interval = setInterval(() => {
    //             this.tick();
    //         }, 100)
    //         this.setState({running: true})
    //     }
    // }

    handleStopClick = (event) => {        
        if (this.state.running) {
            clearInterval(this.interval);
            this.props.update_chronos("stop",this.props.b_index,this.props.c_index)
            this.setState({running: false})
        }
    }

    // Arrow fx for binding
    handleStartStopClick = (event) => {       
        if (this.state.running) {
            clearInterval(this.interval);
            this.props.update_chronos("stop",this.props.b_index,this.props.c_index)
            this.setState({running: false})
            return
        }
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100)
            this.props.update_chronos("start",this.props.b_index,this.props.c_index)
            this.setState({running: true, empty : false})
            return
        }
    }
    // Arrow fx for binding
    handleResetClick = (event) => {  
        this.handleStopClick();
        this.props.update_chronos("reset",this.props.b_index,this.props.c_index)
        this.setState({empty : true})
    }
    handleSaveClick = (event) => {  
        this.handleStopClick();
        let chrono = this.props.chrono;
        this.props.saveLap(this.props.c_index)
    }
    tick() {
        // let newchrono = this.props.chrono + 100;
        // this.props.update_chronos(newchrono,this.props.b_index,this.props.c_index);
        this.setState({running: true, empty : false})
    }

    onChangeSliderSec = (event,value) => {
        let newchrono = this.props.getChrono(this.props.b_index,this.props.c_index);
        newchrono = newchrono - secToMillis(getSeconds(newchrono));
        newchrono = newchrono + secToMillis(value);
        this.props.update_chronos(newchrono,this.props.b_index,this.props.c_index);
        this.handleStopClick();
    }
    onChangeSliderMin = (event,value) => {
        let newchrono = this.props.getChrono(this.props.b_index,this.props.c_index)
        newchrono = newchrono - minToMillis(getMinutes(newchrono));
        newchrono = newchrono + minToMillis(value);
        this.props.update_chronos(newchrono,this.props.b_index,this.props.c_index);
        this.handleStopClick();
    }
    render() {
        let run = this.state.running === true;
        let chrono = this.props.getChrono(this.props.b_index,this.props.c_index);
        return (
            <Box className="chronometer" boxShadow={3} borderRadius={10}>
                <div className="sliders">
                    <div className="slider">
                        <Slider
                            // ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            defaultValue={0}
                            max = {20}
                            onChange={this.onChangeSliderMin}
                        />
                    </div>
                    <div className="slider">
                        <Slider
                            // ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            defaultValue={0}
                            max = {59}
                            onChange={this.onChangeSliderSec}
                            height="10%"
                        />
                </div>
                </div>
                <div className="display">
                    {ChronoDisplay(chrono)}
                </div>
                <div className="actions">
                    <IconButton 
                        aria-label="play_pause"
                        onClick={this.handleStartStopClick}
                        color = 'primary'
                        size = "small"
                    >
                        {( run ? <PauseIcon /> : <PlayIcon />)}
                        {/* <PlayArrowIcon /> */}
                    </IconButton>
                    <IconButton 
                        aria-label="reset"
                        onClick={this.handleResetClick}
                        color = 'primary'
                        size = "small"
                        disabled = {this.state.empty}
                    >
                        <StopIcon />
                    </IconButton>
                    <IconButton 
                        aria-label="save"
                        onClick={this.handleSaveClick}
                        color = 'primary'
                        size = "small"
                    >
                        <SaveIcon />
                    </IconButton>
                    {/* <button className={"btn " + ( run ? 'stop' : 'start')}
                        onClick={this.handleStartStopClick}> {this.state.text} </button>
                    */}
{/*                     
                    <button className={"btn reset " + ( chrono>0  ? '' : 'disabled')}
                        onClick={this.handleResetClick}>Reset</button> */}
                </div> 
                {/* <button className={"btn save "}
                    onClick={this.handleSaveClick}>Sauvegarder</button>             */}
            </Box>);
    }
}
export default Chronometer