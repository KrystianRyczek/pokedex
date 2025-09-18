import { useLoaderData } from 'react-router';
import { clsx } from 'clsx'

export default function Img({imageId}){

    const loaderRespons = useLoaderData()

    const imgStyle =clsx("h-12/13 m-auto" , loaderRespons.some(id=>id===imageId) && "grayscale")

    return(
        <img 
            className={imgStyle} 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imageId}.svg`}
            alt='pokemon image'
        />
    )
}