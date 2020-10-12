import React from "react";
import AddNewWaypoint from "../addNewWaypoint"
import AppHeader from "../appHeader";
import WaypointList from "../waypointsList"
import "./waypointSection.css";

const WaypointSection = () => {
    return (
    <section className="waypoints">
        <AppHeader/>
        <WaypointList/>
        <AddNewWaypoint/>    
    </section>
    )
}

export default WaypointSection