import { useState } from "react";
function Nav() {
    const [show, setShow]= useState(false);
  return (
    <div className="bg-orange-500  px-4 text-center py-2  mx-auto">
      <div className="flex justify-between">
        <div className="flex">
        <p className="text-center  font-bold text-dark">Jai Bajrang Bali</p>
        <img 
          className="w-8 cursor-pointer right-0"
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/mace-4605670-3803747.png"
          alt="Gada"
        />
        </div>
        <div className="left-0">
        <img onClick={()=>{
            setShow(!show);
        }}
          className="w-8 cursor-pointer right-0"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
          alt="hamburger-icon"
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
