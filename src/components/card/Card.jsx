import { TextLimit } from "../textLimit/textLimit";
import { CardBody, CardContainer, CardHeader, CardFooter } from "./CardStyled";
import { Link } from "react-router-dom";
import { likedNews, likecheck } from '../../services/postsService.js'
import { useEffect, useState } from "react";

export function Card({top, title, text, likes, comments, banner, actions= false, id }) {

  const [ localLikes, setLocalLikes ] = useState(likes?.length || 0)
  const [ isLiked, setIsLiked ] = useState(false)

  useEffect( () => {
    setLocalLikes(likes?.length || 0)
  }, [id])

  async function handleLike(){
      try{ 
        if(isLiked){
          const disLike = await likedNews(id)
          if(disLike){
            const response = await likecheck(id) 
            setLocalLikes(response.data.liked.length)
            setIsLiked(false)
          } else{
            console.log('não foi possível descurtir a publicação');
          }
        } else {
          const liked = await likedNews(id)
          if(liked){
            const response = await likecheck(id) 
            setLocalLikes(response.data.liked.length)
            setIsLiked(true)
          }else{
            console.log('não foi possivel curtir a publicação')
          }
        } 
      }catch(err){
        console.log('caiu no erro card component, função handleLike, ', err)
      }
  }

  return (
    <CardContainer>
      <CardBody>
        <div>
          <CardHeader $top={top}>
            {actions && 
            <span>
            <Link to={`/manage-news/edit/${id}`}> 
              <i className="bi bi-pencil-square"></i>
            </Link>

            <Link to={`/manage-news/delete/${id}`}> 
              <i className="bi bi-trash3"></i>
            </Link>
            </span>
            }
            <h2>{title}</h2>
            <TextLimit text={text} limit={150} />
          </CardHeader>

          <CardFooter>
            <section>
              <i className="bi bi-heart" onClick={handleLike}></i>
              <span>{localLikes}</span>
            </section>

            <section>
              <i className="bi bi-chat-dots"></i>
              <span>{comments?.length}</span>
            </section>
          </CardFooter>
        </div>
        <img src={banner} alt="imagem" />
      </CardBody>
    </CardContainer>
  );
}
