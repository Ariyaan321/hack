// THIS IS IN testmaster
import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import 'leaflet-routing-machine'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet"


const LeafletRoutingMachine = ({ mark1, mark2 }) => {
    const map = useMap();
    // console.log("inhere: ", mark1)
    // console.log("inhere: ", mark1[0])
    const routingControlRef = useRef(null)
    // var routingControlTemp;
    // var routingControl = null

    useEffect(() => {
        const updateRouting = async () => {
            if (routingControlRef.current != null) {
                try {
                    map.removeControl(routingControlRef.current);
                    // map.removeLayer(routingControlRef.current);
                } catch (error) {
                    console.error("Error removing control:", error);
                } finally {
                    routingControlRef.current = null;
                }
            }

            try {
                const routingControl = L.routing.control({
                    waypoints: [
                        L.latLng(mark1[0], mark1[1]),
                        L.latLng(mark2[0], mark2[1])
                    ]
                }).addTo(map);

                routingControlRef.current = routingControl;
            } catch (error) {
                console.error("Error adding control:", error);
            }
            // changeLoc(mark1, mark2);
        };

        updateRouting();

        return () => {
            if (routingControlRef.current) {
                try {
                    map.removeControl(routingControlRef.current);
                    // map.removeLayer(routingControlRef.current);
                } catch (error) {
                    routingControlRef.current = null;
                } finally {
                    routingControlRef.current = null;
                }
            }
        };
    }, [mark1, mark2, map]);
}

export default LeafletRoutingMachine;