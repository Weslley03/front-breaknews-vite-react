import { useState, useEffect } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Card } from '../../components/card/Card';
import { HomeBody } from "./HomeStyled";
import { getAllNews } from "../../services/postsService";

export default function Home() {

    const [ news, setNews ] = useState([    ]) 

    async function findtAllNews() {
        const response = await getAllNews()
        setNews(response.data.results)
    }

    useEffect(() => {
        findtAllNews()
    }, [])

    return (
        <section>
            <Navbar />
            <HomeBody>
                {news.map((item) => {
                    return <Card 
                    key ={item.id} 
                    title = {item.title} 
                    text = {item.text} 
                    banner = {item.banner}
                    likes = {item.likes.length}
                    comments = {item.comments.length} 
                    />
                })} 
            </HomeBody>
        </section>
    )
} 