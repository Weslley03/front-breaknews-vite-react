import axios from 'axios'
import Cookies from 'js-cookie'

const baseUrl = 'https://api-break-news.onrender.com'

export function getAllNews() {
    const response = axios.get(`${baseUrl}/news/getall`);
    return response;       
}   

export function getTopPost() {
    const response = axios.get(`${baseUrl}/news/top`);
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

export function createNews(data){
    const response = axios.post(`${baseUrl}/news/create`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
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

export function editNewsSubmit(data, id){
    const response = axios.patch(`${baseUrl}/news/upadate/${id}`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return response;
}