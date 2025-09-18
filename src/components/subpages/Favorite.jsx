import PokemonCard from "../shared/PokemonCard"
import { useContext } from "react"
import { appContext } from "../../store/appContext"

export default function Favorite(){

    const {pokemonList, favoritesPokemonsID} = useContext(appContext)

    const favoritesPokemonsList = pokemonList.filter((pokemon)=>{
                    if(favoritesPokemonsID.some((item)=>pokemon.id===+item.id))
                        return pokemon
                })
  


    
    const pokemonListStyle = "w-full flex flex-wrap gap-5 justify-center my-27"
    const msgBoxStyle = "my-20"
    const msgStyle = "w-full text-center text-2xl"
    return (
        <>
        {!pokemonList.length
            ? <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            : <>
                {favoritesPokemonsList.length===0 && 
                    <div className={msgBoxStyle}>
                        <p className={msgStyle}>
                            Upss...
                        </p>
                        <p className={msgStyle}>
                            Your favorite list is empty.
                        </p>
                    </div>
                }

                {favoritesPokemonsList.length!==0 &&
                    <ul className={pokemonListStyle}>
                        {favoritesPokemonsList.map((pokemon) => 
                            <PokemonCard 
                                key={pokemon.name} 
                                pokemon={pokemon} 
                                favorites={true}
                            />)
                        }
                    </ul>
                }
            </>
        }
        </>
    )
}
