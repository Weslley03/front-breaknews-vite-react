import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from '../../Schemas/NewsSchema.js'
import { ErrorSpan } from "../../components/navbar/NavbarStyled.jsx";
import { createNews } from "../../services/postsService.js";
import { Input } from "../../components/InputCompo/Input.jsx";
import { Button } from "../../components/Button/Button.jsx";

export default function ManageNews(){
    
    const nami = useNavigate()
    const { action } = useParams();
    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
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

    async function editrNewsSubmit(data){
       /* try{
            await editNews(data)
            nami('/profile')
        }catch(err){
            console.log(err)
        } */
    }

    return(
        <AddNewsContainer>
            <h2>{ action == 'add' ? 'adicionar' : 'atualizar' } Notícias</h2>
            <form onSubmit={
                action == 'add'
                 ? handleRegisterNews(registerNewsSubmit)
                 : handleRegisterNews(editrNewsSubmit)
            }>
            
            <Input  
                type='text'
                placeholder='titulo'
                name='title'
                register={registerNews}
                value={action !== 'add' ? 'titulo' : ''}
            />
            {errorsRegisterNews.title && (<ErrorSpan> {errorsRegisterNews.title.message} </ErrorSpan>)}

            <Input
                type='text'
                placeholder='link da imagem'
                name='banner'
                register={registerNews}
                value={action !== 'add' ? 'banner link' : ''}
            />
            {errorsRegisterNews.banner && (<ErrorSpan> {errorsRegisterNews.banner.message} </ErrorSpan>)}

            <Input  
                type='text'
                placeholder='texto'
                name='text'
                register={registerNews}
                isInput={false}
                value={action !== 'add' ? 'text' : ''}
            />
            {errorsRegisterNews.text && (<ErrorSpan> {errorsRegisterNews.text.message} </ErrorSpan>)}

            <Button type='submit' text={action === 'add' ? 'adicionar' : 'editar'}/>

            </form>
        </AddNewsContainer>
    )
}