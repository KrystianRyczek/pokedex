import './App.css'
import Grow from './components/notistack/Grow.jsx';
import { lazy, Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import { SnackbarProvider} from 'notistack';
const RootLayout = lazy(()=>(import('./components/RootLayout.jsx')))
import { loader as rootLoader} from './components/RootLayout.jsx'
const Home = lazy(()=>(import('./components/subpages/Home.jsx')))
import { loader as homeLoader} from './components/RootLayout.jsx'
const Auth = lazy(()=>(import('./components/subpages/Auth.jsx')))
import { action as authAction } from './components/subpages/Auth.jsx'
const Favorite  = lazy(()=>(import('./components/subpages/Favorite.jsx')))
const Ranking  = lazy(()=>(import('./components/subpages/Ranking.jsx')))
const Arena  = lazy(()=>(import('./components/subpages/Arena.jsx')))
import{action as arenaAction} from './components/subpages/Arena.jsx'
const Edit = lazy(()=>(import('./components/subpages/Edit.jsx')))
const AddPokemon  = lazy(()=>(import('./components/subpages/AddPokemon.jsx')))
import { loader as addPokemonLoader, action as addPokemonAction } from './components/subpages/AddPokemon.jsx';
import { loader as logoutLoader } from './components/subpages/Logout.jsx'
const Pokemon = lazy(()=>(import('./components/subpages/Pokemon.jsx')))
import { loader as pokemonLoader, action as editPokemonAction} from './components/subpages/Pokemon.jsx'
const ErrorPage = lazy(()=>(import('./components/subpages/ErrorPage.jsx')))

function App() {

  const route = [
    {
      path: "/",
      id:'rootLoader',
      loader: rootLoader,
      element: <Suspense><RootLayout/></Suspense>,
      hydrateFallbackElement:<p>is Loading</p>,
      //errorElement: <Suspense><ErrorPage/></Suspense>,
      children: [
        {
          index:true,
          loader:homeLoader,
          element:<Suspense><Home/></Suspense>,
        },
        {
          path:'auth',
          action: authAction,
          element: <Suspense><Auth/></Suspense>,
        },
                {
          path:'favorite',
          element: <Suspense><Favorite/></Suspense>,
        },
                {
          path:'ranking',
          element: <Suspense><Ranking/></Suspense>,
        },
        {
          path:'arena',
          action:arenaAction,
          element: <Suspense><Arena/></Suspense>,
        },
        {
          path:'edit',
          children:[
            {
              index:true,
              element: <Suspense><Edit/></Suspense>,
            },
            {
              path:'new',
              loader: addPokemonLoader,
              action: addPokemonAction,
              element: <Suspense><AddPokemon/></Suspense>,
            },
            {
              path:'pokemon/:id',
              loader:pokemonLoader,
              action:editPokemonAction,
              element: <Suspense><Pokemon/></Suspense>,
            },
          ]
        },
        {
          path:'pokemon/:id',
          loader:pokemonLoader,
          action:editPokemonAction,
          element: <Suspense><Pokemon/></Suspense>,
        },
        {
          path:'logout',
          loader: logoutLoader,
        },
        
      ]
    }
  ]

  const router = createBrowserRouter(route);


  return (
    <SnackbarProvider TransitionComponent={Grow}>
      <RouterProvider router ={router}/>
    </SnackbarProvider>
  )
}

export default App
