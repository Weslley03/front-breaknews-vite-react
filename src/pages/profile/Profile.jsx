import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileIconEdit,
  ProfileBackground,
  ProfileUser,
  ProfileAvatar,
  ProfileActions,
  ProfileIconAdd,
  ProfileNews
} from "./ProfileStyled.jsx";
import { findByUser } from "../../services/postsService.js";
import { Card } from '../../components/card/Card.jsx'
import { Link } from "react-router-dom";

export function Profile() {
  const { user } = useContext(UserContext);
  const [ news, setNews ] = useState([])

  async function findUserNews(){
    const responseNews = await findByUser()
    setNews(responseNews.data)
  }
  
  useEffect(() => {
    findUserNews()
  }, [])

  return (
    <ProfileContainer>
      <ProfileHeader>
          <ProfileIconEdit>
            <i className="bi bi-pencil-square"></i>
          </ProfileIconEdit>

        <ProfileBackground src={user.background} alt="background do user" />

        <ProfileUser>
          <ProfileAvatar src={user.avatar} alt="avatar do user" />
          <h2> {user.name} </h2>
          <h3>@{user.userName} </h3>
          </ProfileUser>

          <ProfileActions>
              <Link to={"/manage-news/add/news"}>
                <ProfileIconAdd>
                  <i className="bi bi-plus-circle"></i>
                </ProfileIconAdd>
              </Link>
          </ProfileActions>

      </ProfileHeader>

      <ProfileNews>
            { news.length === 0 && <h3>você ainda não criou nenhuma noticia...</h3> }

            {news.map((element) => {
              return(
                <Card
                  key={element.id}
                  id={element.id}
                  title={element.title}
                  text={element.text}
                  banner={element.banner}
                  likes={element.likes}
                  comments={element.comments}  
                  actions={true}
                />
              )
            })}
          </ProfileNews> 

    </ProfileContainer>
  );
}
