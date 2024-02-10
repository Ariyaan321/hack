import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap, Marker, Popup, Polygon } from "react-leaflet";


const Polygony = () => {
    console.log("In Poly")
    const [polygonPositions, setPolygonPositions] = useState([])
    const map = useMap();

    useEffect(() => {
        console.log("In Polygony")
        const addMark = (e) => {
            setPolygonPositions([...polygonPositions, [e.latlng.lat, e.latlng.lng]]);
        };

        map.on('click', addMark);

        return () => {
            map.off('click', addMark);
        };
    }, [polygonPositions, map]);

    return (
        <>
            <Polygon
                positions={polygonPositions}
                color="blue"
                fillColor="blue"
                fillOpacity={0.5}
                draggable={true}
            />

        </>
    );
}

export default Polygony;