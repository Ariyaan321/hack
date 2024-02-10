import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap, Marker, Popup, Polygon } from "react-leaflet";

const LeafletRoutingMachine = ({ mark1, mark2 }) => {
    const map = useMap();
    const routingControlRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [polygonPositions, setPolyPosition] = useState([]);
    let markerId = 0;
    useEffect(() => {
        const updateRouting = async () => {
            if (routingControlRef.current != null) {
                try {
                    map.removeControl(routingControlRef.current);
                } catch (error) {
                    console.error("Error removing control:", error);
                } finally {
                    routingControlRef.current = null;
                }
            }

            try {
                const routingControl = L.routing
                    .control({
                        waypoints: [
                            L.latLng(mark1[0], mark1[1]),
                            L.latLng(mark2[0], mark2[1]),
                        ],
                    })
                    .addTo(map);

                routingControlRef.current = routingControl;

                // Attach the 'routesfound' event listener to the routing control
                routingControl.on("routesfound", handleRoutesFound);
            } catch (error) {
                console.error("Error adding control:", error);
            }

            // Add the event listener for the 'click' event
            map.on("click", handleMapClick);
        };

        updateRouting();

        return () => {
            if (routingControlRef.current) {
                try {
                    map.removeControl(routingControlRef.current);
                    // Remove the event listener for the 'click' event
                    map.off("click", handleMapClick);
                } catch (error) {
                    console.error("Error removing control:", error);
                } finally {
                    routingControlRef.current = null;
                }
            }
        };
    }, [mark1, mark2, map]);

    // Event handler for the 'routesfound' event
    const handleRoutesFound = (e) => {
        const waypoints = e.routes[0].waypoints;
        const latloc1 = waypoints[0].latLng.lat;
        const longloc1 = waypoints[0].latLng.lng;
        const latloc2 = waypoints[1].latLng.lat;
        const longloc2 = waypoints[1].latLng.lng;

        // Call the changeLoc function passing the event object
        changeLoc({
            routes: [
                {
                    waypoints: [
                        { latLng: { lat: latloc1, lng: longloc1 } },
                        { latLng: { lat: latloc2, lng: longloc2 } },
                    ],
                },
            ],
        });
    };

    // Function to handle location changes
    const changeLoc = (e) => {
        var waypoints = e.routes[0].waypoints;
        var latloc1 = waypoints[0].latLng.lat;
        var longloc1 = waypoints[0].latLng.lng;
        var latloc2 = waypoints[1].latLng.lat;
        var longloc2 = waypoints[1].latLng.lng;

        // Reverse geocoding for city1
        reverseGeocode(latloc1, longloc1, "city1");

        // Reverse geocoding for city2
        reverseGeocode(latloc2, longloc2, "city2");
    };

    // Reverse geocoding function
    const reverseGeocode = async (lat, lon, targetInputId) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            const locationName = data.display_name;

            // Update the DOM element with the obtained location information
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.value = locationName;
                console.log(`${targetInputId} : ${locationName}`);
            } else {
                console.error("Error: DOM element with id ${ targetInputId } not found.");
            }
        } catch (error) {
            console.error("Error in reverse geocoding for ${ targetInputId }:", error);
        }
    };

    const handleMapClick = (e) => {
        // Get the coordinates where the user clicked
        const { lat, lng } = e.latlng;
        const newpoint = [lat, lng];
        // Create a new marker element
        const newMarker = (
            <Marker key={markerId++} position={[lat, lng]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        );
        // Update the markers state to include the new marker
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        setPolyPosition((polygonPositions) => [...polygonPositions, newpoint]);
        reverseGeocode(lat, lng, "city3");
    };
    // if (markers.length > 2) {
    //     return (
    //         <Polygon
    //             positions={polygonPositions}
    //             color="blue"
    //             fillColor="blue"
    //             fillOpacity={0.5}
    //         />
    //     );
    // }
    return <>{markers}</>; // Render the markers
};

export default LeafletRoutingMachine;