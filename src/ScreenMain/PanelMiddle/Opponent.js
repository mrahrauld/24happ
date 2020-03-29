import React from 'react';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';

import Cached from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import OpponentSlider from './OpponentSlider';
import SetBikeColor from '../../SetBikeColor';
import './PanelMiddle.css'

export default function Opponent(props){
    const [deltaTime, setDeltaTime] = React.useState('00:00');
    const setFollowedBike = (event,idx) => {
        console.log(idx)
        props.updateOpponentMeanIndex(idx,props.opponentInfos.index)
    }
    const handleNameChange = event => {
        props.updateOpponentName(event.target.value,props.opponentInfos.index);
    };
    const handleNumberChange = event => {
        props.updateOpponentNumber(event.target.value,props.opponentInfos.index);
    };
    const handleClick = event =>{
        // let chrono = props.getLastChrono(props.opponentInfos.meanIndex);

        props.updateStartTime(props.opponentInfos.index)
        props.updateDeltaTime(props.opponentInfos.index)
    }
    return(
        // <Box className = "opponent" boxShadow={3} borderRadius={10} >
        //     <div className = "flexRow">
        //         <div className = "flexColumn">
        //             <SetBikeColor 
        //                 updateBikeColor = {this.props.updateOpponentColor} 
        //                 b_index = {this.props.opponentInfos.index} 
        //                 color= {this.props.opponentInfos.color}
        //             />
        //             <IconButton color="primary" onClick={this.handleClick}>
        //                 <Cached/>
        //             </IconButton>
        //             <OpponentSlider/>
        //         </div>
        //         <Box className = "flexColumn" width="6em">
        //             <InputBase 
        //                 placeholder="Troupe" 
        //                 onChange={this.handleNameChange}
        //                 value = {this.props.opponentInfos.name}
        //                 inputProps={{ 'aria-label': 'description' }} 
        //                 inputProps={{ style: {textAlign: 'center'} }}
        //             />
        //             <InputBase 
        //                 placeholder="Numéro" 
        //                 onChange={this.handleNumberChange}
        //                 value = {this.props.opponentInfos.number}
        //                 inputProps={{ 'aria-label': 'description' }}
        //                 inputProps={{ style: {textAlign: 'center',fontSize: '1.5em'} }}
        //             />
        //             <div>
        //                 -00:45
        //             </div>
        //         </Box>
        //     </div>
        // </Box>
    <Box className = "opponent" boxShadow={3} borderRadius={10} >
        <div className = "flexColumn">
            <Box className = "flexRow title" boxShadow={3}>
                <InputBase
                    placeholder="Troupe" 
                    onChange={handleNameChange}
                    value = {props.opponentInfos.name}
                    inputProps={{ 'aria-label': 'description' }} 
                    inputProps={{ style: {textAlign: 'center',fontSize: '1.3em'} }}
                />
            </Box>
            <div className = "flexRow">
                <Box width={1/2}>
                    <InputBase
                        placeholder="Numéro" 
                        onChange={handleNumberChange}
                        value = {props.opponentInfos.number}
                        inputProps={{ 'aria-label': 'description' }}
                        inputProps={{ style: {textAlign: 'center',fontSize: '1.7em'} }}
                    />
                </Box>
                <SetBikeColor 
                    updateBikeColor = {props.updateOpponentColor} 
                    b_index = {props.opponentInfos.index} 
                    color= {props.opponentInfos.color}
                />
            </div>
            <div className = "flexRow">
                <IconButton color="primary" onClick={handleClick}>
                    <Cached/>
                </IconButton>
                <div className = "deltaDisplay">
                    {props.opponentInfos.deltaTime}
                </div>
            </div>
            <div className = "flexRow">
                <OpponentSlider handleChange = {setFollowedBike}/>
            </div>
        </div>
    </Box>
    );
}

// export default Opponent