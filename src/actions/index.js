function setWaypoint(waypoint){
    return {
        type : "SET_WAYPOINT",
        payload : waypoint
    }
}

function addNewWaypoints(waypoint){
    return {
        type : "ADD_WAYPOINTS",
        payload : waypoint
    }
}

function setPath(response){
    return {
        type : "SET_PATH",
        payload : response
    }
}

function changeWaypointDestination(newCord,id){
    return {
        type : "CHANGE_WAYPOINT",
        payload : {newCord,id}
    }
}

function deleteWaypoint(id){
    return {
        type : "DELETE_WAYPOINT",
        payload: id
    }
}

function changeTitle(id,newTitle){
    return {
        type : "CHANGE_TITLE",
        payload : {id , newTitle}
    }
}

function replaceWaypoints(id){
    return {
        type : "REPLACE_WAYPOINT",
        payload : {...id}
    }
}

export {
    setWaypoint,
    addNewWaypoints,
    setPath,
    changeWaypointDestination,
    deleteWaypoint,
    changeTitle,
    replaceWaypoints
}