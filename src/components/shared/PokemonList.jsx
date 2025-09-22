import { usePokemonList } from "../../hooks/usePokemonList"
import PokemonCard from "./PokemonCard"

export default function PokemontList ({filter}){

    const { currentIndex, 
            pokemonsArrayLength, 
            clickPrevBtnHandler, 
            clickNextBtnHandler, 
            pokemonsArraySlice
    } = usePokemonList({ filter })

    
    const pokemonListStyle = "w-full flex flex-wrap gap-5 justify-center mb-10"
    const paginationBtnBoxStyle = 'flex gap-5 justify-center'
    const paginationBtnStyle = "w-35 h-15 mb-20 text-stone-800 border-2 border-stone-700 bg-stone-400 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer disabled:hover:bg-stone-400 disabled:hover:text-stone-800 disabled:cursor-default"
    
    return(
<>
            <ul className={pokemonListStyle}>
            {pokemonsArraySlice.map((pokemon) => 
                <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon}
                />)
            }
            </ul>
            <div className={paginationBtnBoxStyle}>
                <button
                    className={paginationBtnStyle}  
                    onClick={clickPrevBtnHandler} 
                    disabled={filter === "" 
                        ? currentIndex.rowData === 0 
                        : currentIndex.filtredData === 0}
                >
                    Prev
                </button>
                <button
                    className={paginationBtnStyle} 
                    onClick={clickNextBtnHandler} 
                    disabled={filter === ""
                        ? currentIndex.rowData >= pokemonsArrayLength
                        : currentIndex.filtredData >= pokemonsArrayLength
                    }
                >
                    Next
                </button>
            </div>
</>

    )
}