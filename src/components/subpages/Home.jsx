import { useContext, useState } from "react";
import { appContext } from "../../store/appContext.js";
import PokemontList from "../shared/PokemonList.jsx";
import SearchForm from "../shared/SearchForm.jsx";

export default function Home() {

    const {pokemonList} =useContext(appContext)
    const [searchTerm, setSearchTerm] = useState("")
    
    const filterOnChangeHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    return (
        <section>
            <SearchForm filterOnChangeHandler={filterOnChangeHandler}/>
            {!pokemonList.length
                ? <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                : <PokemontList filter={searchTerm}/>
            }
        </section>
    )
}
