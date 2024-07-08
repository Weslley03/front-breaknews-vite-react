import axios from 'axios'
import Cookies from 'js-cookie'

//const baseUrl = 'https://api-break-news.onrender.com'
const baseUrl = 'http://localhost:3000'

export async function getAllNews() {
    const response = await axios.get(`${baseUrl}/news/getall`);
    return response;       
}   

export async function getTopPost() {
    const response = await axios.get(`${baseUrl}/news/top`);
    return response;
}

export function findByTitle(title) {
    const response = axios.get(`${baseUrl}/news/search?title=${title}`); 
    return response;
}

export function findByUser(){
    const response = axios.get(`${baseUrl}/news/byUser`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return response;
}

export async function createNews(data){
    
    if(data.banner.length === 0){
        const body = {
            ...data,
            banner: 'https://i.imgur.com/XbRg9D7.png'
        }
        const response = await axios.post(`${baseUrl}/news/create`, body, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }) 
        return response;
    }

    const response = await axios.post(`${baseUrl}/news/create`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
        }
    }) 
    return response;
}

export function getNewsByIdService(id){
    const response = axios.get(`${baseUrl}/news/findId/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return response;
}

export function editNews(data, id){
    const response = axios.patch(`${baseUrl}/news/upadate/${id}`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return response;
}

export function deleteNews(id){
    const response = axios.delete(`${baseUrl}/news/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return response;
}

export async function likedNews(idNew){
    try{
        const response = await axios.patch(`${baseUrl}/news/like/${idNew}`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        
        return response
    }catch(err){
        if(err.response && err.response.status === 401){
            return
        }
        return console.log('caiu no service do front, ', err)
    }
}

export async function likecheck(idNew){
    try{
        const response = await axios.get(`${baseUrl}/news/likecheck/${idNew}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response;
    }catch(err){
        res.status(500).send(err.message);
    }
}
