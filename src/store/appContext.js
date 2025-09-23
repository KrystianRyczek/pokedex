import { createContext } from "react";


const init={
            darkMode:false, 
            setDarkMode:()=>{},
            pokemonList:[], 
            setPokemonList:()=>{},
            favoritesPokemonsID:[], 
            setFavoritesPokemonsID:()=>{},
            sparringPokemons:[], 
            setSparringPokemons:()=>{},
            gameResults:[], 
            setGameResults:()=>{},
            editedPokemons:[], 
            setEditedPokemons:()=>{},
            newPokemons:[], 
            setNewPokemons:()=>{},
  };


export const appContext = createContext(init)