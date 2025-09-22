import { Link, useLocation } from "react-router"
import { clsx } from "clsx"
import { useAddFavorites } from "../../hooks/useAddFavorites"
export default function PokemonCard({ pokemon}) {
    const location = useLocation()
    const { favorites, favoriteBtnClickHandler } = useAddFavorites(pokemon) 
    const pokemonListItem="w-2xs relative hover:scale-103"
    const pokemonListItemLink = "w-full p-3 flex flex-col justify-center border-3 border-stone-800 rounded-lg shadow-xl/30 bg-linear-to-t from-stone-500 from-5% to-stone-300 dark:from-stone-700 dark:to-stone-500"
    const addToFavoriteBtn = "w-13 h-12 p-2 text-white ml-auto absolute top-0 right-0"
    const favoriteIcon =clsx("w-full h-full stroke-stone-700 stroke-2",!favorites && "fill-transparent", favorites && "fill-stone-700")
    const itemScoreStyle = "w-17 absolute top-0 left-0 bg-stone-700 text-stone-100 text-start px-3 rounded-tl-lg rounded-br-lg"
    const pokemonImg= "h-50"
    const pokemonName = "text-2xl capitalize font-bold "
    const pokemonDetalisBox=" w-full flex flex-col"
    const pokemonDetaliRow = "flex w-full justify-between px-5"
    const pokemonAtrBox= "w-32"
    const pokemontArtDesc = "font-bold"
    
    return (
        <li className={pokemonListItem}>
            { (pokemon.win || pokemon.lose)
                ?<div className={itemScoreStyle}>
                    <p >W: {pokemon.win}</p>
                    <p>L: {pokemon.lose}</p>
                </div>
                :undefined
            }
            <button className={addToFavoriteBtn} onClick={favoriteBtnClickHandler}>
                <svg className={favoriteIcon}>
                    <path 
                        d="M25.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"
                    />
                </svg>
            </button>
            <Link 
                className={pokemonListItemLink} 
                to={`/pokemon/${pokemon.id}`} 
                state={{pathname: location.pathname, action:"view"}}
            >
                <img 
                    className={pokemonImg} 
                    src={pokemon.img} 
                    alt={`${pokemon.name} image`}
                />
                <h2 className={pokemonName}>{pokemon.name}</h2>
                <div className={pokemonDetalisBox}>
                    <div className={pokemonDetaliRow}>
                        <div className={pokemonAtrBox}>
                            <p>{pokemon.height}</p>
                            <p className={pokemontArtDesc}>Height</p>

                        </div>
                        <div className={pokemonAtrBox}>
                            <p>{pokemon.baseExperience}</p>
                            <p className={pokemontArtDesc}>Base experience</p>

                        </div>
                    </div>
                    <div className={pokemonDetaliRow}>
                        <div className={pokemonAtrBox}>
                            <p>{pokemon.weight}</p>
                            <p className={pokemontArtDesc}>Weight</p>

                        </div>
                        <div className={pokemonAtrBox}>
                            <p>{pokemon.abilities[0].ability.name}</p>
                            <p className={pokemontArtDesc}>Ability</p>

                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}