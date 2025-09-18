import { useRef } from "react"
import CustomInput from "./CustomInput.jsx"
import { Form } from "react-router";

export default function SearchForm({filterOnChangeHandler}) {
    const searchForm = useRef();

const searchformBoxStyle = "md:w-120 w-3xs flex h-auto m-auto"
const inputBoxStyle = 'my-10 flex flex-col mx-auto gap-2 text-start '
const labelStyle = "px-1 mb-1"
const inputStyle = "px-2 bg-stone-100 border border-stone-800 rounded-md shadow-md dark:inset-shadow-sm dark:inset-shadow-stone-500 text-stone-900"

        return(
        <Form 
            className={searchformBoxStyle} 
            onChange ={()=>{filterOnChangeHandler(searchForm.current.value)}}
        >
            <CustomInput 
                id="filter" 
                label="Search for a Pokémon:" 
                inputBoxStyle={inputBoxStyle} 
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                ref={searchForm}
            />                  
        </Form>
    )

}