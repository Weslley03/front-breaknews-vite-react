import axios from 'axios'
import Cookies from 'js-cookie'

const baseUrl = 'https://api-break-news.onrender.com'

export async function getAllNews() {
    const response = await fetch(`${baseUrl}/news/getall`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = ''
    
    while(true){
        const { done, value } = await reader.read();
        if(done) break;
        result += decoder.decode(value, {stream: true});
    }
    const items = result.trim().split('\n').map(line => JSON.parse(line));
    return items;
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