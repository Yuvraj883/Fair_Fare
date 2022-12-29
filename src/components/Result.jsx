import React from "react";

function Result({distance, duration, price}){
    return(
        <>
        <div className="flex items-center px-8 md:justify-center ">
            <div className="w-[60vh]">
                <img src="https://www.bajajautofinance.com/uploads/vehicles/Picture11.jpg" alt="auto-rickshaw" />
            </div>
            <div >
            <p className="text-lg font-mono antialiased">Distance: {distance}Km</p>
            <p className="text-lg font-mono antialiased">Duration: {duration}min</p>
            <p className="text-lg font-mono antialiased">Weather</p>
            <p className="text-lg font-mono antialiased">Price: &#x20B9;{price}</p>
            </div>
        </div>
        </>
    )
}
export default Result;