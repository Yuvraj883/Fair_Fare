import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
function Form() {
    const [from, setFrom] = useState("Janak Puri");
    const [to, setTo] = useState("Tagore Garden");
    const key = 'JuNkCXmB4VXmxBy3rsUkrspPpnYYj';
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${from}&destinations=${to}&departure_time=now&key=JuNkCXmB4VXmxBy3rsUkrspPpnYYj`; 
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
        axios.get(url).then((res)=>{
            let d = res?.data?.rows[0]?.elements[0]?.distance.text;
            d = d.split(" ");
            d = d[0];
            calculatePrice(d);
        })
    }

    function calculatePrice(d){
    let price = 25;

        if(d<=2 && !luggage){
            console.log(price, luggage);
        }
        else if(d<=2 && luggage){
           price = price+7.50;
            
            console.log(price+"2",luggage);

        }
        else if(d>2 && !luggage){
           price = price + (8*(d-2))
            console.log(price);
            console.log(price+" 3",luggage);

        }
        else if(d>2 && luggage){
            price = price + (8*(d-2)) +7.5;

            console.log(price+"4");
        }
    }



  return (
    <>
      <form>
        <div className="w-full items-center flex flex-col justify-center my-4">
          <input
            value = {from} onChange={updateFrom}
            className="block border-2 border-black h-10 w-64 p-2"
            placeholder="Pick up location"
          />
          <br />
          <input
            value ={to} onChange={updateTo}
            className="border-2 border-black h-10 w-64 p-2"
            placeholder="Drop location"
          />
          <br />
          <div className="flex">
            <label className="mx-2">Luggage: </label>
            <input onClick={toggleLuggage} type="checkbox" />
          </div>
          <button
          onClick={onSubmit}
            className="bg-green-500 cursor-pointer px-4 py-2 text-white font-bold w-64 my-2"
            type="submit"
          >
            Search
            <img src="https://cdn-icons-png.flaticon.com/512/1183/1183845.png"
            className="inline w-6 mx-2 font-size text-xs"/>
          </button>
        </div>
      </form>

    </>
  );
}
export default Form;
