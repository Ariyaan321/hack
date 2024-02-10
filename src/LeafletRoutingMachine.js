import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import 'leaflet-routing-machine'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet"


const LeafletRoutingMachine = ({ mark1, mark2, citydom }) => {
    const map = useMap();
    console.log("inhere: ", mark1)
    console.log("inhere: ", mark1[0])
    const routingControlRef = useRef(null)
    var routingControl


    async function changeLoc(mark1, mark2) {


        var removeRoutingControl = function () {
            console.log("MMMMMMMMMMMMMMMMMMMMM")
            if (routingControl != null) {
                map.removeControl(routingControl);
                routingControl = null;
            }
        };
        removeRoutingControl()


        // Changes detected are stored
        // var waypoints = e.routes[0].waypoints;
        // var latloc1 = waypoints[0].latLng.lat;
        var latloc1 = mark1[0];
        // var longloc1 = waypoints[0].latLng.lng;
        var longloc1 = mark1[1];
        // var latloc2 = waypoints[1].latLng.lat;
        var latloc2 = mark2[0];
        // var longloc2 = waypoints[1].latLng.lng;
        var longloc2 = mark2[1];
        console.log("Latloc1 = " + latloc1 + " Longloc1 = " + longloc1 + " \nLatloc2 = " + latloc2 + " Longloc2 = " + longloc2);

        var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc1}&lon=${longloc1}`
        try {
            const response = await fetch(url);
            const show = await response.json();
            console.log("in 111 try")

            var locationName = show.display_name;
            console.log("-------------")
            console.log("cit1locloc: ", show)
            console.log("-------------")
            // city1Value.value = locationName;
            // console.log(city1Value.value)

        }
        catch {
            console.log("error in rev-geoco")
        }

        var url2 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc2}&lon=${longloc2}`
        try {
            const response = await fetch(url2);
            const show = await response.json();
            console.log("in 222 try")

            var locationName = show.display_name;
            // city1Value.value = locationName;
            console.log("------------------")
            console.log("city2changloc: ", locationName)
            console.log("------------------")

        }
        catch {
            console.log("error in rev-geoco 2")
        }



        // $.ajax({
        //     url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc1}&lon=${longloc1}`,
        //     success: function (result) {
        //         // Extract the desired information from the result
        //         var locationName = result.display_name;

        //         // Update the DOM element with the obtained location information
        //         city1Value.value = locationName;
        //         console.log(city1Value.value);
        //     },
        //     error: function (error) {
        //         console.error("Error in reverse geocoding:", error);
        //     }
        // });

        // $.ajax({
        //     url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latloc2}&lon=${longloc2}`,
        //     success: function (result) {
        //         var locationName = result.display_name;
        //         city2Value.value = locationName;
        //         console.log(city2Value.value);
        //     },
        //     error: function (error) {
        //         console.error("Error in reverse geocoding for city2:", error);
        //     }
        // });
    }


    useEffect(() => {
        // if (routingControlRef.current) {
        //     routingControlRef.current.setWaypoints([]);
        //     routingControlRef.current.setWaypoints(map);
        // }

        routingControl = L.routing.control({
            waypoints: [
                L.latLng(mark1[0], mark1[1]),
                L.latLng(mark2[0], mark2[1])
            ]
        }).addTo(map)



        routingControlRef.current = routingControl;
        changeLoc(mark1, mark2)
        return () => {
            if (routingControlRef.current) {
                // console.log("rouControl: ", routingControlRef)
                // console.log("rouControl2: ", routingControlRef.current)
                // console.log("rouControl3: ", routingControlRef.current.getPlan())
                routingControlRef.current.getPlan().setWaypoints([]);
            }
        };
        // return () => {
        //     // Cleanup: remove routing control from the map
        //     if (routingControlRef.current) {
        //         map.removeLayer(LeafletRoutingMachine);
        //         routingControlRef.current = null;
        //     }
        // };
    }, [mark1, mark2]);


    return null;
};

export default LeafletRoutingMachine;

// const map = useMap();
// let DefaultIcon = L.icon({
//     iconUrl: "/marche.gif",
//     iconSize: [90, 90],
// });
// useEffect(() => {
//     var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(
//         map
//     );
//     map.on("click", function (e) {
//         L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//         L.Routing.control({
//             waypoints: [
//                 L.latLng(36.8065, 10.1815),
//                 L.latLng(e.latlng.lat, e.latlng.lng),
//             ],
//             lineOptions: {
//                 styles: [
//                     {
//                         color: "blue",
//                         weight: 4,
//                         opacity: 0.7,
//                     },
//                 ],
//             },
//             routeWhileDragging: false,
//             geocoder: L.Control.Geocoder.nominatim(),
//             addWaypoints: false,
//             draggableWaypoints: false,
//             fitSelectedRoutes: true,
//             showAlternatives: true,
//         })
//             .on("routesfound", function (e) {
//                 e.routes[0].coordinates.forEach((c, i) => {
//                     setTimeout(() => {
//                         marker1.setLatLng([c.lat, c.lng]);
//                     }, 1000 * i);
//                 });
//             })
//             .addTo(map);
//     });
// }, []);
// return null;
// };

// export default LeafletRoutingMachine;