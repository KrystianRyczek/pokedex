import { useLoaderData} from "react-router"
import {fetchGetDataJsonServer, fetchActionJsonServer} from "../../services/fetch.js";
import PokemonDitails from "../shared/PokemonDetails"

export default function Pokemon(){

    const loaderRespons = useLoaderData()
    
    return(
        <PokemonDitails pokemonId={loaderRespons.id}/>
    )
}


export const loader = async({request, params})=>{
    return {id:+params.id}
}

export const action = async ({request, params}) => {

    const data = await request.json()
    const url=`http://localhost:8000/custom?id=${data.id}`
    const msgOnFail= 'Could not fetch favorites pokemon!'
    const msgOnSucceed= 'Fetch data OK!'
    const editedPokemon = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})

    
    if(editedPokemon.serverData.length!==0){
        const url=`http://localhost:8000/custom/${data.id}`
        const method="PATCH"
        const body = {...data, id:data.id.toString()}
        const msgOnFail= `Could not edit ${data.name.toUpperCase()} pokemon!`
        const msgOnSucceed= `Pokemon ${data.name.toUpperCase()} edited!`
        const respons = await fetchActionJsonServer({url, method, body, msgOnFail, msgOnSucceed})
        if(respons.actionSucceed){
            return new Response(JSON.stringify(
                {respons, data}),
                {status:200})
        }
    }else{
        const url=`http://localhost:8000/custom/`
        const body = {...data, id: data.id.toString()}
        const msgOnFail= `Could not edit ${data.name} pokemon!`
        const msgOnSucceed= `Pokemon ${data.name.toUpperCase()} edited!`
        const respons = await fetchActionJsonServer({url, body, msgOnFail, msgOnSucceed})
        if(respons.actionSucceed){
            return new Response(JSON.stringify(
                {respons, data}),
                {status:200})
        }
    }




}