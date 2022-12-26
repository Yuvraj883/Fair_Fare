import { useState } from "react";
function Nav() {
    const [show, setShow]= useState(true);
  return (
    <div className="bg-orange-500  px-4 text-center py-2  mx-auto">
      <div className="flex justify-between ">
        <div>
        <p className="text-center  font-bold text-white">Jai Bajrang Bali</p>
        </div>
        <div>
        <img onClick={()=>{
            setShow(!show);
        }}
          className="w-8"
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/mace-4605620-3803695.png"
          alt="Gada"
        />
        </div>
      </div>
      {
        show ?   <div  className=" open absolute w-[100vw] h-[50vh] bg-yellow-500 left-0 top-10 ">
        <ul className="">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact Us</li>
        </ul>
      </div>
      : 
      <div  className=" close absolute w-[100vw] h-[50vh] bg-yellow-500 left-0 top-10">
      <ul className="">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact Us</li>
      </ul>
    </div>
      }
    
    </div>
  );
}
export default Nav;
