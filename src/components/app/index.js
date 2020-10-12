import React from "react";
import Map from "../map";
import WaypointSection from "../waypointSection";
import ErrorBoundey from "../errorBoundry"
import "./app.css";

const App = () => {
        return(
            <ErrorBoundey>     
                <WaypointSection/>
                <Map/>
            </ErrorBoundey>
        )
}
export default App