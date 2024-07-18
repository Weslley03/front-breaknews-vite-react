import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/card/Card";
import { commentNews, getNewsByIdService } from "../../services/postsService";
import { Header, SectionComments, Container, ProfileAvatarRead, CaixaComentario, CaixaTexto} from "./ReadNewsStyled";
import { UserContext } from "../../context/UserContext";
import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "../../Schemas/CommentSchema";
import { ErrorSpan } from "../../components/navbar/NavbarStyled";
import { CommentArea } from "../../components/commentArea/CommentArea.jsx";
import { any } from "zod";


function ReadNews() {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [commentValue, setCommentValue] = useState('');
  const { user } = useContext(UserContext);

  const {
    register: registerComment,
    handleSubmit: handleRegisterComment,
    setValue,
    reset,
    formState: { errors: errorsRegisterComment }
} = useForm({resolver: zodResolver(CommentSchema)})


 async function handleFormSubmit(data) {
    try{
        await commentNews(id, data)
        reset()
        setCommentValue('')
    }catch(err){
        console.error(err)
    }
 }

  async function findNews() {
    try{
        const newsResponse = await getNewsByIdService(id)
        if(newsResponse.data && newsResponse.data.noticia){
            setNews(newsResponse.data.noticia);
          }
    }catch(err){
        console.error('houve um erro no front, ' + err)
    }
  }

  useEffect(() => {
    findNews()
  }, [])

  return (
    <>
        <section>
        <Header>{news && 
            <Card   
                title={news.title}
                text={news.text}
                banner={
                    news.banner
                    ? news.banner.startsWith('data:')
                        ? news.banner
                        : `data:image/*;base64,${news.banner}`
                    : ''
                }
                likes={news.likes}
                id={news.id}
                comments={news.comments}
                actions={false}
            />}
            </Header>
        </section>

        <SectionComments>
            <Container>
            <h1>comments:</h1>
            <div>
                <CaixaComentario>
                        <ProfileAvatarRead src={user.avatar} alt="avatar do user" />
                        <h3>@{user.userName} </h3>
                </CaixaComentario>
                <CaixaTexto>
                    <form onSubmit={handleRegisterComment(handleFormSubmit)}>
                        <CommentArea  
                            type='text'
                            placeholder='escreva seu comentario'
                            name='comment'
                            register={registerComment}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            isInput={false}
                        />
                        
                        {errorsRegisterComment.comment && (<ErrorSpan> {errorsRegisterComment.comment.message} </ErrorSpan>)}
                        
                        <Button type='submit' text='comentar' />
                    </form>
                </CaixaTexto>
            </div>
            </Container>
        </SectionComments>  
    </>
  );
}

export default ReadNews;
