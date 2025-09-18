import { Outlet, redirect, useLoaderData} from "react-router";
import MainNavigation from "./shared/MainNavigation.jsx";
import { useContext } from 'react';
import { appContext } from '../store/appContext';

export default function RootLayout(){
    const loaderResponse = useLoaderData()
    const userIsLogin = loaderResponse?.userIsLogin;
    
    const {darkMode, setDarkMode}= useContext(appContext)

    const themeToggleHandler = ()=>{
        setDarkMode(prevTheme=>!prevTheme)
    }


    const mainStyle="relative md:w-7xl sm:w-md w-xs min-h-480 flex flex-col mx-auto bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-white"
    const themetogglelabelStyle="inline-flex gap-2 items-center cursor-pointer ml-auto mr-4 mt-2"
    const themeToggleStyle ="relative flex justify-between px-2 md:w-17 w-7 md:h-6 h-4  bg-gray-600 dark:bg-gray-200 peer-focus:outline-none peer-focus:ring-gray-700 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-200 dark:after:bg-gray-700 after:rounded-full md:after:h-5 after:h-3 md:after:w-8 after:w-3 after:transition-all"

    return(
        <main className={mainStyle}>
            <div className="flex">
                <label className={themetogglelabelStyle}>
                    <span className="md:text-xl text-xs">Light</span>
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        onChange={themeToggleHandler}
                        checked={darkMode}
                    />
                    <div className={themeToggleStyle}>
                    </div>                    
                    <span className="md:text-xl text-xs">Dark</span>
                </label>
            </div>
            {userIsLogin ? <MainNavigation />:undefined}
            <Outlet />
        </main>
        
    )
}

export const loader = ({request, params}) => {
    const searchParams = new URL(request.url).searchParams.get('mode')
    const token = localStorage.getItem('token');

    if(!token && (searchParams!=='login'&& searchParams!=='signup')){
        return redirect('auth?mode=login');
    }
    if(token){
          return {
                userIsLogin:true
            };
    }  
}