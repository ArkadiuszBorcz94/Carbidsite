import { auth } from "@/auth";
import { headers } from "next/headers";

const baseUrl='http:/localhost:6001/';

//funkcja odpowiada za wywietlanie danych na stornie 
// wysyłami z każdym żądaniem token w celu weryfikacji czy można 

async function get (url: string)
{
        const requestOptions={
        method: 'GET',
        headers: await getHeaders(),
        }
    const response=await fetch(baseUrl + url, requestOptions);

    return await handleResponse(response);
}

// wysyłami z każdym żądaniem token w celu weryfikacji czy można 
async function post (url: string, body:{})
{
        const requestOptions={
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
        }
    const response=await fetch(baseUrl + url, requestOptions);

    return await handleResponse(response);
}
async function put (url: string, body:{})
{
    const requestOptions={
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(body)
    }
const response=await fetch(baseUrl + url, requestOptions);

return await handleResponse(response);
}

async function del (url: string)
{
        const requestOptions={
        method: 'DELETE',
        headers: await getHeaders(),
       
        }
    const response=await fetch(baseUrl + url, requestOptions);

    return await handleResponse(response);
}





// funkcja wydobywa token uwierzytelnniający z sesji


async function getHeaders(){
const session =await auth();
const headers={
'Content-type' :'application/json'} as any;
if (session?.accessToken){
   headers.Authorization = 'Bearer ' + session.accessToken


}
return headers;

}

// funkcja w panelu profilu która przepowadza test autoryzacji 
async function handleResponse(response: Response) {
   const text= await response.text();

   
   const data=text && JSON.parse(text);


   if (response.ok){

    return data || response.statusText
   } else{
        const error = {
            status: response.status,
            message: response.statusText


        }
    
    return {error};
    }
   }

export const wrapperOfFetches={

    get,
    post,
    put,
    del

}


