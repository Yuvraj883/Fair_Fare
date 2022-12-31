import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "./input.css";
import Nav from "./components/Nav";
import Form from "./components/Form";
import Result from "./components/Result";
import Footer from "./components/Footer";
mapboxgl.accessToken =
  "pk.eyJ1IjoieXV2cmFqMDAxIiwiYSI6ImNsYzlqemRhaTFxOXYzcHA2a3Nid3ZxbzMifQ.CjcPv7HXGfVNugWpahix9Q";
function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.0801664);
  const [lat, setLat] = useState(28.639232);
  const [zoom, setZoom] = useState(9);
  const [from, setFrom] = useState("Janak Puri");
  const [to, setTo] = useState("Tagore Garden");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prc, setPrice] = useState(0);

  //DMA = Distance Matrix API
  const DMAkey = "0jUTeaH2h3JJwFWsUvfk3PnzHvY76";
  const DMAurl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${to}&destinations=${from}&departure_time=now&key=${DMAkey}`;

  //WA = Weather API
  const WAkey = "b99b652d448e47e5a48a226c5ed84910";
  const WAurl = `https://api.openweathermap.org/data/2.5/weather?q=meghalaya&appid=${WAkey}`;

  let luggage = false;

  useEffect(() => {
    const successCallback = (position) => {
      setLat(position.coords.latitude); 
      setLng (position.coords.longitude);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  //Getting the user's current location
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
      dur = Number(dur[0]);
      durTrf = durTrf.split(" ");
      durTrf = Number(durTrf[0]);

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
  
  let price=25;
  function calculatePrice(distance) {
    setPrice(25);
    let date = new Date();
    let time = date.toLocaleTimeString();
    //  time = time/(1000*60*60*24*365);
    console.log("Date: " + time);

    if (distance <= 2 && !luggage) {
      setPrice(0);
      setPrice(25);
    } else if (distance <= 2 && luggage) {
      setPrice(0);
      setPrice(25+7.5);

      console.log(price + "2", luggage);
    } else if (distance > 2 && !luggage) {
      let newPrice = price + 8 * (distance - 2);
      setPrice(0);
      setPrice(newPrice);
    } else if (distance > 2 && luggage) {
     let newPrice = price + 8 * (distance - 2) + 7.5;
     setPrice(0);
     setPrice(newPrice);
    }
    let start = new Date();

    if (time >= "02:00:00 AM") {
      console.log("greater");
    } else {
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
        <div ref={mapContainer} className="map-container h-[400px] w-[80%] m-auto m-4" />
      </div>
      <Result distance={distance} duration={duration} price={prc} />
      <Footer />
    </div>
  );
}

export default App;
