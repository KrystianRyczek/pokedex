import { Link } from "react-router"
import { clsx } from "clsx"
import { useArena } from "../../hooks/useArena"

export default function ArenaCard({ pokemon, win }) {
    const { removeBtnClickHandler } = useArena(pokemon)

    const pokemonListItem=clsx("w-full h-12/13 relative my-auto", win===false && "opacity-30 grayscale")
    const pokemonListItemLink = "w-full h-full p-3 flex flex-col justify-center border-3 border-stone-800 rounded-lg shadow-xl/30 bg-linear-to-t from-stone-500 from-5% to-stone-300 dark:from-stone-700 dark:to-stone-500"
    const removeBtn = "w-17 h-17 p-2 text-white ml-auto absolute top-0 right-0"
    const removeIcon ="w-full h-full fill-stone-700"
    const itemScoreStyle = "w-17 absolute top-0 left-0 bg-stone-700 text-stone-100 text-start px-3 rounded-tl-lg rounded-br-lg"
    const pokemonImg= "h-50"
    const pokemonName = "text-2xl capitalize font-bold"
    const pokemonDetalisBox=" w-full flex flex-col"
    const pokemonDetaliRow = "flex w-full justify-between px-5"
    const pokemonAtrBox= "w-32"
    const pokemontArtDesc = "font-bold"

    return (
        <div className={pokemonListItem}>
            { (pokemon.win || pokemon.lose)
                ?<div className={itemScoreStyle}>
                    <p >W: {pokemon.win}</p>
                    <p>L: {pokemon.lose}</p>
                </div>
                :undefined
            }
            <button className={removeBtn} onClick={removeBtnClickHandler}>
                <svg className={removeIcon}>
                    <path 
                        className="scale-250" 
                        d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"
                    />
                </svg>
            </button>
            <div className={pokemonListItemLink}>
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
            </div>
        </div>
    )
}