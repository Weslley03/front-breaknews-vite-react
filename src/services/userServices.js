import axios, { Axios } from "axios";
import Cookies from "js-cookie";

const baseUrl = 'https://api-break-news.onrender.com'

export function signin(data){
    const response = axios.post(`${baseUrl}/auth`, data)
    return response;
}

export function signup(data){
    delete data.confirmpassword;
    const body = {
        ...data, 
        userName: generateUsername(data.name), 
        avatar: 'https://imgur.com/xmI2QAo',
        background: 'https://imgur.com/gallery/then-they-started-shouting-wrtqcMM'
    }
    
    const response = axios.post(`${baseUrl}/users/create`, body)
    return response;
}

export function userLogged(){
    const response = axios.get(`${baseUrl}/users/findById`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return response;
}

function generateUsername(name){ //gerador de username aleatorio
    const noSpaceAndLowerCase = name.replace(/\s/g, "").toLowerCase();
    const ramdonNumber =  Math.floor(Math.random() * 1000);  
    return `${noSpaceAndLowerCase}${ramdonNumber}`
}