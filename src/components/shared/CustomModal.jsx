import winnerackground from "../../assets/background.png"
import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


export default function CustomModal({ref, winner, msg, btnLabel, closeBtnClickHandler}){

   const dialog = useRef()

   useImperativeHandle(ref,()=>{
    return{
        open(){
            dialog.current.showModal()
        },
        close(){
            dialog.current.close()
        }
    }});
    
    const dialogStyle = 'w-201 h-151 rounded-2xl m-auto bg-radial-[at_50%_60%] from-stone-100 via-stone-400 to-stone-500 to-90% border-3 border-stone-800'
    const modalTitleStyle = "w-120 text-center text-5xl mx-auto mt-10 "
    const drawTitleStyle = "w-120 text-center text-7xl mx-auto mt-40 "
    const drawParagrafStyle = "w-180 text-center text-7xl mx-auto mt-5 mb-20"
    const modalImageStyle = "flex h-60 mx-auto my-10"
    const closeModalBtnStyle = "w-50 h-15 flex justify-center items-center mx-auto my-10 text-5xl border-2 border-stone-700 bg-stone-400 rounded-md hover:bg-stone-800 hover:text-stone-100 hover:cursor-pointer"
    
    return(createPortal(
    <dialog 
        ref={dialog} 
        onClose={closeBtnClickHandler} 
        className={dialogStyle}
    >
        {winner && <>
            <h2 className={modalTitleStyle}>
                Winner is 
                <span className="capitalize">
                    {winner.name}
                </span>
                !
            </h2>
            <img 
                className={modalImageStyle} 
                src={winner.img}
                alt="winner image"
            />
            <p className={modalTitleStyle}>
                +10 base experience
            </p>
            <button 
                className={closeModalBtnStyle} 
                onClick={closeBtnClickHandler}
            >
                Close
            </button>
        </>}
        {!winner && <>
            <h2 className={drawTitleStyle} >
                It is draw!
            </h2>
            <p className={drawParagrafStyle}>
                Try again later...
            </p>
            <button 
                className={closeModalBtnStyle} 
                onClick={closeBtnClickHandler}
            >
                Close
            </button>
        </>}
    </dialog>, document.getElementById('modal')) )
}
