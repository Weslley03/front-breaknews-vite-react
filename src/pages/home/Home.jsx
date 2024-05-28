import { Navbar } from "../../components/navbar/Navbar";
import { Card } from '../../components/card/Card'
import { news } from "../../Datas";

export default function Home() {
    return (
        <section>
            <Navbar />
            {news.map((item, index) => {
                return <Card key ={index} news = {item} />
            })}
        </section>
    )
} 