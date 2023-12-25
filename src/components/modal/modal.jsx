// components/modal/Modal.jsx
import React, { useEffect, useState } from 'react';
import './modal.css';
import Axios from 'axios';

const Modal = ({ pokemon, onClose }) => {
  const [stats,setStats] = useState([]);
  
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await Axios.get(pokemon.url);
        setStats(response.data.stats);
        console.log(response.data, "card");

      }
      catch(error)
      {
        console.log(error);
      }
    }

    fetchData();
  },[])

  console.log(stats);

  return (
    <div className="modal-overlay">
      <div className="relative modal-content flex flex-col justify-center">
        <h5
          className="text-xl font-medium leading-normal text-center text-neutral-800 dark:text-neutral-200 mb-4"
          id="exampleModalCenterTitle"
        >
          {pokemon.name}
        </h5>
        <div>
          <div className='flex flex-col gap-3'>
            {['Speed', 'Special Defence', 'Special Attack', 'Defence', 'Attack', 'Hp'].map((stat, index) => (
              <div key={index} className='flex items-center  justify-between'>
                <div className='w-[20%] text-lg font-bold text-gray-400'>{stat}</div>
                {/* <div>{pokemon.stats[stat.toLowerCase()]}</div> */}
                {stats.length >0 && <div className='flex font-semibold'>{stats[index].base_stat}</div>}
                {stats.length >0 && <div className="rounded-md h-5 w-[50%] bg-neutral-200">
                  <div
                    className={` rounded-md h-5 ${index % 2 === 0 ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${(stats[index].base_stat / 180) * 100}%` }}
                  ></div>
                </div>}
              </div>
            ))}
          </div>
        </div>
        <button className=' absolute top-2 right-2 ' onClick={onClose}>
          <svg className="w-7 h-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
