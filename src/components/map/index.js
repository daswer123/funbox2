import React from "react";
import {connect} from "react-redux";
import {setWaypoint, addNewWaypoints, setPath, changeWaypointDestination} from "../../actions"
import { GoogleMap, Marker, InfoWindow, useLoadScript} from "@react-google-maps/api";
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import "./map.css"


// Иницируем карту и задаём ей изначальные параметры
const  libraries = ["places"];
const center = {
    lat : 55.773725,
    lng : 38.438944
}

//
const Map = ({
    setWaypoint,currentWaypoint,waypoints,
    addNewWaypoints , setPath, path,changeWaypointDestination}) => {
    
    //Создаём загрузку и проверям загрузку на ошибку
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey : "AIzaSyBKMXwtVcDWplDAb16jNGJ0H2yYoR9Q11k",
        libraries
    });

    const [selected,setSelected] = React.useState("");

    // Если мы кликнули на карту, то в этой области создаётся новый маркер с необходимыми параметрами
    // маркер временный и будет добавлен в общей список в том случае, если пользователь подтвердит свой выбор

    const onMapClick = React.useCallback((event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const latLng = event.latLng;
        const id = Date.now();
        setWaypoint({id,lat,lng,latLng}) // Передаём action в reducer и записываем в state временную метку
    },[]);

    //Обработка событий при перетаскивание маркера
    const onDragMarker = (event,marker) => {
        changeWaypointDestination(event.latLng,marker.id)
    } 


    //Обработка и создание нового маршрута, так же есть проверка на повторение данных, что бы не происходила перерисовка
    const directionsCallback = (res) => {
        if (compareObj(path, res)){
            return

        } else {
            setPath(res)
        }
 }


    //С помощью хука создаём ссылку на карту, а потом привязываем её
    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    },[])

    if (loadError) return <p style={{color : "red"}}>Error Loading map</p>
    if (!isLoaded) return <p>Loading</p>


    //Забераем из всех точек, только их координаты для правильной отрисовки
    const waypointsList = [];
    waypoints.forEach( (elem,key) => {
        if (key === 0 || key === waypoints.length-1){
            return
        }
        return waypointsList.push({
            location : elem.latLng,
            stopover : true
        })
    })


    return <section className="map--wrapper">
        <GoogleMap 
         mapContainerClassName="map"
         zoom={14}
         center={center}
         onLoad={onMapLoad}
         onClick={onMapClick}
         >
            
         <Marker
             key={Math.random()*100+currentWaypoint.id} 
             position={{lat : currentWaypoint.lat, lng: currentWaypoint.lng}}
         />
        {/* Перебираем массив из всех точек и создаём маркеры на карты */}
        {waypoints.map((marker,key) => {
            return <Marker
             onClick={() => setSelected(marker)} 
             key={Math.random()*100} 
             position={{lat : marker.lat, lng: marker.lng}}
             draggable
             label = {{text : `${key+1}`, color : "white"}}
             onDragEnd={(event) => onDragMarker(event,marker)}/>
            })
        }

{/* Если мы нажали на маркер , то будет выведенна информация с его заголовком */}
        {selected ? (
            <InfoWindow
            position={{lat : selected.lat, lng : selected.lng}}
            onCloseClick={() => setSelected(null)}>
                <div>
                    <h3>{selected.title}</h3>
                </div>
            </InfoWindow>
        ) : null}


{/* Формируем маршрут в том случае если у нас на карте больше чем 1 точка */}
        {waypoints.length > 1 ? <DirectionsService
                  // required
                  options={{ 
                    destination: waypoints[waypoints.length-1],
                    origin: waypoints[0],
                    waypoints  :  waypointsList,
                    travelMode: "DRIVING"
                  }}
                  // required
                  callback={directionsCallback}
                /> : ""}


{/* Рендерим полученный от сервера путь до точек */}
            {path !== "" ? <DirectionsRenderer
                  // required
                  directions = {path}
                  options = {{ 
                    directions: path,
                    suppressMarkers : true,
                    preserveViewport : true
                  }}
                /> : ""}
         </GoogleMap>

    </section>
}


const mapStateToProps = (state) => {
    return {
        currentWaypoint : state.currentWaypoint,
        waypoints : state.waypoints,
        path : state.path
    }
}

const mapDispatchToProps = {
    setWaypoint,
    addNewWaypoints,
    setPath,
    changeWaypointDestination
}

export default connect(mapStateToProps,mapDispatchToProps)(Map)




//Не самое лучшее сравнение обьектов, но для данной задачи подойдет 
function compareObj (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
 }