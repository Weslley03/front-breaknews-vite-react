import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/card/Card";
import { getNewsByIdService } from "../../services/postsService";
import { Header, SectionComments, Container, ProfileUserRead, ProfileAvatarRead, CaixaComentario, CaixaTexto, CommentArea } from "./ReadNewsStyled";
import { UserContext } from "../../context/UserContext";
import { Button } from "../../components/Button/Button";


function ReadNews() {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const { user } = useContext(UserContext);

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
                    <form>
                        <CommentArea  
                            type='text'
                            placeholder='escreva seu comentario'
                            name='comment'
                        />
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
