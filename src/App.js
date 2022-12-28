import { useState } from "react";
import axios from 'axios';
import './input.css'
import Nav from './components/Nav'
import Form from './components/Form'
function App() {
  const [from, setFrom] = useState("Janak Puri");
  const [to, setTo] = useState("Tagore Garden");
  //DMA = Distance Matrix API
  const DMAkey = 'JuNkCXmB4VXmxBy3rsUkrspPpnYYj';
  const DMAurl =`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${to}&destinations=${to}&departure_time=now&key=JuNkCXmB4VXmxBy3rsUkrspPpnYYj`; 

  //WA = Weather API
  const WAkey = 'b99b652d448e47e5a48a226c5ed84910'; 
  const WAurl = `https://api.openweathermap.org/data/2.5/weather?q=meghalaya&appid=${WAkey}`;

  let luggage = false;
  
 function updateFrom(e){
     let newFrom = e.target.value;
     setFrom(newFrom); 
  }

 function updateTo(e){
      let newTo = e.target.value; 
      setTo(newTo); 
  }

  function toggleLuggage(){
      luggage = !luggage
  }

  function onSubmit(e){
      e.preventDefault();
      axios.get(DMAurl).then((res)=>{
          let distance = 5;
          console.log(res?.data?.rows[0]?.elements[0]?.distance);
          distance = distance.split(" ");
          distance = distance[0];
          calculatePrice(distance);
      })
      axios.get(WAurl).then(response=>{
          console.log(response.data.weather); 
      })
  }

  function calculatePrice(distance){
  let price = 25;

      if(distance<=2 && !luggage){
          console.log(price, luggage);
      }
      else if(distance<=2 && luggage){
         price = price+7.50;
          
          console.log(price+"2",luggage);

      }
      else if(distance>2 && !luggage){
         price = price + (8*(distance-2))
          console.log(price);
          console.log(price+" 3",luggage);

      }
      else if(distance>2 && luggage){
          price = price + (8*(distance-2)) +7.5;

          console.log(price+"4");
      }
  }


  return (
    <div className="App">
    <Nav/>
    <Form 
    from={from} to={to} toggleLuggage={toggleLuggage} updateFrom={updateFrom} updateTo={updateTo} onSubmit={onSubmit} />
    </div>
  );
}

export default App;
