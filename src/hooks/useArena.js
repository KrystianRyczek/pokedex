import { useContext, useRef, useState} from "react"
import { appContext } from "../store/appContext"
import { enqueueSnackbar } from 'notistack';
import Grow from '../components/notistack/Grow.jsx'
import { useFetcher, useNavigate } from "react-router";

export const useArena = (pokemon)=>{
    const { sparringPokemons, setSparringPokemons, pokemonList, setPokemonList} = useContext(appContext)
    const [winner, setWinner] = useState(undefined)
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const modal = useRef()
    const fighterCount = sparringPokemons.length

    const actionRespons = fetcher.data?JSON.parse(fetcher?.data):fetcher

        if(actionRespons.winner?.respons.actionSucceed){
            const index = pokemonList.findIndex(pokemon=> pokemon.id === actionRespons.winner.pokemon.id)
            setPokemonList(prevPokemonList=>{
                prevPokemonList[index]=actionRespons.winner.pokemon
                return prevPokemonList
            })
        }
        
        if(actionRespons.loser?.respons.actionSucceed){
            const index = pokemonList.findIndex(pokemon=> pokemon.id === actionRespons.loser.pokemon.id)
                    setPokemonList(prevPokemonList=>{
                prevPokemonList[index]=actionRespons.loser.pokemon
                return prevPokemonList
            })
        }

    const options={
        autoHideDuration: 6000,
        anchorOrigin:{ vertical: 'top', horizontal: 'center' },
        TransitionComponent: Grow
    }

    const addToArenaBtnClickHandler = ()=>{
        const isAdded = sparringPokemons.some((sparringPokemon)=>sparringPokemon.id===pokemon.id)

        if(!isAdded&& fighterCount<2)
            {
            setSparringPokemons((prevSparringPokemons)=>{
            return [...prevSparringPokemons, pokemon]
            })
        }else if(isAdded&& fighterCount<2){
            const message = "Pokemon is already added to arena, please select another one..."
            const key = enqueueSnackbar({ message, ...options,  variant: 'warning'}) 
        
        }else if(fighterCount===2){
            const message ="Arena is full, remove one of two nominated pokemons to be able add selected pokemon..."
           const key = enqueueSnackbar({ message, ...options, variant: 'warning'}) 
        }

    }
    const removeBtnClickHandler = ()=>{
        if(winner===undefined){
            setSparringPokemons((prevSparringPokemons)=>{
                return [...prevSparringPokemons.filter(sparringPokemon=>sparringPokemon.id!==pokemon.id)]
            })
        }
    }
    const fightHandler = ()=>{
        if(fighterCount<2){
            const message = "To start match one or more pokemon is missing..."
            const key = enqueueSnackbar({ message, ...options, variant: 'warning' }) 
        }else if(fighterCount===2){
            const pokemonLeft = sparringPokemons[0].weight*sparringPokemons[0].baseExperience
            const pokemontRight =sparringPokemons[1].weight*sparringPokemons[1].baseExperience
                if(pokemonLeft===pokemontRight){
                    setWinner(null)
                }else if(pokemonLeft>pokemontRight){
                    const winner = {...sparringPokemons[0], 
                                    baseExperience: sparringPokemons[0].baseExperience + 10, 
                                    win:+sparringPokemons[0].win + 1
                                   }
                    const loser = {...sparringPokemons[1], 
                                    lose:+sparringPokemons[1].lose + 1
                                  }

                    fetcher.submit(
                        { pokemonsUpdate:[{...winner},{...loser}]
                        },
                        { method: "POST",  
                        encType:"application/json" 
                        }
                    )
                    setSparringPokemons([winner, loser])
                    setWinner(winner)                 
                }else if(pokemonLeft<pokemontRight){
                    const winner = {...sparringPokemons[1], 
                                    baseExperience: sparringPokemons[1].baseExperience+10, 
                                    win:+sparringPokemons[1].win + 1
                                   }
                    const loser = {...sparringPokemons[0], 
                                    lose:+sparringPokemons[0].lose + 1
                                  }

                    fetcher.submit(
                        { pokemonsUpdate:[{...winner},{...loser}]
                        },
                        { method: "POST",  
                        encType:"application/json" 
                        }
                    )
                    setSparringPokemons([loser, winner])
                    setWinner(winner)
                }
                modal.current.open()
        }
        
    }

    const exitArenaHandler = ()=>{
        setSparringPokemons([])
        setWinner(undefined)
        navigate('/')
    }
    const closeBtnClickHandler= ()=>{
        modal.current.close()
    }
    return {winner, modal, fighterCount, addToArenaBtnClickHandler, removeBtnClickHandler, fightHandler, exitArenaHandler,  closeBtnClickHandler}
}