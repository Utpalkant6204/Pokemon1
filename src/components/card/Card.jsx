import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Card({ name, url, index, onClick }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(url);
        setTypes(response.data.types);
        console.log(response.data, "card");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url]);

  const formatIndex = (index) => {
    return index < 10 ? `#00${index}` : index < 100 ? `#0${index}` : `#${index}`;
  };

  return (
    <div className='relative bg-green-500 flex justify-between px-2 py-6 text-white rounded-3xl stroke-green-200 m-5 w-[25%]' onClick={onClick}>
      <div className='w-[60%] px-3 pl-6'>
        <div className=' absolute top-4 right-4 text-2xl text-green-300'>{formatIndex(index + 1)}</div>
        <div className=' flex flex-wrap w-[50%] text-3xl font-bold mb-3'>{name}</div>
        {types.length > 0 && <div className=' font-semibold bg-green-300 w-fit rounded-2xl py-0.5 px-2 my-1'>{types[0].type.name}</div>}
        {types.length > 1 && <div className=' font-semibold bg-green-300 w-fit rounded-2xl py-0.5 px-2'>{types[1].type.name}</div>}
      </div>
      <div className=' w-[35%] mt-3 '>
        <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`} alt="pokemon-img" />
      </div>
    </div>
  );
}
