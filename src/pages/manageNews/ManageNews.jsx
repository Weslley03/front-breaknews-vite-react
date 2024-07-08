import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from '../../Schemas/NewsSchema.js'
import { ErrorSpan } from "../../components/navbar/NavbarStyled.jsx";
import { createNews, getNewsByIdService, editNews, deleteNews } from "../../services/postsService.js";
import { Input } from "../../components/InputCompo/Input.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useEffect, useState } from "react";

export default function ManageNews(){
    
    const nami = useNavigate()
    const { action, id } = useParams();
    const [ imageBase64, setImageBase64 ] = useState('')
    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
        setValue,
        formState: { errors: errorsRegisterNews }
    } = useForm({resolver: zodResolver(NewsSchema)})

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]
                setImageBase64(base64String)    
            }
            reader.readAsDataURL(file)
        }
    }

    async function handleFormSubmit (data){
        try{
            data.banner = imageBase64   
            await submitData(data)
        }catch(err){
            console.log(err)
        }
    }

    async function submitData(data){
        try{    
            if(action === 'add'){
                await createNews(data)
            } else if (action === 'edit'){
                await editNews(data, id)
            } else if(action === 'delete'){
                await deleteNews(id)
            }
            nami('/profile')
        }catch(err){
            console.log(err)
        }
    }

    async function editNewsSubmit(data){
        try{
            await editNews(data, id)
            nami('/profile')
        }catch(err){
            console.log(err)
        } 
    }
    
    async function deleteNewsSubmit(){
        try{
            await deleteNews(id)
            nami('/profile')
        }catch(err){
            console.log(err)
        } 
    }

    async function getNewsById(id){
        try{
            const { data } = await getNewsByIdService(id);
            setValue('title', data.noticia.title)
            setValue('banner', data.noticia.banner)
            setValue('text', data.noticia.text)
            setImageBase64(data.noticia.banner)
        }catch(err){
            console.log(err)
        }
    } 

    useEffect(() => {
        if(action === 'edit' || action === 'delete') {
            getNewsById(id)
        }
    }, [action, id])

    return(
        <AddNewsContainer>
            <h2>{ action == 'add' ? 'adicionar' : action == 'edit' ? 'atualizar' : 'delete'} Notícias</h2>
            <form onSubmit={handleRegisterNews(handleFormSubmit)}>
            <Input  
                type='text'
                placeholder='titulo'
                name='title'
                register={registerNews}
                disabled={action === 'delete'}
            />
            {errorsRegisterNews.title && (<ErrorSpan> {errorsRegisterNews.title.message} </ErrorSpan>)}

            <Input
                type='file'
                placeholder='imagem'
                name='banner'
                accept="image/*"
                onChange={handleImageChange}
                register={registerNews}
                disabled={action === 'delete'}
            />
            {errorsRegisterNews.banner && (<ErrorSpan> {errorsRegisterNews.banner.message} </ErrorSpan>)}

            <Input  
                type='text'
                placeholder='texto'
                name='text'
                register={registerNews}
                isInput={false}
                disabled={action === 'delete'}
            />
            {errorsRegisterNews.text && (<ErrorSpan> {errorsRegisterNews.text.message} </ErrorSpan>)}

            <Button type='submit' text={action === 'add' ? 'adicionar' : action === 'edit' ? 'editar' : 'apagar'}/>

            </form>
        </AddNewsContainer>
    )
}