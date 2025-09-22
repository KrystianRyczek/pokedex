import { useActionData, useFetcher, useNavigate, useSearchParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import {fetchGetDataJsonServer, fetchActionJsonServer} from '../../services/fetch.js'
import SignupForm from '../shared/SignupForm.jsx';
import LoginForm from '../shared/LoginForm.jsx';
import Grow from '../notistack/Grow'


export default function Auth() {
    const [searchParams] = useSearchParams()
    const fetcher = useFetcher()
    const actionResposn = useActionData()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const isLogin = searchParams.get('mode') === 'login';
    const isSignup = searchParams.get('mode') === 'signup';
    const fetcherRespons = fetcher.data?JSON.parse(fetcher?.data):fetcher
    const actionData = actionResposn?JSON.parse(actionResposn):actionResposn

    const options={
        autoHideDuration: 6000,
        anchorOrigin:{ vertical: 'top', horizontal: 'center' },
        TransitionComponent: Grow
    }


    useEffect(()=>{
    if(fetcherRespons?.actionSucceed===false){
            const message= fetcherRespons?.serverErrorMessage
            const key = enqueueSnackbar(
                { message, ...options,  variant: 'error'})      
    }else if(fetcherRespons?.actionSucceed===true){
            const message= fetcherRespons?.serverMessage
            const key = enqueueSnackbar(
                { message, ...options, variant: 'success' })
            navigate("/")  
    }},[fetcher])

    useEffect(()=>{
        if( actionData?.actionSucceed===false){
            const message= actionData?.serverErrorMessage
            const key = enqueueSnackbar(
                { message, ...options,  variant: 'error'})      
        }else if( actionData?.actionSucceed===true){
            const message= actionData?.serverMessage
            const key = enqueueSnackbar(
                { message, ...options, variant: 'success' })
            navigate("/")  
        }
    },[actionData])

  return (
    <>
        {isLogin&&<LoginForm/>}
        {isSignup&&<SignupForm fetcher={fetcher}/>}
    </>
  );
}

export const action = async ({request}) => {

    const searchParams = new URL(request.url).searchParams.get('mode')

    if(searchParams === 'login'){
        const formData = await request.formData();
        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        const url = `http://localhost:8000/user?email=${userData.email}`
        const msgOnFail ="Incorrect user credentials!"
        const msgOnSucceed= "User login successfully"
        const respons = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
        const usersCredentials = respons.serverData
       
        if(usersCredentials.some(user=>user.password==userData.password)){
            localStorage.setItem('token', 'example-token')
            localStorage.setItem('userName', `${usersCredentials[0].name}`)
            return new Response(JSON.stringify(
                {actionSucceed:true, serverMessage: "User login successfully"}),
                {status:200})
        }     
        return new Response(JSON.stringify(
            {actionSucceed:false, serverErrorMessage: "Incorrect user credentials!"}),
            {status:401})
    }else{
        const userData = await request.json()
        const url = `http://localhost:8000/user?email=${userData.email}`
        const msgOnFail ="Something went wrong!"
        const msgOnSucceed= "User exist!"
        const respons = await fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed})
        const userCredentials = respons.serverData
        
        if(userCredentials.length>0){
            
            return new Response(JSON.stringify(
                { actionSucceed: false, serverErrorMessage: "User exist!"}),
                {status:401})
        }else{
            const url=`http://localhost:8000/user`
            const msgOnFail= 'Could not add new user!'
            const msgOnSucceed= 'New user added!'
            const body = userData
            const addRespons = await fetchActionJsonServer(
                {url, body, msgOnFail, msgOnSucceed})
            if(addRespons.actionSucceed){
                return new Response(JSON.stringify(
                    addRespons),
                    {status:200})
            }
        }
    }    
}
