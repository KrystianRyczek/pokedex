import { NavLink, Link} from 'react-router-dom';
import logo from "../../assets/logo.png"
import { useState } from 'react';
import { clsx } from 'clsx'

export default function MainNavigation() {
    
    const userName = localStorage.getItem('userName')
    const [open, setOpen] = useState(false)
    const menuClickHandler = ()=>{
        setOpen(prevState=>!prevState)
    }

    const navContainerStyle = "w-full flex flex-col justify-end mt-4 z-99"
    const logoContainerStyle = "flex justify-between md:pl-10 pl-3"
    const logoImgStyle = "w-80 max-md:w-50"
    const setupContainerStyle = "w-auto flex"
    const themeContainerStyle="flex gap-4 md:text-xl text-xs"
    const userIconStyle="h-7 w-8 fill-stone-800 dark:fill-stone-200"
    const logoutBtnStyle="flex w-auto h-6 max-md:h-4 justify-end md:text-xl text-xs max-sm:hidden mr-4"
    const navListStyle = "flex gap-9 justify-center text-4xl max-md:text-2xl max-sm:hidden mr-4"
    const hambugrerLinkListStyle = 'text-stone-900 dark:text-stone-200 text-start pl-10 pb-20'
    const navLinkStyle = "underline text-stone-600 dark:text-stone-400"
    const hamburgerMenueStyle = clsx("dark:bg-stone-800 bg-stone-200 shadow-md sm:hidden", !open && "hidden" )
    const hamburgerHeaderBox = "container mx-auto flex justify-between items-center p-4"
    const hamburgerMenuBtnTypeStyle = clsx("flex gap-4 ml-3 mt-3 sm:hidden absolute -top-2 ", open && "hidden t")
    const closeMenuBtnStyle = "text-stone-900 dark:text-stone-200"
    const closeMenuBtnIconStyle = clsx("w-6 h-6")
    const hamburgerMenueBoxStyle= clsx('absolute top-0 -left-80 transform transition-transform duration-300', open && "w-80 translate-x-100/100" )
    const logoutLinkStyle = 'w-full h-full md:text-xl text-xs' 
    const greetingStyle = 'max-sm:pr-5'
    return (
            <div className={navContainerStyle}>
                <button 
                    onClick={menuClickHandler} 
                    className={hamburgerMenuBtnTypeStyle}
                >
                    <svg 
                        className="h-10 w-10" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </button>
                <div className={hamburgerMenueBoxStyle}>
                    <div className={hamburgerMenueStyle}>
                        <div className={hamburgerHeaderBox}>
                            <Link to="/">
                                <img className="h-10" src={logo} alt="logo"/>        
                            </Link>
                            <button 
                                onClick={menuClickHandler} 
                                className={closeMenuBtnStyle}
                            >
                                <svg 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5"
                                    stroke="currentColor" 
                                    className={closeMenuBtnIconStyle}
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul 
                                className={hambugrerLinkListStyle} 
                                onClick={menuClickHandler}
                            >
                                <li>
                                    <NavLink 
                                        to="/favorite" 
                                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                                    >
                                        Favorite
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/arena" 
                                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                                    >
                                        Arena
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/ranking" 
                                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                                    >
                                        Ranking
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/edit" 
                                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                                    >
                                        Edit
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/logout" 
                                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
            <div className={logoContainerStyle}>
                <NavLink to="/">
                    <img className={logoImgStyle} src={logo} alt="logo"/>        
                </NavLink>
                <div className={setupContainerStyle}>
                    <svg className={userIconStyle}>
                        <path 
                            className='scale-80' 
                            d="M30 19l-9 9-3-3-2 2 5 5 11-11z"
                        />
                        <path 
                            className='scale-80' 
                            d="M14 24h10v-3.598c-2.101-1.225-4.885-2.066-8-2.321v-1.649c2.203-1.242 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h14v-2z"
                        />
                    </svg>
                    <div className={themeContainerStyle}>
                            <p className={greetingStyle}>
                                Hi {userName}!
                            </p>
                            <button className={logoutBtnStyle}>
                                <NavLink 
                                    className={logoutLinkStyle}
                                    to="/logout"
                                >
                                    Logout
                                </NavLink>
                            </button>
                    </div>

                </div>
            </div>
            <ul className={navListStyle}>
                <li>
                    <NavLink 
                        to="/favorite" 
                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                    >
                        Favorite
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/arena" 
                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                    >
                        Arena
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/ranking" 
                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                    >
                        Ranking
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/edit" 
                        className={({ isActive }) => isActive ? navLinkStyle : ""}
                    >
                        Edit
                    </NavLink>
                </li>
            </ul>
        </div>


    );
}