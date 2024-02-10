// import React from 'react';
// import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


// export default function Map() {
//     return (
//         <MapContainer center={[21.146633, 79.088860]} zoom={13} scrollWheelZoom={true}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={[21.146633, 79.088860]}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.

//                 </Popup>
//             </Marker>
//             {routeControl && routeControl.addLayer(map)}
//             <Square center={center} size={1000} />

//         </MapContainer >
//     )
// }