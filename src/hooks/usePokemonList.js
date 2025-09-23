import {  useContext, useState } from "react"
import { appContext } from "../store/appContext"

export const usePokemonList = ({filter})=>{

    const {pokemonList} = useContext(appContext)
    const [currentIndex, setCurrentIndex] =useState({rowData:0, filtredData:0})

    if(filter==="" && currentIndex.filtredData!==0){
       setCurrentIndex(previndes=>{
        return {...previndes, filtredData:0}
       })
    }
    
    const pokemonsArray =filter===""
        ? pokemonList
        : pokemonList.filter(
            (pokemon)=>pokemon.name.includes(filter))    
         
    const clickPrevBtnHandler = () => {
        if (filter === "") {
            setCurrentIndex((prevIndex) =>{
                return {...prevIndex, rowData: prevIndex.rowData-15}
            })
        } else {
            setCurrentIndex((prevIndex) =>{
                return {...prevIndex, filtredData: prevIndex.filtredData-15}
            })
        }
    }

    const clickNextBtnHandler = () => {
        if (filter === "") {
            setCurrentIndex((prevIndex) =>{
                return {...prevIndex, rowData: prevIndex.rowData+15}
            })
        } else {
            setCurrentIndex((prevIndex) =>{
                return {...prevIndex, filtredData: prevIndex.filtredData+ 15}
            })
        }
    }
    
    const pokemonsArraySlice  = filter === "" 
        ? pokemonsArray.slice(currentIndex.rowData, currentIndex.rowData + 15)
        : pokemonsArray.slice(currentIndex.filtredData, currentIndex.filtredData + 15)

    const pokemonsArrayLength = pokemonsArray.length-15  


    return { currentIndex, 
             pokemonsArrayLength, 
             clickPrevBtnHandler, 
             clickNextBtnHandler, 
             pokemonsArraySlice}
}