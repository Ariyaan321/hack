import React from 'react'
// import { useLeafletContext } from '@react-leaflet/core'
import { useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'; // Import Leaflet library
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import './App.css'
import LeafletRoutingMachine from './LeafletRoutingMachine';
export default function App() {


    // function Square(props) {

    // const context = useLeafletContext()
    //     useEffect(() => {
    //         const bounds = L.latLng(props.center).toBounds(props.size)
    //         const square = new L.Rectangle(bounds)
    //         const container = context.layerContainer || context.map
    //         container.addLayer(square)

    //         return () => {
    //             container.removeLayer(square)
    //         }
    //     })

    //     return null
    // }
    // const center = [21.146633, 79.088860]


    var city1Ref = useRef();
    const city2Ref = useRef();
    const [routeEnable, setRouteEnable] = useState(false);
    const [mark1, setMark1] = useState(0)
    const [mark2, setMark2] = useState(0)
    let city1Value = ""
    let city2Value = ""
    // var mark1
    // var mark2


    // useEffect(() => {
    //     if (map && !routeControl) {
    //         const routeControl = L.Routing.control({
    //             waypoints: [],
    //             routeWhileDragging: true
    //         });

    //         setRouteControl(routeControl);
    //     }
    // }, [handleFormSubmit]);


    // const LeafletRoutingMachine = (mark1, mark2) => {
    // const map = useMap();
    // let DefaultIcon = L.icon({
    //     iconUrl: '\marcle.gif',
    //     iconSize: [90, 90],
    // });
    // useEffect(() => {
    // var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(
    //     map
    // );
    // map.on("click", function (e) {
    //     L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    //     L.Routing.control({
    //         waypoints: [
    //             L.latLng(36.8065, 10.1815),
    //             L.latLng(e.latlng.lat, e.latlng.lng),
    //         ],
    //         lineOptions: {
    //             styles: [
    //                 {
    //                     color: "blue",
    //                     weight: 4,
    //                     opacity: 0.7,
    //                 },
    //             ],
    //         },
    //         routeWhileDragging: false,
    //         geocoder: L.Control.Geocoder.nominatim(),
    //         addWaypoints: false,
    //         draggableWaypoints: false,
    //         fitSelectedRoutes: true,
    //         showAlternatives: true,
    //     })
    //         L.Routing.control({
    //             waypoints: [
    //                 [mark1, mark2]
    //             ]
    //         }).addTo(map);
    //     }, [mark1, mark2]);

    //     return null;
    // };

    async function handleFormSubmit(e) {
        e.preventDefault()

        city1Value = city1Ref.current.value
        city2Value = city2Ref.current.value
        console.log("city1: ", city1Value)
        console.log("city2: ", city2Value)

        var c1 = await cityCoords(city1Value)
        var c2 = await cityCoords(city2Value)
        console.log("c1: ", c1)
        console.log("c1: ", c1[0])
        setRouteEnable(true)
        setMark1(c1)
        setMark2(c2)
        // console.log("mark1: ", mark1)
        // console.log("mark1: ", mark1[0])
        // setRouteEnable(true)

        // if (!routeControl) {
        //     console.log("here")
        //     const newRouteControl = L.Routing.control({
        //         waypoints: [],
        //         routeWhileDragging: true,
        //     });

        //     setRouteControl(newRouteControl);
        // }

        // if (routeControl) {
        //     routeControl.setWaypoints([mark1, mark2]);
        //     console.log("routeControl: ", routeControl);
        // } else {
        //     console.log("Route control is not defined");
        // }

        // LeafletRoutingMachine(mark1, mark2)
        // L.Routing.control({
        //     waypoints: [
        //         [mark1, mark2]
        //     ]
        // }).addTo(map);
        // console.log("routeControl: ", routeControl)
        // if (routeControl) {
        // L.Routing({
        //     waypoints: [mark1, mark2],
        //     routeWhileDragging: true
        // }).addLayer(map);
        // // routeControl.setWaypoints([])  // remove existing markers
        // routeControl.setWaypoints([mark1, mark2])
        // } else {
        //     console.log("routeControl is not defined")
        // }

    }

    // function changeLoc(e) {
    //     // Changes detected are stored
    //     var waypoints = e.routes[0].waypoints;
    //     var latloc1 = waypoints[0].latLng.lat;
    //     var longloc1 = waypoints[0].latLng.lng;
    //     var latloc2 = waypoints[1].latLng.lat;
    //     var longloc2 = waypoints[1].latLng.lng;
    //     console.log("Latloc1 = " + latloc1 + " Longloc1 = " + longloc1 + " \nLatloc2 = " + latloc2 + " Longloc2 = " + longloc2);
    //     $.ajax({
    //         url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc1}&lon=${longloc1}`,
    //         success: function (result) {
    //             // Extract the desired information from the result
    //             var locationName = result.display_name;

    //             // Update the DOM element with the obtained location information
    //             city1Value.value = locationName;
    //             console.log(city1Value.value);
    //         },
    //         error: function (error) {
    //             console.error("Error in reverse geocoding:", error);
    //         }
    //     });

    //     $.ajax({
    //         url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc2}&lon=${longloc2}`,
    //         success: function (result) {
    //             var locationName = result.display_name;
    //             city2Value.value = locationName;
    //             console.log(city2Value.value);
    //         },
    //         error: function (error) {
    //             console.error("Error in reverse geocoding for city2:", error);
    //         }
    //     });
    // }

    // useEffect(() => {

    //     L.routing.control({
    //         waypoints: [
    //             (mark1[0], mark1[1]),
    //             (mark2[0], mark2[1])
    //         ]
    //     }).addTo(map)

    // }, [mark1, mark2, map])

    async function cityCoords(city) {
        var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + city;

        try {
            console.log("555: in try block citycoords")
            const response = await fetch(url);
            const show = await response.json();
            console.log("5552: after await , before if(show)")

            if (show && show[0]) {
                console.log("666: returning res - ", [show[0].lat, show[0].lon]);
                return [show[0].lat, show[0].lon];
            } else {
                console.log("666: returning res - empty array");
                return [];  // Return an empty array or handle the case when no results are found
            }
        } catch (err) {
            console.log("error at cityCoords fetch(url):\n", err);
            return [];  // Return an empty array or handle the error case accordingly
        }

    }


    return (
        <>
            <div className="app-container">
                <div className="funs">
                    <form className='funs_form' onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            id="city1"
                            placeholder='city1'
                            ref={city1Ref}
                        />
                        <input
                            type="text"
                            id="city2"
                            placeholder='city2'
                            ref={city2Ref}
                        />
                        <button type="submit" id='submit'>Submit</button>
                    </form>
                </div>

                <MapContainer center={[21.146633, 79.088860]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[21.146633, 79.088860]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.

                        </Popup>
                    </Marker>
                    {/* {map && !routeControl && (
                        <RoutingControl setRouteControl={setRouteControl} map={map} />
                    )} */}
                    {routeEnable ? <LeafletRoutingMachine mark1={mark1} mark2={mark2} /> : null}
                </MapContainer >
            </div>
        </>
    )
}

