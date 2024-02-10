// this is in ar
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'; // Import Leaflet library
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import './App.css'
import LeafletRoutingMachine from './LeafletRoutingMachine';

export default function App() {

    var city1Ref = useRef();
    const city2Ref = useRef();
    const [mark1, setMark1] = useState(0)
    const [mark2, setMark2] = useState(0)
    const [revgeomarker, setRevgeomarker] = useState(0)
    let city1Value = ""
    let city2Value = ""

    async function handleFormSubmit(e) {
        e.preventDefault()

        city1Value = city1Ref.current.value
        city2Value = city2Ref.current.value
        revgeomarker = revgeomarker
        console.log("city1: ", city1Value)
        console.log("city2: ", city2Value)

        var c1 = await cityCoords(city1Value)
        var c2 = await cityCoords(city2Value)
        console.log("c1: ", c1)
        console.log("c1: ", c1[0])
        setMark1(c1)
        setMark2(c2)
        setRevgeomarker()
    }

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
                    <Marker position={[0, 0]} ref={revgeomarker} id="markerClick">
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.

                        </Popup>
                    </Marker>

                    <LeafletRoutingMachine mark1={mark1} mark2={mark2} markc={/>

                </MapContainer >
            </div>
        </>
    )
}