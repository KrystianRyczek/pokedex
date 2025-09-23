import {fetchGetDataJsonServer, fetchActionJsonServer} from '../../services/fetch.js'
import PokemonDitails from "../shared/PokemonDetails"

export default function AddPokemon(){
    



    return (
        <PokemonDitails/>
    )
}

export const loader = async({request, params})=>{
    const url =`http://localhost:8000/custom`
    const msgOnFail= 'Could not fetch added pokemons!'
    const msgOnSucceed= 'Fetch data OK!'
    const respons = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
    
    if(respons.actionSucceed){
        const addedId = respons.serverData.map(item=>+item.id)
        return addedId
    }
    return respons
   
}

export const action = async ({request, params}) => {
    const data = await request.json()

    const url=`http://localhost:8000/custom?id=${data.id}`
    const msgOnFail= 'Could not fetch added pokemon!'
    const msgOnSucceed= 'Fetch data OK!'
    const addedPokemon = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})

    const pokemon = addedPokemon.serverData
    if(pokemon.length>0){
        
        return new Response(JSON.stringify({ 
            respons:{
                  actionSucceed: false, 
                  serverErrorMessage: 'Pokemon already exist!'
                 }
        }),{status:401})
    }else{
        const url=`http://localhost:8000/custom`
        const msgOnFail= `Could not add ${data.name} pokemon!`
        const msgOnSucceed= `Pokemon ${data.name.toUpperCase()} added!`
        const body = {...data, id:data.id.toString()}
        const addRespons = await fetchActionJsonServer({url, body, msgOnFail, msgOnSucceed})
        if(addRespons.actionSucceed){
            return new Response(JSON.stringify(
                {respons:addRespons, data}),
                {status:200})
        }
    }
    
}