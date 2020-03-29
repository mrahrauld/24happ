import React, { Component } from "react";
import './WaitingList.css';
import Row from './Row';
import {DragDropContext,Droppable} from 'react-beautiful-dnd';
import Delete from '@material-ui/icons/Delete';

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };


class WaitingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // next_id : 4,
            // scouts: ["Bass", "Sous", "Serval"],
            // ids: ['1','2','3']
        };
    }
    onDragEnd = result => {
        // const {destination, source, draggableId} = result
        const {destination, source} = result
        // dropped outside the list
        if (!destination) {
          return;
        }
        // dropped at same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const newScouts = Array.from(this.props.wLData.scouts)
        const newIds = Array.from(this.props.wLData.ids)
        const [removedS] = newScouts.splice(source.index, 1);
        const [removedI] = newIds.splice(source.index, 1);
        if (destination.droppableId === "droppable"){
            newScouts.splice(destination.index, 0, removedS);
            newIds.splice(destination.index, 0, removedI);
        }
        const newState = {
            next_id: this.props.wLData.next_id,
            scouts: newScouts,
            ids : newIds
        }
        this.props.updateWLData(newState);
        // this.addScout("Bassaris")
    }

    render() {
        var expectedTime = new Date().getTime();
        return (
            <div className= "waitingList">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className= "dragDropContext">
                        <div className = "scrollContainer" >
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div 
                                        className= "scoutList"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        
                                        {
                                        this.props.wLData.scouts.map((scout, index) => {
                                            const id = this.props.wLData.ids[index]
                                            const {mean}= this.props.getScoutInfos(scout)
                                            if (mean === 0) {expectedTime += this.props.bikeMean}else{expectedTime += mean}
                                            // expectedTime += mean
                                            return <Row key = {id} scout={scout} id={id} index = {index} expectedDate = {new Date(expectedTime)}/>;
                                        })} 
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <Droppable droppableId="delete">
                        {(provided) => (
                                <div 
                                    className= "deleteDroppable"
                                    // innerRef = {provided.innerRef}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Delete color="primary" />
                                    {/* {provided.placeholder} */}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>  
            </div>
        )
  }
}
export default WaitingList