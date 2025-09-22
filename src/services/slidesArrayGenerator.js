export const slidesArrayGenerator= ( startIndex, arrayLength)=>{
    let array = []
      for (let index = startIndex; index < (startIndex+arrayLength); index++) {
    array=[...array, index]
    
  }
  return array
}