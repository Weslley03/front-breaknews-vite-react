import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from '../../Schemas/NewsSchema.js'
import { ErrorSpan } from "../../components/navbar/NavbarStyled.jsx";
import { createNews, getNewsByIdService, editNews, deleteNews } from "../../services/postsService.js";
import { Input } from "../../components/InputCompo/Input.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useEffect } from "react";

export default function ManageNews(){
    
    const nami = useNavigate()
    const { action, id } = useParams();
    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
        setValue,
        formState: { errors: errorsRegisterNews }
    } = useForm({resolver: zodResolver(NewsSchema)})
    
    async function registerNewsSubmit(data){
        try{
            await createNews(data)
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
        }catch(err){
            console.log(err)
        }
    } 

    useEffect(() => {
        if(action === 'edit' || action === 'delete') {
            getNewsById(id)
        }
    }, [])

    return(
        <AddNewsContainer>
            <h2>{ action == 'add' ? 'adicionar' : action == 'edit' ? 'atualizar' : 'delete'} Notícias</h2>
            <form onSubmit={
                action == 'add'
                 ? handleRegisterNews(registerNewsSubmit)
                 : action == 'edit' 
                 ? handleRegisterNews(editNewsSubmit)
                 : handleRegisterNews(deleteNewsSubmit)
            }>
            
            <Input  
                type='text'
                placeholder='titulo'
                name='title'
                register={registerNews}
                disabled={action === 'delete'}
            />
            {errorsRegisterNews.title && (<ErrorSpan> {errorsRegisterNews.title.message} </ErrorSpan>)}

            <Input
                type='text'
                placeholder='link da imagem'
                name='banner'
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