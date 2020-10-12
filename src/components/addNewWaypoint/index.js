import React from "react";
import {addNewWaypoints} from "../../actions"
import { connect } from "react-redux";
import "./addNeweWaypoint.css";

const AddNewWaypoint = ({currentWaypoint , addNewWaypoints}) => {
    const [waypointTitle, setWaypointTitle] = React.useState("");

    const onInput = (e) =>{
        setWaypointTitle(e.target.value)
    }

    const onAddNewWaypoint = (e) => {
        e.preventDefault();
        
        if(waypointTitle === ""){
            alert("Пожалуйста введите название вашей точки");
            return
        }

        if(!currentWaypoint.lat || !currentWaypoint.lng){
            alert("Пожалуйста выберите точку маршрута, кликнув в любое место на карте");
            return
        }

        const newWaypoint = {...currentWaypoint, title : waypointTitle};
        addNewWaypoints(newWaypoint)

        setWaypointTitle("")
        e.target.reset();

    }

    return (
        <form action="#" className="waypoints--add-form" onSubmit={(e) => onAddNewWaypoint(e)}>
            <input name="waypointTitle" onChange={(e) => onInput(e)} value={waypointTitle} type="text" placeholder="Введите название новой точки"/>
            <button type="submit" className="add-btn">Добавить новую точку на карте</button>
        </form>
    )
}

const mapStateToProps = (state) =>{
    return {
        currentWaypoint : state.currentWaypoint
    }
}

const mapDispatchToProps = ({
    addNewWaypoints
})

export default connect(mapStateToProps,mapDispatchToProps)(AddNewWaypoint);