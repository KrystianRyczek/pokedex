
export async function fetchGetDataFunction({url, method='GET', msgOnFail}) {

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    },)
    const serverData= await response.json()
    if (!response.ok) {
        if(response.status===404){
            throw new Response(JSON.stringify(
                {actionSucceed:false, ...serverData}), 
                {status:response.status})
        }
        return new Response(JSON.stringify(
            {actionSucceed:false, serverErrorMessage: msgOnFail, serverData}), 
            {status:500})
    } else {
        return serverData
    }
}

export async function fetchGetDataJsonServer({url, msgOnFail, msgOnSucceed}){
        const response = await fetch(url,
            {
            method: "GET",
            }
        )
        const serverData = await response.json()
        if (!response.ok) {
        if(response.status===404){
            throw new Response(JSON.stringify(
                {actionSucceed:false, ...serverData}), 
                {status:response.status})
        }
        return new Response(JSON.stringify(
            {actionSucceed:false, serverErrorMessage: msgOnFail, serverData }), 
            {status:500})
    } else {
        
        
        return {actionSucceed:true, serverMessage: msgOnSucceed, serverData}
    }

}
export async function fetchActionJsonServer ({url, method="POST", body, msgOnFail, msgOnSucceed}){
        
    const response = await fetch(url,
        {
        method,
        body:JSON.stringify(body),
        }
    )
    const serverData = await response.json()
    if(!response.ok){
        if(response.status===404){
            throw new Response(JSON.stringify(
                {actionSucceed:false, ...serverData}), 
                {status:response.status})
        }
        return new Response(JSON.stringify(
            {actionSucceed:false, serverErrorMessage: msgOnFail, serverData}), 
            {status:500})
    }else{

        return {actionSucceed:true, serverMessage: msgOnSucceed}
    }

}