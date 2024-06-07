import { useState, useEffect } from "react";
import { Card } from "../../components/card/Card";
import { HomeBody, HomeHeader } from "./HomeStyled";
import { getAllNews, getTopPost } from "../../services/postsService";

export default function Home() {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [ loading, setLoading ] = useState(true)  

  async function findtNews() {
    const newsResponse = await getAllNews();
    setNews(newsResponse.data.results);

    const topNewsResponse = await getTopPost();
    setTopNews(topNewsResponse.data.news);
  }

  useEffect(() => {
    const buscarNoticias = async () => {
      try{
        setLoading(true);
        await findtNews()
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    buscarNoticias();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>carregando...</p>
      </div>
    );
  }

  return (
    <section>
      <HomeHeader>
        <Card
          top={true}
          title={topNews.title}
          text={topNews.text}
          banner={topNews.banner}
          likes={topNews.likes}
          comments={topNews.comments}
        />
      </HomeHeader>

      <HomeBody>
        {news.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              text={item.text}
              banner={item.banner}
              likes={item.likes}
              comments={item.comments}
            />
          );
        })}
      </HomeBody>
    </section>
  );
}
