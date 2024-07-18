import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { findByTitle } from '../../services/postsService.js'
import { Card } from "../../components/card/Card.jsx";
import { ContainerResults, SearchNews, TextResults } from "./SearchStyled.jsx";

export default function Search() {

    const { title } = useParams() 
    const [ news, setNews ] = useState([]);

    async function search(){
        try{
            const newsResponse = await findByTitle(title);
            setNews(newsResponse.data);
        }catch(err){
            console.log(err);
            setPosts([]);
        }
    }

    useEffect(() => {
        search();
    }, [title]);

    return (
        <ContainerResults>
            <TextResults>
                <span>
                {news.length
            ? `Encontramos ${news.length} ${
                news.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não encontramos resultados para:"}
                </span>
                <h2>{title}</h2>
            </TextResults>
            <SearchNews>
                {news.map((item) => ( 
                    <Card 
                        key={item.id}
                        title={item.title}
                        text={item.text}
                        banner={item.banner}
                        likes={item.likes}
                        comments={item.comments}
                        textLimit={150}
                    />
                ))}
            </SearchNews>
        </ContainerResults>
    )
}