import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import { avatarUndefined, backgroundUndefined } from "../Datas";

const baseUrl = 'https://api-break-news.onrender.com'
//const baseUrl = 'http://localhost:3000'

export async function signin(data){
    try{
        const response = await axios.post(`${baseUrl}/auth`, data)
        return response;
    }catch(err){
        if(err.response){
            throw new Error(err.response.data.message || 'houve um erro desconhecido')
        } else if(err.request) {
            throw new Error('sem resposta do servidor')
        }else {
            throw new Error('houve um erro na req', err.message)
        }
    }
}

export function signup(data){
    delete data.confirmpassword;
    const body = {
        ...data, 
        userName: generateUsername(data.name), 
        avatar: avatarUndefined,
        background: backgroundUndefined
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

export function findUserByIdService(id){
    const response = axios.get(`${baseUrl}/users/findbyidsimple/${id}`)
    return response;
}

export function editProfile(id, data){
    const response = axios.patch(`${baseUrl}/users/findByIdUpdate/${id}`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return response;
}

function generateUsername(name){ //gerador de username aleatorio
    const noSpaceAndLowerCase = name.replace(/\s/g, "").toLowerCase();
    const ramdonNumber =  Math.floor(Math.random() * 1000);  
    return `${noSpaceAndLowerCase}${ramdonNumber}`
}

