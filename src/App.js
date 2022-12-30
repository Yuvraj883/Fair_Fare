import {useRef, useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import "./input.css";
import Nav from "./components/Nav";
import Form from "./components/Form";
import Result from "./components/Result";
mapboxgl.accessToken = 'pk.eyJ1IjoieXV2cmFqMDAxIiwiYSI6ImNsYzlqemRhaTFxOXYzcHA2a3Nid3ZxbzMifQ.CjcPv7HXGfVNugWpahix9Q'
function App() {
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    });
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
  const [from, setFrom] = useState("Janak Puri");
  const [to, setTo] = useState("Tagore Garden");
  const [distance, setDistance] = useState(1);
  const [duration, setDuration] = useState(1);

  //DMA = Distance Matrix API
  const DMAkey = "JuNkCXmB4VXmxBy3rsUkrspPpnYYj";
  const DMAurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${to}&destinations=${to}&departure_time=now&key=${DMAkey}`;

  //WA = Weather API
  const WAkey = "b99b652d448e47e5a48a226c5ed84910";
  const WAurl = `https://api.openweathermap.org/data/2.5/weather?q=meghalaya&appid=${WAkey}`;

  let luggage = false;

  function updateFrom(e) {
    let newFrom = e.target.value;
    setFrom(newFrom);
  }

  function updateTo(e) {
    let newTo = e.target.value;
    setTo(newTo);
  }

  function toggleLuggage() {
    luggage = !luggage;
  }

  function onSubmit(e) {
    e.preventDefault();
    axios.get(DMAurl).then((res) => {
      let d = res?.data?.rows[0]?.elements[0]?.distance?.text;
      let dur = res?.data?.rows[0]?.elements[0]?.duration?.text;
      let durTrf = res?.data?.rows[0]?.elements[0]?.duration_in_traffic.text;
      d = d.split(" ");
      d = d[0];
      setDistance(d);

      dur = dur.split(" ");
      dur = dur[0];
      durTrf = durTrf.split(" ");
      durTrf = durTrf[0];

      setDuration((dur + durTrf) / 2);
      calculatePrice(d);

      setTimeout(function () {
        console.log(distance + " " + duration);
        console.log(res);
      }, 1000);
    });
    axios.get(WAurl).then((response) => {
      console.log(response.data.weather);
    });
  }
  let price = 25;
  function calculatePrice(distance) {
     price = 25;
     let date = new Date();
     let time= date.toLocaleTimeString();
    //  time = time/(1000*60*60*24*365);
     console.log("Date: "+time);

    if (distance <= 2 && !luggage) {
      price = price;
    } else if (distance <= 2 && luggage) {
      price = price + 7.5;

      console.log(price + "2", luggage);
    } else if (distance > 2 && !luggage) {
      price = price + 8 * (distance - 2);
     
    } else if (distance > 2 && luggage) {
      price = price + 8 * (distance - 2) + 7.5;

    }
    let start = new Date();

    
    if(time>="02:00:00 AM" ){
      console.log("greater");
    }
    else{
      console.log("lesser");
    }
  }

  return (
    <div className="App">
      <Nav />
      <Form
        from={from}
        to={to}
        toggleLuggage={toggleLuggage}
        updateFrom={updateFrom}
        updateTo={updateTo}
        onSubmit={onSubmit}
      />
      <div>
<div ref={mapContainer} className="map-container h-[400px]" />
</div>
      <Result
      distance={distance}
      duration={duration}
      price={price}
      />
    </div>
  );
}

export default App;
