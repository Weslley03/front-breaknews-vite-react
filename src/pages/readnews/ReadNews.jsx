import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/card/Card";
import {
  commentNews,
  findCommentsNews,
  NewsByIdSimpleService,
} from "../../services/postsService";
import {
  Header,
  SectionComments,
  Container,
  ProfileAvatarRead,
  CaixaComentario,
  CaixaTexto,
  UserLoggedDiv,
} from "./ReadNewsStyled";
import { UserContext } from "../../context/UserContext";
import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "../../Schemas/CommentSchema";
import { ErrorSpan } from "../../components/navbar/NavbarStyled";
import { CommentArea } from "../../components/commentArea/CommentArea.jsx";
import { findUserByIdService } from "../../services/userServices.js";

function ReadNews() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [avatarLogged, setAvatarLogged] = useState(user?.avatar || null);
  const [userNameLogged, setUserNameLogged] = useState(user?.userName || null);
  const [news, setNews] = useState({});
  const [commentValue, setCommentValue] = useState("");
  const [avatars, setAvatars] = useState({});
  const [logged, setLogged] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register: registerComment,
    handleSubmit: handleRegisterComment,
    setValue,
    reset,
    formState: { errors: errorsRegisterComment },
  } = useForm({ resolver: zodResolver(CommentSchema) });

  async function verifyUserLogged() {
    if (!user) {
      return setLogged(false);
    } else {
      setAvatarLogged(user.avatar);
      setUserNameLogged(user.userName);
      setLogged(true);
      return;
    }
  }

  async function handleFormSubmit(data) {
    try {
      await commentNews(id, data);
      setCommentValue("");
      findComments();
    } catch (err) {
      console.error(err);
    }
  }

  async function findNews() {
    try {
      const newsResponse = await NewsByIdSimpleService(id);
      if (newsResponse.data && newsResponse.data.noticia) {
        setNews(newsResponse.data.noticia);
      }
    } catch (err) {
      console.error("houve um erro no front, " + err);
    }
  }

  async function puxarAvatar(idUser) {
    try {
      const userResponse = await findUserByIdService(idUser);
      return userResponse.data.avatar;
    } catch (err) {
      console.error("erro ao buscar avatar: ", err);
      return "";
    }
  }

  async function findComments() {
    try {
      const commentsNews = await findCommentsNews(id);
      if (!commentsNews) {
        return console.error("não deu bom executar a função findCommentsNews");
      }
      const commentsData = commentsNews.data.news.comments;
      setComments(commentsData);

      const avatarsData = {};
      for (const comment of commentsData) {
        const avatar = await puxarAvatar(comment.userId);
        avatarsData[comment.userId] = avatar;
      }
      setAvatars(avatarsData);
    } catch (err) {
      console.error("houve um erro no front, " + err);
    }
  }

  useEffect(() => {
    async function initialize() {
      await verifyUserLogged();
      await findNews();
      await findComments();
      setLoading(false);
    }
    initialize();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>carregando...</p>
      </div>
    );
  } 

  return (
    <>
      <section>
        <Header>
          {news && (
            <Card
              title={news.title}
              text={news.text}
              banner={
                news.banner
                  ? news.banner.startsWith("data:")
                    ? news.banner
                    : `data:image/*;base64,${news.banner}`
                  : ""
              }
              likes={news.likes}
              id={news.id}
              comments={news.comments}
              actions={false}
            />
          )}
        </Header>
      </section>

      <SectionComments>
        <Container>
          <h1>comments:</h1>
          {logged && (
            <UserLoggedDiv>
              <CaixaComentario>
                <ProfileAvatarRead src={avatarLogged} alt="avatar do user" />
                <h3>@{userNameLogged}</h3>
              </CaixaComentario>
              <CaixaTexto>
                <form onSubmit={handleRegisterComment(handleFormSubmit)}>
                  <CommentArea
                    type="text"
                    placeholder="escreva seu comentario"
                    name="comment"
                    register={registerComment}
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    isInput={false}
                  />

                  {errorsRegisterComment.comment && (
                    <ErrorSpan>
                      {" "}
                      {errorsRegisterComment.comment.message}{" "}
                    </ErrorSpan>
                  )}

                  <Button type="submit" text="comentar" />
                </form>
              </CaixaTexto>
            </UserLoggedDiv>
          )}
        </Container>
      </SectionComments>

      <section>
        <Header>
          {comments.map((item) => {
            const imgUserComment = avatars[item.userId];
            return (
              <div key={item.createdAt}>
                <CaixaComentario>
                  {imgUserComment && (
                    <ProfileAvatarRead
                      src={imgUserComment}
                      alt="avatar do comentarista"
                    />
                  )}
                  <p> --- {item.comment} </p>
                </CaixaComentario>
              </div>
            );
          })}
        </Header>
      </section>
    </>
  );
}

export default ReadNews;
