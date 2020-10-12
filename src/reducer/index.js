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
            // Меняем местами тот элемент который мы взяли на тот, на который мы навились элементом. Не густо конечно же , но по тз всё ок
            const temp = {...state.waypoints[indexFrom]}
            const newReplacedArray = [...state.waypoints];

            newReplacedArray[indexFrom] = {...newReplacedArray[indexTo]};
            newReplacedArray[indexTo] = temp;


            return {
                ...state,
                waypoints : [...newReplacedArray],
                path : ""
            }
        default:
            return state
    }
}

export default reducer



