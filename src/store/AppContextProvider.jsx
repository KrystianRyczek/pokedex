import { useState, useEffect } from "react";
import { appContext } from "./appContext";
import {fetchGetDataFunction, fetchGetDataJsonServer} from "../services/fetch.js";

export default function AppContextProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritesPokemonsID, setFavoritesPokemonsID] = useState([]);
  const [sparringPokemons, setSparringPokemons] = useState([])
  const [gameResults, setGameResults] = useState([])
  const [darkMode, setDarkMode,] = useState(null)
  
  useEffect(()=>{  
      if(localStorage.theme==="dark"){
        return setDarkMode( true)
      }
      return setDarkMode( false)     
  },[])

  useEffect(()=>{
    document.documentElement.classList.toggle(
      "dark",
      darkMode || !("theme" in localStorage)
    );
    if(darkMode){
      localStorage.theme = "dark";
    }else{
      localStorage.theme = "light";
    }
    
  },[darkMode])

  const loadPokemonsList = async () => {
      let serverData =[]    
      for (let i = 1; i <= 150; i++) {
          const url =`https://pokeapi.co/api/v2/pokemon/${i}/`
          const msgOnFail= 'Could not fetch card details!'
          const dataRespons = await fetchGetDataFunction({url, msgOnFail})
          const newpokemon={
              id:i.toString(),
              name: dataRespons.name,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`,
              weight: dataRespons.weight,
              height: dataRespons.height,
              baseExperience: dataRespons.base_experience,
              abilities: dataRespons.abilities
          }
        serverData = [...serverData, {...newpokemon,id:+newpokemon.id, win: 0, lose: 0}]
      }
    return serverData
  }
  const loadFavoritesPokemonsList = async () => {
          const url =`http://localhost:8000/favorites`
          const msgOnFail= 'Could not fetch favorites pokemons!'
          const msgOnSucceed= 'Fetch data OK!'
          const favorites = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
      return (favorites)
  }
  const loadCustomPokemonsList = async () => {
          const url =`http://localhost:8000/custom`
          const msgOnFail= 'Could not fetch custom pokemons!'
          const msgOnSucceed= 'Fetch data OK!'
          const custom = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
      return (custom)
  }

  useEffect(()=>{
        (async()=>{
          const apiPokemons = await  loadPokemonsList()
          const customPokemonsRespons = await loadCustomPokemonsList()
          const custompokemons = customPokemonsRespons.serverData.map(item=>({...item, id:+item.id}))
          const filtredPokememons = apiPokemons.filter((pokemon)=>{
                    if(!custompokemons.some((item)=>pokemon.id===item.id))
                        return pokemon
                })
          setPokemonList([...filtredPokememons, ...custompokemons].sort((a, b) => a.id - b.id))
          const favoritesPokemons =await loadFavoritesPokemonsList()
          setFavoritesPokemonsID(favoritesPokemons.serverData)
        })() 
    },[])

  const contextValue = {
                        darkMode, setDarkMode,
                        pokemonList, setPokemonList,
                        favoritesPokemonsID, setFavoritesPokemonsID,
                        sparringPokemons, setSparringPokemons,
                        gameResults, setGameResults,
  };

  return (
    <appContext.Provider value={contextValue}>
      {children}
    </appContext.Provider>
  );
}