import { Navbar } from "../../components/navbar/Navbar";
import { Card } from '../../components/card/Card'
import { news } from "../../Datas";
import { HomeBody } from "./HomeStyled";

export default function Home() {
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