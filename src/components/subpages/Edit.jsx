import { Link, useLocation} from "react-router";
import { useContext } from "react";
import { appContext } from "../../store/appContext";

export default function Edit(){
    const location = useLocation()
    const {pokemonList}= useContext(appContext)

    const editLinkStyle ="md:w-100 w-3xs h-13 mx-auto md:my-15 my-5"
    const pokemonListStyle = "md:w-100 w-3xs mx-auto"
    const pokemonListItemStyle = "w-full h-15 flex place-content-between my-2 border-b border-stone-700"
    const pokemonListItemIdStyle = "my-auto dm:w-10 dm:text-2xl text-xl text-end mr-2"
    const pokemonListItemImgStyle = "md:w-15 w-10"
    const pokemonListItemNameStyle = "my-auto w-30 dm:text-2xl text-xl text-start capitalize"
    const addBtnStyle = "w-full h-full dm:text-2xl text-xl border-2 border-stone-700 bg-stone-400 dark:bg-stone-600 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer"
    const editBtnStyle = "md:w-15 w-12 my-auto dm:text-2xl text-xl border-2 border-stone-700 bg-stone-400 dark:bg-stone-600 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer"
    
    return(
    <>
        <Link  
            className={editLinkStyle} 
            to='/edit/new' 
            state={{pathname: location.pathname, action:"add"}}
        >
            <button className={addBtnStyle}> 
                Add new pokemon
            </button>
        </Link>
        {!pokemonList.length
            ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            : <ul className={pokemonListStyle}>
                  {pokemonList&&pokemonList.map((pokemon)=>
                      <li 
                        key={pokemon.id} 
                        className={pokemonListItemStyle}
                    >
                        <p className={pokemonListItemIdStyle} >
                            {pokemon.id}.
                        </p>
                        <img 
                            className={pokemonListItemImgStyle} 
                            src={pokemon.img} 
                            alt={`${pokemon.name} image`} 
                        />
                        <p className={pokemonListItemNameStyle}>
                            {pokemon.name}
                        </p>
                        <button className={editBtnStyle}>
                            <Link 
                                to={`/edit/pokemon/${pokemon.id}`} 
                                state={{pathname: location.pathname, action:"edit"}}
                            >
                                Edit
                            </Link>
                        </button>
                      </li>)}
              </ul>
        }
    </>
)
}