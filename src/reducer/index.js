import { setWaypoint } from "../actions"

const initialState = {
    waypoints : [],
    currentWaypoint : {
        lat : 0,
        lng : 0,
        title : ""
    },
    path : ""
}

function reducer (state = initialState,action){
    switch (action.type){
        case "SET_WAYPOINT":
            const currentWaypoint = action.payload
            return {
                ...state,
                currentWaypoint
            }

        case "ADD_WAYPOINTS":
            let newWaypointsArray = [...state.waypoints, action.payload]
            return {
                ...state,
                waypoints : [...newWaypointsArray],
                currentWaypoint : initialState.currentWaypoint
            }

        case "SET_PATH":
            return {
                ...state,
                path : action.payload
            }

        case "CHANGE_WAYPOINT":
            const {newCord,id} = action.payload;
            const lat = newCord.lat();
            const lng = newCord.lng();

            const index = state.waypoints.findIndex(elem => elem.id === id);
            const newElem = {...state.waypoints[index],lat,lng,latLng : newCord}

            const newwWaypointsArray = [
                ...state.waypoints
            ]

            newwWaypointsArray[index] = newElem

            console.log(newwWaypointsArray)

            return {
                ...state,
                waypoints : newwWaypointsArray
            }

        case "DELETE_WAYPOINT":
            const deletedId = action.payload;

            const deletedIndex = state.waypoints.findIndex(elem => elem.id === deletedId);
            
            return {
                ...state,
                waypoints : [
                    ...state.waypoints.slice(0,deletedIndex),
                    ...state.waypoints.slice(deletedIndex + 1)
                ],
                path : ""
            }

        case "CHANGE_TITLE":
            const editedIndex = state.waypoints.findIndex(elem => elem.id === action.payload.id);
            const editedWaypoint = {...state.waypoints[editedIndex]}

            editedWaypoint.title = action.payload.newTitle;

            return {
                ...state,
                waypoints : [
                    ...state.waypoints.slice(0,editedIndex),
                    editedWaypoint,
                    ...state.waypoints.slice(editedIndex + 1)
                ]
            }

        case "REPLACE_WAYPOINT":

            const {indexFrom,indexTo} = action.payload;

            console.log(indexFrom, indexTo)

            let  newArray = [...state.waypoints];
            let temp = {};

            // Правильная сортировка точек
            if ( indexFrom < indexTo) {  // Сверху вниз
                const editedArray = state.waypoints.slice(indexFrom,indexTo + 1);
                temp = editedArray[0];

                editedArray.shift()
                editedArray.push(temp);

                newArray = [
                    ...state.waypoints.slice(0,indexFrom),
                    ...editedArray,
                    ...state.waypoints.slice(indexTo + 1)
                ]

            } else { // Снизу вверх
                const editedArray = state.waypoints.slice(indexTo,indexFrom + 1);
                temp = editedArray[editedArray.length - 1];

                editedArray.pop();
                editedArray.unshift(temp)

                newArray = [
                    ...state.waypoints.slice(0,indexTo),
                    ...editedArray,
                    ...state.waypoints.slice(indexFrom + 1)
                ]
            }

            return {
                ...state,
                waypoints : [...newArray],
                path : ""
            }
        default:
            return state
    }
}

export default reducer



