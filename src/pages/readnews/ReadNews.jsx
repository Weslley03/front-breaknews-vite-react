import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/card/Card";
import { getNewsByIdService } from "../../services/postsService";
import { Header } from "./ReadNewsStyled";

function ReadNews() {
  const { id } = useParams();
  const [news, setNews] = useState({});

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
  );
}

export default ReadNews;
