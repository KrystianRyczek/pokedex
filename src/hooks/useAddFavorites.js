import { useContext } from "react"
import { appContext } from "../store/appContext"
import {fetchGetDataJsonServer, fetchActionJsonServer} from"../services/fetch.js"

export const useAddFavorites = (pokemon)=>{

    const {favoritesPokemonsID, setFavoritesPokemonsID}=useContext(appContext)
    
    const favorites= (favoritesPokemonsID.length>0 && pokemon)
        ?favoritesPokemonsID.some(item=>+item.id===+pokemon.id)
        :false

    const favoriteBtnClickHandler = async ()=>{

        const url=`http://localhost:8000/favorites?id=${pokemon.id}`
        const msgOnFail= 'Could not fetch favorites pokemon!'
        const msgOnSucceed= 'Fetch data OK!'
        const favoritesPokemon = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
        if(favoritesPokemon.serverData.length!==0){
            const url=`http://localhost:8000/favorites/${pokemon.id}`
            const method="DELETE"
            const msgOnFail= 'Could not delete favorites pokemon!'
            const msgOnSucceed= 'Pokemon deleted!'
            const respons = await fetchActionJsonServer({url, method, msgOnFail, msgOnSucceed})
            if(respons.actionSucceed){
                setFavoritesPokemonsID((prevFavoritesPokemon)=>prevFavoritesPokemon.filter(
                    (item)=>+item.id!==+pokemon.id))
            }

        }else{
            const url=`http://localhost:8000/favorites/`
            const msgOnFail= 'Could not add pokemon to favorites!'
            const msgOnSucceed= 'Pokemon added to favorites!'
            const body = {id: pokemon.id.toString(),}
            const respons = await fetchActionJsonServer({url, body, msgOnFail, msgOnSucceed})

                if(respons.actionSucceed){
                    setFavoritesPokemonsID((prevFavoritesPokemon)=>[...prevFavoritesPokemon,{id:pokemon.id}])
                }
        }

    }
    return { favorites, favoriteBtnClickHandler }

}