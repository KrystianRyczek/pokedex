import { Form, Link } from "react-router"
import CustomInput from "./CustomInput.jsx"
import logo from "../../assets/logo.png"
import team from "../../assets/team.png"

export default function LofinForm(){
    
const loginFormBoxStyle = "flex w-100 max-sm:w-2xs h-auto sticky top-30 mx-auto border-2 border-stone-700 rounded-lg p-6 shadow-md bg-stone-300 dark:bg-stone-600"
const formBoxStyle = "w-35 z-999"
const formLogoStyle = ' mb-15'
const inputBoxStyle = 'mt-2 flex flex-col text-start'
const labelStyle = "px-1 mb-1"
const inputStyle = "px-2 bg-stone-100 text-stone-900 border border-stone-800 rounded-md shadow-md"
const buttonBoxStyle = "mt-10 flex gap-6 w-full px-2"
const submitBtnStyle = "w-20 border-2 border-stone-700 bg-stone-200 dark:bg-stone-800 rounded-md hover:bg-stone-800 hover:text-stone-100 dark:hover:bg-stone-200 hover:text-stone-900 hover:cursor-pointer"
const textBtnStyle = "w-20 bg-transparent rounded-md hover:border-2 hover:border-stone-700 dark:hover:border-stone-300 hover:cursor-pointer"
const loginFormImgStyle ="h-80 w-55 max-sm:h-60 max-sm:w-33 pt-10 object-cover overflow-visible object-right"
    return(
        <div className={loginFormBoxStyle}>
            <div className={formBoxStyle}>
                <img 
                    className={formLogoStyle} 
                    src={logo} 
                    alt="logo"
                />
                <Form method="post">
                    <CustomInput 
                        id="email" 
                        label="Email:" 
                        inputBoxStyle={inputBoxStyle} 
                        labelStyle={labelStyle}
                        inputStyle={inputStyle}
                    />
                    <CustomInput 
                        id="password" 
                        label="Password:"
                        type="password" 
                        inputBoxStyle={inputBoxStyle} 
                        labelStyle={labelStyle} 
                        inputStyle={inputStyle}
                    />
                    <div className={buttonBoxStyle}>
                        <Link to="/auth?mode=signup">
                            <button 
                                className={textBtnStyle} 
                                type="button"
                            >
                                Sign Up
                            </button>
                        </Link>
                        <button 
                            className={submitBtnStyle} 
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
            <img 
                className={loginFormImgStyle} 
                src={team} alt="pokemon team image"
            />
        </div>
    )
}

