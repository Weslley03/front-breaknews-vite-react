import { CardBody, CardContainer, CardFooter  } from "./CardStyled";

export function Card({news}) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{news.title}</h2>
                    <p>{news.text}</p>
                </div>
                <img src={news.img} alt="imagem"/>
            </CardBody>
           
           <CardFooter>
                <div>
                    <i className="bi bi-heart"></i>
                    <span>{news.likes}</span>
                </div>
                
                <div>
                    <i className="bi bi-chat-dots"></i>
                    <span>{news.comments}</span>
                </div>
           </CardFooter>
        </CardContainer>
    )
}