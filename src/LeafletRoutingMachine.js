// this is in ar
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ mark1, mark2, markc }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

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
        };

        updateRouting();

        map.on('click', handleMapClick)



        // Get the coordinates where the user clicked
        // console.log("Hello")
        // const { lat, lng } = e.latlng;
        // reverseGeocode(lat, lng)
        // Perform reverse-geocoding using Nominatim
        /* const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
 
 
         const revGeo = async (lat, lng) => {
             const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
 
             try {
                 const response = await fetch(url);
 
                 if (!response.ok) {
                     throw new Error(`HTTP error! Status: ${response.status}`);
                 }
 
                 const data = await response.json();
                 console.log('Location:', data.display_name);
 
                 // If you want to display on the webpage, you can use the following code
                 // const coordinateDiv = document.getElementById('coordinate');
                 // coordinateDiv.innerHTML = `Location: ${data.display_name}`;
             } catch (error) {
                 console.error('Error:', error);
             }
         };
 
 
         /* fetch(url)
              .then(response => response.json())
              .then(data => {
                  // Display the location information on the console
                  console.log('Location:', data.display_name);
 
                  // If you want to display on the webpage, you can use the following code
                  // const coordinateDiv = document.getElementById('coordinate');
                  // coordinateDiv.innerHTML = `Location: ${data.display_name}`;
              })
              .catch(error => console.error('Error:', error));
             */


        // });




        return () => {
            map.off('click', handleMapClick);
            if (routingControlRef.current) {
                try {
                    map.removeControl(routingControlRef.current);
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

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng)
    }

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
            if (targetInputId == undefined) {
                targetInputId = "city1"
            }
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            const locationName = data.display_name;

            console.log("MarkerClick: ", markerClick)

            // Update the DOM element with the obtained location information
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.value = locationName;
                console.log(targetInputId + " : " + locationName);
            } else {
                console.error(`Error: DOM element with id ${targetInputId} not found.`);
            }
        } catch (error) {
            console.error(`Error in reverse geocoding for ${targetInputId}:`, error);
        }
    };

    return null; // Return null as the LeafletRoutingMachine component doesn't render anything
};

export default LeafletRoutingMachine;