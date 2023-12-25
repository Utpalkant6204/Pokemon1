import { useEffect, useState } from "react";
import Axios from 'axios'
import Card from "./components/card/Card";
import Modal from "./components/modal/modal";

function App()
{
  const[input,setInput] = useState('');
  const[pokemon,setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    const fetchData = async() => {
      try{
      const response = await Axios.get('https://pokeapi.co/api/v2/pokemon?limit=501&offset=0');
      console.log(response.data.results,"mhello");
      setPokemon(response.data.results);
      }
      catch(error)
      {
        console.log(error);
      }
    }

    fetchData();
  },[])


  const HandleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInput(searchTerm);

    // Filter the pokemon based on the input value
    

    //setFilteredPokemon(filteredResults);
  }

  const filteredResults = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(input)
    );

  const openModal = (poke) => {
    setSelectedPokemon(poke);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return(
    <>
    <nav
      class="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <a
          class="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
          href="#"
          >Pokemon</a
        >
        <div class="ml-5 flex w-[30%] items-center justify-between">
          <input
            type="search"
            class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2" 
            onChange={HandleChange}
          />

          <span
            class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </nav>

    <div className="flex flex-wrap justify-center">
        {filteredResults.map((poke, index) => (
          <Card key={index} name={poke.name} url={poke.url} index={index} onClick={() => openModal(poke)} />
        ))}
        {/* {pokemon.map((poke, index) => (
          <Card key={index} name={poke.name} url ={poke.url} index = {index} onClick={() => openModal(poke)}/>
        ))} */}
    </div>

    {isModalOpen && (
        <Modal pokemon={selectedPokemon} onClose={closeModal} />
      )
    }
    </>
  )
}

export default App;


