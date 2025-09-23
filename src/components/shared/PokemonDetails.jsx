import { useFetcher, useLocation, useNavigate} from "react-router";
import { useContext, useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { clsx } from 'clsx'
import { z } from "zod"
import { useAddFavorites } from "../../hooks/useAddFavorites";
import { appContext } from "../../store/appContext";
import { useArena } from "../../hooks/useArena";
import CustomSwiper from "./CustomSwiper";
import CustomInput from "./CustomInput";
import Grow from '../notistack/Grow'




const schema = z.object({
                        name: z.coerce.
                                string("Not a string!").
                                min(3, "Name should has at least 3 chars!").
                                regex(/[A-Za-z]/, "Not a valid string!").
                                max(20, 'Name should has at max 20 chars!'),
                        height: z.coerce.
                                    number("Not a number!").
                                    positive("Not a positive number!").
                                    lte(1000, "Value is grater then 1000!"),
                        baseExperience: z.coerce.
                                            number("Not a number!").
                                            positive("Not a positive number!").
                                            lte(1000,"Value is grater then 1000!"),
                        weight: z.coerce.
                                    number("Not a number!").
                                    positive("Not a positive number!").
                                    lte(1000, "Value is grater then 1000!"),
                        ability: z.coerce.
                                    string("Not a string!").
                                    min(3, "Ability should has at least 3 chars!").
                                    regex(/[A-Za-z]/, "Not a valid string!").
                                    max(20 ,'Ability should has at max 20 chars!'),
                    })

export default function PokemonDitails({pokemonId}){
    let initIsEditing = false
    const form = useRef()
    const fetcher = useFetcher()
    const location = useLocation()
    const navigate = useNavigate()

    if(location.state?.action==='edit' || location.state?.action==='add'){
        initIsEditing= true
    }
    const {pokemonList, setPokemonList} = useContext(appContext)
    const [isEditing, setIsEditing] = useState(initIsEditing)
    const [imgIndex, setImgIndex] = useState(151)
    
    
    const pokemon = pokemonId && pokemonList.find(pokemon=>pokemon.id===pokemonId)
    const {addToArenaBtnClickHandler, fighterCount} = useArena(pokemon)
    const { favorites, favoriteBtnClickHandler } = useAddFavorites(pokemon)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const actionRespons = fetcher.data
        ?JSON.parse(fetcher?.data)
        :fetcher

    const defaultValues={
            name:pokemon?pokemon.name:"",
            win:pokemon?.win?pokemon.win:0,
            lose:pokemon?.lose?pokemon.lose:0,
            height:pokemon?pokemon.height:"",
            baseExperience:pokemon?pokemon.baseExperience:"",
            weight:pokemon?pokemon.weight:"",
            ability:pokemon?pokemon.abilities[0].ability.name:"",
       }
  
    const { register, 
            handleSubmit,
            setValue,
            formState: { errors }
          } = useForm({defaultValues, resolver: zodResolver(schema)})
    
    useEffect(()=>{
        setValue('name', pokemon?pokemon.name:"")
        setValue('win', pokemon?.win?pokemon.win:0)
        setValue('lose', pokemon?.lose?pokemon.lose:0)
        setValue('height', pokemon?pokemon.height:"")
        setValue('baseExperience', pokemon?pokemon.baseExperience:"")
        setValue('weight', pokemon?pokemon.weight:"")
        setValue('ability', pokemon?pokemon.abilities[0].ability.name:"")
     },[pokemonList])



    const submitClickHandler=(data)=>{
        if(isEditing){
            fetcher.submit(
                {   
                    name:data.name,
                    win:pokemon
                        ? pokemon.win
                        : 0,
                    lose:pokemon
                        ? pokemon.lose
                        : 0,
                    height:data.height,
                    baseExperience:data.baseExperience,
                    weight:data.weight,
                    abilities: [{ability:{name: data.ability}}],
                    id:pokemon
                        ? pokemon.id
                        : imgIndex, 
                    img: pokemon
                        ? pokemon.img
                        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imgIndex}.svg`
                },
                { method: "POST",  
                encType:"application/json" }
            )
        }
        setIsEditing(isEditing=>!isEditing) 
    }
    

    const selectImgHandler=(index)=>{
        setImgIndex(index)
    }

    useEffect(()=>{
        if(fetcher.state!=='submitting' && actionRespons.respons?.actionSucceed){
            const options={
                autoHideDuration: 6000,
                variant: 'success', //default, success, error, warning, info
                anchorOrigin:{ vertical: 'top', horizontal: 'center' },
                TransitionComponent: Grow
            }
            const message= actionRespons?.respons.serverMessage
            const key = enqueueSnackbar({ message, ...options })

            const newPokemon =actionRespons?.data
            const index = pokemonList.findIndex(item=>item.id===newPokemon.id)

            if(location.state.action==='add' && index===-1){
                setPokemonList(prevPokemonList=>([...prevPokemonList, newPokemon]))
                navigate(location.state.pathname)
            }
            if(location.state.action==='edit' && index!==-1){
                setPokemonList(prevPokemonList=>{
                    const updatedPokemonList = [...prevPokemonList]
                    updatedPokemonList[index]=newPokemon
                    return updatedPokemonList
                })
                navigate(location.state.pathname)
            }
        }else if(errors.name || errors.height || errors.weight || errors.ability || errors.baseExperience){
            const options={
                autoHideDuration: 6000,
                variant: 'warning', 
                anchorOrigin:{ vertical: 'top', horizontal: 'center' },
                TransitionComponent: Grow
            }
           const key = enqueueSnackbar({ message:"Validation error, pleas provide valid input.", ...options }) 
        }else if(fetcher.state!=='submitting' && actionRespons.respons?.actionSucceed===false){
            const options={
                autoHideDuration: 6000,
                variant: 'error',
                anchorOrigin:{ vertical: 'top', horizontal: 'center' },
                TransitionComponent: Grow
            }
            const message= fetcher.data && JSON.parse(fetcher.data)?.respons.serverErrorMessage
           const key = enqueueSnackbar({ message, ...options }) 
        }

    },[errors, fetcher])

    const formBoxStyle = "md:w-250 w-100 max-sm:w-3xs md:h-150 mx-auto mt-10 flex border-3 border-stone-800 bg-linear-to-t from-stone-500 from-5% to-stone-300 dark:from-stone-700 dark:to-stone-500"
    const imageBoxStyle = "md:w-3/5 w-full flex flex-col relative"
    const imageContainerStyle = "w-100 max-md:w-full mx-auto mt-10"
    const pokemonImg= "w-full max-md:w-12/13 max-md:mx-auto"
    const arenaStatusBoxStyle ="flex flex-col w-1/2 mt-10"
    const addToArenaStyle = "flex flex-col w-1/2 md:mt-15 mt-10"
    const atributesStyle = "flex md:flex-col flex-wrap md:w-1/2 w-full md:mt-15 mt-10"

    const pokemonNameStyle = clsx("text-center text-6xl max-md:text-3xl font-bold capitalize mt-3 rounded-md",
                                  pokemonId && "w-full",
                                  !pokemonId && "md:w-100 max-md:w-4/5 bg-stone-200 dark:bg-stone-500 shadow-[0_1px_5px_rgba(0,0,0,0.8)]")
    const formStyle ="size-full flex max-md:flex-col border-3 border-stone-800"
    const paragraFormStyle="flex justify-start"
    const inputBoxStyle = "flex md:flex-col w-full max-md:px-10 max-sm:px-2"
    const labelStyle = "w-full text-start mb-1 text-xl font-bold"
    const inputStyle = clsx("flex box-border w-4/5 h-7 text-xl pl-3 rounded-md", 
                             isEditing && "bg-stone-200 dark:bg-stone-500 shadow-[0_1px_5px_rgba(0,0,0,0.8)] ")
    const staticInputStyle = "flex box-border w-4/5 h-7 text-xl pl-3 rounded-md"
    const favoriteIcon =clsx("w-18 h-18 absolute top-5 md:right-25 max-md:right-5 stroke-2",
                             (!favorites && pokemonId) && "fill-transparent stroke-stone-700", 
                             favorites && "fill-stone-700 stroke-stone-700",
                             !pokemonId && "stroke-stone-400 fill-stone-400",)
    const arenaIcon = clsx("w-21 h-16 size-fit mx-auto", 
                            pokemonId && "fill-stone-700 stroke-stone-700", 
                            !pokemonId&&"stroke-stone-400 fill-stone-400")
    const arenaParagraf = clsx("mx-auto text-5xl", pokemonId && "text-stone-700" ,!pokemonId&& "text-stone-400")
    const btnStyle = "w-60 max-sm:w-30 h-15 max-sm:h-10 flex justify-center items-center md:ml-auto md:mr-3 md:mt-12 max-md:mx-auto max-md:my-5 text-5xl max-sm:text-2xl border-2 border-stone-700 bg-stone-400 dark:bg-stone-500 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer"
    const errorsBoxStyle = "w-250 mx-auto flex flex-col text-start mt-5 text-red-700"
    return (
        <div>
            {(pokemonId&&!pokemon)
                ?<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                : <div className={formBoxStyle}> 
                        <form 
                            ref={form} 
                            className={formStyle} 
                            onSubmit={handleSubmit((data) => submitClickHandler(data) )}
                        >
                            <div className={imageBoxStyle}>
                                <div className={imageContainerStyle}>
                                    {pokemonId && 
                                        <img 
                                            className={pokemonImg} 
                                            src={pokemon.img} 
                                            alt={`${pokemon.name} image`}
                                        />
                                    }
                                    {!pokemonId && 
                                        <CustomSwiper 
                                            selectImgHandler={selectImgHandler}
                                        />
                                    }
                                </div>
                                <button 
                                    type="button" 
                                    onClick={favoriteBtnClickHandler} 
                                    disabled={location.state.action==='add'}
                                >
                                    <svg className={favoriteIcon}>
                                        <path 
                                            className="scale-200" 
                                            d="M25.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"
                                        />
                                    </svg>
                                </button>
                                <p className="w-full"> 
                                    <input 
                                        id='name' 
                                        className={pokemonNameStyle} 
                                        disabled={pokemonId} 
                                        {...register('name')} 
                                    />
                                </p>
                            </div>
                            <div className="md:w-2/5 w-full">
                                <div className={paragraFormStyle}>
                                    <div className={arenaStatusBoxStyle}>
                                        <CustomInput 
                                            id="win" 
                                            label="Win:"
                                            type="number" 
                                            inputBoxStyle={inputBoxStyle} 
                                            labelStyle={labelStyle} 
                                            inputStyle={staticInputStyle}
                                            disabled={true}
                                            {...register("win")}
                                        />
                                        <CustomInput 
                                            id="win" 
                                            label="Lose:"
                                            type="number" 
                                            inputBoxStyle={inputBoxStyle} 
                                            labelStyle={labelStyle} 
                                            inputStyle={staticInputStyle}
                                            disabled={true}
                                            {...register("win")}
                                        />
                                    </div>
                                    <div className={addToArenaStyle}>
                                        <button 
                                            type='button' 
                                            onClick={addToArenaBtnClickHandler} 
                                            disabled={location.state.action==='add'}
                                        >
                                            <svg className={arenaIcon}>
                                                <path 
                                                    className="scale-200" 
                                                    d="M40.828 30.828c-1.562 1.562-4.095 1.562-5.657 0l-5.379-5.379-3.793 3.793-4.243-4.243 3.326-3.326-14.754-14.754c-0.252-0.252-0.358-0.592-0.322-0.92h-0.008v-5c0-0.552 0.448-1 1-1h5c0 0 0.083 0 0.125 0 0.288 0 0.576 0.11 0.795 0.33l14.754 14.754 3.326-3.326 4.243 4.243-3.793 3.793 5.379 5.379c1.562 1.562 1.562 4.095 0 5.657z M15.409 2h-3.409v3.409l14.674 14.674 3.409-3.409-14.674-14.674z M1.172 30.828c-1.562-1.562-1.562-4.095 0-5.657l5.379-5.379-3.793-3.793 4.243-4.243 3.326 3.326 14.754-14.754c0.252-0.252 0.592-0.358 0.921-0.322v-0.008h5c0.552 0 1 0.448 1 1v5c0 0 0 0.083 0 0.125 0 0.288-0.11 0.576-0.329 0.795l-14.754 14.754 3.326 3.326-4.243 4.243-3.793-3.793-5.379 5.379c-1.562 1.562-4.095 1.562-5.657 0zM30 5.409v-3.409h-3.409l-14.674 14.674 3.409 3.409 14.674-14.674z"
                                                />
                                            </svg>
                                        </button>
                                        <p className={arenaParagraf}>
                                            {fighterCount}/2
                                        </p>
                                    </div>
                                </div>
                                <div className={atributesStyle}>
                                    <CustomInput 
                                        id="height" 
                                        label="Height:"
                                        type="text" 
                                        inputBoxStyle={inputBoxStyle} 
                                        labelStyle={labelStyle} 
                                        inputStyle={inputStyle}
                                        disabled={!isEditing}
                                        {...register("height")}
                                    />
                                    <CustomInput 
                                        id="baseExperience" 
                                        label="Base Experience:"
                                        type="text" 
                                        inputBoxStyle={inputBoxStyle} 
                                        labelStyle={labelStyle} 
                                        inputStyle={inputStyle}
                                        disabled={!isEditing}
                                        {...register("baseExperience")}
                                    />
                                    <CustomInput 
                                        id="weight" 
                                        label="Weight:"
                                        type="text" 
                                        inputBoxStyle={inputBoxStyle} 
                                        labelStyle={labelStyle} 
                                        inputStyle={inputStyle}
                                        disabled={!isEditing}
                                        {...register("weight")}
                                    />
                                    <CustomInput 
                                        id="ability" 
                                        label="Ability:"
                                        type="text" 
                                        inputBoxStyle={inputBoxStyle} 
                                        labelStyle={labelStyle} 
                                        inputStyle={inputStyle}
                                        disabled={!isEditing}
                                        {...register("ability")}
                                    />                                             
                                </div> 
                                {location.state.action==='view' &&                 
                                    <button 
                                        className={btnStyle} 
                                        type='submit'
                                    > 
                                        {isEditing?
                                            fetcher.state==="submitting"?"Saving...":"Save":"Edit"}
                                    </button>
                                }
                                {location.state.action==='add' &&                 
                                    <button 
                                        className={btnStyle} 
                                        type='submit'
                                    > 
                                        {fetcher.state==="submitting"
                                            ?"Creating..."
                                            :"Create"}
                                    </button>
                                }
                                {location.state.action==='edit' &&                 
                                    <button 
                                        className={btnStyle} 
                                        type='submit'
                                    > 
                                        {fetcher.state==="submitting"
                                            ?"Saving..."
                                            :"Save"}
                                    </button>
                                }
                            </div>
                        </form>
                  </div>
            }
            {
                <div className={errorsBoxStyle}>
                    {
                    Object.keys(errors).map(
                        key=><p key={key}>
                                *{key.toUpperCase()}: {errors[key].message}
                             </p>)
                    }
                </div>
            }
        </div>
       
    )
}