import { Navbar } from "../../components/navbar/Navbar";
import { Card } from '../../components/card/Card'
import { news } from "../../Datas";
import { HomeBody } from "./HomeStyled";
import { getAllNews } from "../../services/postsService";

export default function Home() {

    let news;

    async function findtAllNews() {
        const response = await getAllNews()
        news = response.data.results
    }

    findtAllNews()
    console.log(news)

    return (
        <section>
            <Navbar />
            <HomeBody>
                {news.map((item, index) => {
                    return <Card key ={index} news = {item} />
                })} 
            </HomeBody>
        </section>
    )
} 