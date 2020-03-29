import React from 'react';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import path from './TR1.js';
import './PanelMiddle.css';


class Bike extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // const {name} = data;
    // }
    getPos = (axe) =>{
        let x = path(0)[axe]*100
        if(this.props.mean!==0){
            x = path(this.props.chrono/this.props.mean)[axe]*100
        }
        return x.toString() + "%"
    }
    render() {
        return (
            <DirectionsBikeIcon
                className= "bike"
                style= {{ 
                    color: this.props.color,
                    fontSize: this.props.fontSize,
                    left: this.getPos(0),
                    top: this.getPos(1)
                }}
            />
        );
    }
}
export default Bike