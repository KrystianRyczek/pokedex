import { useContext, useRef, useState } from "react";
import { appContext } from "../../store/appContext";





export default function Ranking(){

    const formRef = useRef()
    const {pokemonList}= useContext(appContext)
    const [sortOption, setSortOption] = useState({order:"AZ", option:"id"})
 
    const changeHandler = ()=>{
        setSortOption(
            {
             order:formRef.current.order.value, 
             option:formRef.current.option.value
            })
    }

    const filtredPokemonsLis=[...pokemonList]

    if(sortOption.order==="AZ"){
            if(sortOption.option==='name'){
                filtredPokemonsLis.sort(
                    (a, b ) => a[sortOption.option].localeCompare(b[sortOption.option]))
            }else{
                filtredPokemonsLis.sort(
                    (a, b ) => a[sortOption.option] - b[sortOption.option])
            }
    }else{
            if(sortOption.option==='name'){
                filtredPokemonsLis.sort(
                        (a, b ) => b[sortOption.option].localeCompare(a[sortOption.option]))
            }else{
                filtredPokemonsLis.sort(
                        (a, b ) => b[sortOption.option] - a[sortOption.option])
            }
    }

    const sortFormStyle = "mt-10 flex mx-auto gap-4 max-md:flex-col"
    const sortLabelOrderStyle = "my-auto md:text-2xl text-xs mx-auto"
    const sortSelectOrderStyle = "md:w-30 w-20 md:h-10 h-5 md:text-2xl text-xs mx-auto border-2 border-stone-700 bg-stone-200 dark:bg-stone-600 rounded-md  hover:cursor-pointer"
    const sortSelectOptionStyle = "md:w-50 w-30 md:h-10 h-5 md:text-2xl text-xs mx-auto border-2 border-stone-700 bg-stone-200 dark:bg-stone-600 rounded-md hover:cursor-pointer"
    const pokemonListStyle = "md:w-200 sm:w-100 w-3xs mx-auto"
    const pokemonListItemStyle = "w-full md:h-20 h-10 flex place-content-between my-2 border-b border-stone-700"
    const pokemonListItemIdStyle = "md:my-auto md:w-12 w-10 md:text-2xl text-xs text-center"
    const pokemonListItemImgStyle = "md:my-auto md:w-18 w-12 md:text-2xl text-xs text-center"
    const pokemonListItemNameStyle = "md:my-auto w-35 md:text-2xl text-xs text-center capitalize"
    const pokemonListItemArenaStyle = "md:my-auto md:w-12 w-8 md:text-2xl text-xs text-center capitalize"
    const pokemonListItemSizeStyle = "md:my-auto md:w-20 w-15 md:text-2xl text-xs text-center capitalize"
    const pokemonListItemBaseExperienceStyle = "md:my-auto md:w-25 w-25 md:text-2xl text-xs text-center capitalize"
    
    return (
        <>
            <form ref={formRef} onChange={changeHandler} className={sortFormStyle}>
                <p className={sortLabelOrderStyle}>Sort option:</p>
                <div className="flex gap-4">
                    <select name="order" className={sortSelectOrderStyle}>
                        <option value="AZ">Increase</option>
                        <option value="ZA">Decrease</option>
                    </select>  
                    <select name='option' className={sortSelectOptionStyle}>
                        <option value="id">Id</option>
                        <option value="name">Name</option>
                        <option value="win">Win</option>
                        <option value="lost">Lose</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                        <option value="baseExperience">Base Experience</option>
                    </select>
                </div>
            </form>
            {!pokemonList.length
                ?<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                : <ul className={pokemonListStyle}>
                      <li className={pokemonListItemStyle}>
                          <p className={`${pokemonListItemIdStyle} max-sm:-rotate-90 max-sm:h-10`}>Id</p>
                          <p className={`${pokemonListItemNameStyle} max-sm:-rotate-90 max-sm:h-20`}>Name</p>
                          <p className={`${pokemonListItemImgStyle} max-sm:-rotate-90 max-sm:h-18`}>Image</p>
                          <p className={`${pokemonListItemArenaStyle} max-sm:-rotate-90 max-sm:h-10`}>win</p>
                          <p className={`${pokemonListItemArenaStyle} max-sm:-rotate-90 max-sm:h-10`}>lose</p>
                          <p className={`${pokemonListItemSizeStyle} max-sm:-rotate-90 max-sm:h-10`}>height</p>
                          <p className={`${pokemonListItemSizeStyle} max-sm:-rotate-90 max-sm:h-10`}>weight</p>
                          <p className={`${pokemonListItemBaseExperienceStyle} max-sm:-rotate-90 max-sm:h-5`}>Base Experience</p>
                      </li>
                      {filtredPokemonsLis&&filtredPokemonsLis.map((pokemon)=>
                          <li key={pokemon.id}className={pokemonListItemStyle}>
                              <p className={pokemonListItemIdStyle} >{pokemon.id}.</p>
                              <p className={pokemonListItemNameStyle}>{pokemon.name}</p>
                              <img className="md:w-18 w-10" src={pokemon.img} alt={`${pokemon.name} image`} />
                              <p className={pokemonListItemArenaStyle}>{pokemon.win?pokemon.win:0}</p>
                              <p className={pokemonListItemArenaStyle}>{pokemon.lose?pokemon.lose:0}</p>
                              <p className={pokemonListItemSizeStyle}>{pokemon.height}</p>
                              <p className={pokemonListItemSizeStyle}>{pokemon.weight}</p>
                              <p className={pokemonListItemBaseExperienceStyle}>{pokemon.baseExperience}</p>
                          </li>)}
                  </ul>
            }
        </>
    )
}