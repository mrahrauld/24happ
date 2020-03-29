import React, { Component } from "react";
import {Draggable} from 'react-beautiful-dnd';
import Box from '@material-ui/core/Box';
// import dateToHoursDisplay from '../../utils'
import './Row.css';

class Row extends Component {
    render(){
        return (
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {(provided) => (
                    <Box 
                        boxShadow={1} 
                        borderRadius={2}
                        className = "row"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div > {this.props.index+1} </div>
                        <div > {this.props.scout} </div>
                        <div > {this.props.expectedDate.getHours()+"h"+this.props.expectedDate.getMinutes()} </div>
                    </Box>
                )}
            </Draggable>
        )
    }
}
export default Row