import React from "react";
import WaypointItem from "../waypointItem/";
import {connect} from "react-redux";
import {replaceWaypoints} from "../../actions";
import { DragDropContext,Droppable } from "react-beautiful-dnd";
import "./waypointList.css";

const WayPointList = ({waypoints,replaceWaypoints}) => {
    
    // Как только мы перетащили элемент на новое место, то меняется порядок
    const onDragEnd = (res) => {
        replaceWaypoints({
            id : +res.draggableId,
            indexFrom : res.source.index,
            indexTo : res.destination.index
        })
    }

    // Оборачиваем список в Drag and Drop обёртку
    return (
        <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
            <Droppable droppableId={"waypoints-lists"}>
            {(provided) => {
                return <ul 
                    ref={provided.innerRef}
                    {...provided.droppableProps} 
                    className="waypoints--list">
                    {waypoints.map((point,index) => {
                        return <WaypointItem title={point.title} id={point.id} index={index} key={point.title + point.lat}/>
                    })}
                    {provided.placeholder}
                
            </ul>
            }}
            </Droppable>
        </DragDropContext>
    )
}

const mapStateToProps = (state) => {
    return {
        waypoints : state.waypoints,
    }
}

const mapDispatchToProps  = ({
    replaceWaypoints
})


export default connect(mapStateToProps, mapDispatchToProps)(WayPointList)