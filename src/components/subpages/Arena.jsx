import { useContext } from "react"
import {fetchGetDataJsonServer, fetchActionJsonServer} from "../../services/fetch.js";
import { appContext } from "../../store/appContext"
import { useArena } from "../../hooks/useArena"
import CustomModal from "../shared/CustomModal"
import ArenaCard from "../shared/ArenaCard"
import Pokeball from "../shared/Pokeball"
import vs from "../../assets/vs.png"


export default function Arena(){
    
    const {winner, modal, fightHandler, exitArenaHandler, closeBtnClickHandler} = useArena()
    const { sparringPokemons } = useContext(appContext)
    
    const arenaContainerStyle = "flex flex-col"
    const arenaBoxStyle = "md:w-250 w-3xs md:px-25 md:h-170 md:py-25 flex max-md:flex-col mx-auto mt-10 bg-linear-to-t from-stone-300 from-5% to-stone-500 dark:from-stone-500 dark:to-stone-700 rounded-xl"
    const pokemonBoxStyle="w-6/14 max-md:w-full h-full p-2 flex "
    const vsImageStyle= "w-2/14 object-contain max-md:mx-auto"
    const startBtnStyle = "md:w-100 w-50 md:h-20 h-10 md:text-5xl text-2xl flex justify-center items-center mx-auto my-10  border-2 border-stone-700 bg-stone-400 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer"
    
    return (
    <>
        <CustomModal
                    ref={modal}
                    winner={winner} 
                    closeBtnClickHandler={closeBtnClickHandler}
        />
        <div className={arenaContainerStyle}>
            <div className={arenaBoxStyle}>
                <div className={pokemonBoxStyle}>
                {sparringPokemons[0] && 
                    <ArenaCard 
                        pokemon={sparringPokemons[0]}
                        win={winner && sparringPokemons[0].id===winner?.id}
                    />
                }
                {!sparringPokemons[0] && 
                    <Pokeball/>
                }
                </div>
                <img className={vsImageStyle} src={vs} alt="vs symbol"/>
                <div className={pokemonBoxStyle}>
                {sparringPokemons[1] && 
                    <ArenaCard 
                        pokemon={sparringPokemons[1]} 
                        win={winner && sparringPokemons[1].id===winner?.id}
                    />
                }
                {!sparringPokemons[1] && <Pokeball/>}
                </div>           
            </div>
            {winner===undefined && 
                <button 
                    className={startBtnStyle} 
                    onClick={fightHandler}
                >
                    Fight
                </button>}
            {winner!==undefined && 
                <button 
                    className={startBtnStyle} 
                    onClick={exitArenaHandler}
                >
                    Exit Arena
                </button>}
        </div>
    </>

    )
}



 const fetchAction = async(pokemon)=>{
            const url=`http://localhost:8000/custom?id=${pokemon.id}`
            const msgOnFail= 'Could not fetch added pokemon!'
            const msgOnSucceed= 'Fetch data OK!'
            const serverRespons = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})

            const apiPokemon = serverRespons.serverData
            
            if(apiPokemon.length!==0){
                const url=`http://localhost:8000/custom/${pokemon.id}`
                const method="PATCH"
                const body = {...pokemon, id:pokemon.id.toString()}
                const msgOnFail= 'Could not edit pokemon!'
                const msgOnSucceed= 'Pokemon edited!'
                const respons = await fetchActionJsonServer({url, method, body, msgOnFail, msgOnSucceed})
                    return {respons, pokemon}
            }else{
                const url=`http://localhost:8000/custom/`
                const body = {...pokemon, id:pokemon.id.toString()}
                const msgOnFail= 'Could not edit pokemon!'
                const msgOnSucceed= 'Pokemon edited!'
                const respons = await fetchActionJsonServer({url, body, msgOnFail, msgOnSucceed})
                    {respons, pokemon}
            }
        }

export const action = async ({request, respons})=>{
    
    const data =  await request.json()
    const winner = await fetchAction(data.pokemonsUpdate[0])
    const loser = await fetchAction(data.pokemonsUpdate[1])
    return new Response(JSON.stringify(
        {winner,loser}),
        {status:200})    
}
