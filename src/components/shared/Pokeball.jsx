import pokeball from "../../assets/pokeball.png"

export default function Pokeball(){
    const pokeballImageStyle = "m-auto object-contain"
    return(
        <img 
            className={pokeballImageStyle} 
            src={pokeball} 
            alt="Pokeball image"
        />  
    )
}