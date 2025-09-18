import { Link } from "react-router"
import CustomInput from "./CustomInput.jsx"
import logo from "../../assets/logo.png"
import pikachu from "../../assets/pikachu.png"
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Grow from '../notistack/Grow'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z.object({
                        username: z.coerce.
                                    string().
                                    regex(/[A-Za-z]/, "User Name should string!").
                                    min(3, "Username should be at least 3 characters long!"),
                        email:  z.email("Not a valid email!"),
                        password: z.coerce.
                                    string().
                                    regex(/[A-Za-z\d\W]{8,}/, "Password should be min 8 chars long, includes capital letter, number and special char!"),
                        confirmPassword: z.coerce.string()
                    }).refine((data) => data.password === data.confirmPassword, {path: ["confirmPassword"], message: "Passwords don't match!" })

export default function SignupForm({fetcher}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema)})
  
  const submitClickHandler=(data)=>{
       fetcher.submit(
        {...data},
        { method: "POST",  
          encType:"application/json" })
    }  
  const options={
        autoHideDuration: 6000,
        anchorOrigin:{ vertical: 'top', horizontal: 'center' },
        TransitionComponent: Grow
    }

  useEffect(() => {
    if(Object.keys(errors).length>0){
        Object.keys(errors).forEach(key => {
        const message= errors[key].message
        const snackbarKey = enqueueSnackbar({ message, ...options,  variant: 'error'})  
    });
    }
  }, [fetcher])

  const containerStyle= "sticky top-30 h-auto w-full mx-auto "
  const signupFormBoxStyle = "flex w-100 max-sm:w-2xs h-auto mx-auto  border-2 border-stone-700 rounded-lg p-6 shadow-md bg-stone-300 dark:bg-stone-600"
  const formBoxStyle = "w-40 max-sm:w-full"
  const formLogoStyle = ' mb-2'
  const inputBoxStyle = 'mt-2 flex flex-col text-start'
  const labelStyle = "px-1 mb-1"
  const inputStyle = "px-2 bg-stone-100 text-stone-900 border border-stone-800 rounded-md shadow-md"
  const buttonBoxStyle = "mt-10 flex gap-6 w-full px-2"
  const submitBtnStyle = "w-20 border-2 border-stone-700 bg-stone-200 dark:bg-stone-800 rounded-md hover:bg-stone-800 hover:text-stone-100 dark:hover:bg-stone-200 hover:text-stone-900 hover:cursor-pointer"
  const textBtnStyle = "w-20 bg-transparent rounded-md hover:border-2 hover:border-stone-700 dark:hover:border-stone-300 hover:cursor-pointer"
  const errorsContainerStyle = "flex w-100 max-sm:w-2xs flex flex-col text-start mt-5 text-xs text-red-700"
  return (
    <div className={containerStyle}>
      <div className={signupFormBoxStyle}>
        <div className={formBoxStyle}>
          <img className={formLogoStyle} src={logo} alt="logo"/>
          <form onSubmit={handleSubmit((data) => submitClickHandler(data))}>
            <CustomInput 
                id="username" 
                label="User Name:" 
                inputBoxStyle={inputBoxStyle} 
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                {...register("username")}
            />
            <CustomInput 
                id="email" 
                label="Email:" 
                inputBoxStyle={inputBoxStyle} 
                labelStyle={labelStyle}
                inputStyle={inputStyle}
                {...register("email")}
            />
            <CustomInput 
                id="password" 
                label="Password:"
                type="password" 
                inputBoxStyle={inputBoxStyle} 
                labelStyle={labelStyle} 
                inputStyle={inputStyle}
                {...register("password")}
            />
            <CustomInput 
                id="confirmPassword" 
                label="Confirm Password:"
                type="password" 
                inputBoxStyle={inputBoxStyle} 
                labelStyle={labelStyle} 
                inputStyle={inputStyle}
                {...register("confirmPassword")}
            />
            <div className={buttonBoxStyle}>
                <Link to="/auth?mode=signin">
                    <button 
                      className={textBtnStyle} 
                      type="button"
                    >
                      Login
                    </button>
                </Link>
                <button 
                  className={submitBtnStyle} 
                  type="submit"
                  >
                    Submit
                  </button>
            </div>
          </form>
        </div>
        <img 
          className={"h-80 w-60 pt-10 max-sm:hidden"} 
          src={pikachu} 
          alt="pikachu"
        />
      </div>
      <div className={errorsContainerStyle}>
        {Object.keys(errors).length>0 &&
          Object.keys(errors).map(item=>
            <p key={item}>
              *{item.toUpperCase()}: {errors[item].message}
            </p>
          )
        }
      </div>
    </div>
  );
}